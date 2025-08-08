using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using AnnapurnaAPI.Services;
using AnnapurnaAPI.Security;
using AnnapurnaAPI.DTOs;
using AnnapurnaAPI.Models;
using AnnapurnaAPI.Utils;
using System.Security.Claims;

namespace AnnapurnaAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "CUSTOMER")]
    public class OrderController : ControllerBase
    {
        private readonly OrderService _orderService;
        private readonly UserService _userService;
        private readonly JwtService _jwtService;
        private readonly RazorpayService _razorpayService;
        private readonly IConfiguration _configuration;

        public OrderController(OrderService orderService, UserService userService, JwtService jwtService, 
            RazorpayService razorpayService, IConfiguration configuration)
        {
            _orderService = orderService;
            _userService = userService;
            _jwtService = jwtService;
            _razorpayService = razorpayService;
            _configuration = configuration;
        }

        private async Task<User> GetCurrentUser()
        {
            var email = User.FindFirst(ClaimTypes.Email)?.Value;
            if (string.IsNullOrEmpty(email))
            {
                throw new InvalidOperationException("User not found");
            }
            return await _userService.GetByEmail(email) ?? throw new InvalidOperationException("User not found");
        }

        [HttpPost("place")]
        public async Task<IActionResult> PlaceOrder([FromBody] OrderDTO dto)
        {
            try
            {
                var customer = await GetCurrentUser();
                var order = await _orderService.PlaceOrder(dto, customer);

                var response = new OrderResponseDTO(
                    order.Id,
                    order.TiffinId,
                    order.Tiffin.Name,
                    order.Quantity,
                    order.TotalPrice,
                    order.Status,
                    order.PaymentStatus,
                    order.OrderTime,
                    order.RazorpayOrderId
                );

                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("my")]
        public async Task<IActionResult> GetMyOrders()
        {
            try
            {
                var customer = await GetCurrentUser();
                var orders = await _orderService.GetMyOrders(customer);

                var response = orders.Select(order => new OrderResponseDTO(
                    order.Id,
                    order.TiffinId,
                    order.Tiffin.Name,
                    order.Quantity,
                    order.TotalPrice,
                    order.Status,
                    order.PaymentStatus,
                    order.OrderTime,
                    order.RazorpayOrderId
                )).ToList();

                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("{orderId}/cancel")]
        public async Task<IActionResult> CancelOrder(long orderId)
        {
            try
            {
                var user = await GetCurrentUser();
                await _orderService.CancelOrder(orderId, user);
                return Ok(new { message = "Order cancelled" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("{orderId}/pay")]
        public async Task<IActionResult> InitiatePayment(long orderId)
        {
            try
            {
                var order = await _orderService.GetOrderById(orderId);
                var receipt = $"order_rcptid_{orderId}";

                var razorpayOrder = _razorpayService.CreateOrder(
                    (int)(order.TotalPrice * 100),
                    "INR",
                    receipt
                );

                order.RazorpayOrderId = razorpayOrder["id"].ToString();
                order.RazorpayReceipt = receipt;
                order.RazorpayStatus = razorpayOrder["status"].ToString();

                await _orderService.Save(order);

                return Ok(razorpayOrder);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Payment initiation failed: {ex.Message}" });
            }
        }

        [HttpPost("{orderId}/verify")]
        public async Task<IActionResult> VerifyPayment(long orderId, [FromBody] Dictionary<string, string> payload)
        {
            try
            {
                var razorpayOrderId = payload["razorpay_order_id"];
                var razorpayPaymentId = payload["razorpay_payment_id"];
                var razorpaySignature = payload["razorpay_signature"];
                var razorpaySecret = _configuration["Razorpay:KeySecret"];

                var isVerified = RazorpaySignatureUtil.VerifySignature(
                    razorpayOrderId, razorpayPaymentId, razorpaySignature, razorpaySecret ?? ""
                );

                if (isVerified)
                {
                    await _orderService.MarkAsPaid(orderId, razorpayOrderId, razorpayPaymentId);
                    return Ok(new { message = "Payment Verified" });
                }
                else
                {
                    return BadRequest(new { message = "Invalid signature" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Verification error: {ex.Message}" });
            }
        }

        [HttpGet("{orderId}/receipt")]
        public async Task<IActionResult> DownloadReceipt(long orderId)
        {
            try
            {
                var customer = await GetCurrentUser();
                var order = await _orderService.GetOrderById(orderId);

                if (order.CustomerId != customer.Id)
                {
                    return Forbid();
                }

                var pdfBytes = _orderService.GenerateReceiptPdf(order);

                return File(pdfBytes, "application/pdf", $"receipt_order_{orderId}.pdf");
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}
