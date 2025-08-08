using Microsoft.EntityFrameworkCore;
using AnnapurnaAPI.Data;
using AnnapurnaAPI.Models;
using AnnapurnaAPI.DTOs;
using iTextSharp.text;
using iTextSharp.text.pdf;
using System.IO;

namespace AnnapurnaAPI.Services
{
    public class OrderService
    {
        private readonly ApplicationDbContext _context;

        public OrderService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Order> PlaceOrder(OrderDTO dto, User customer)
        {
            var tiffin = await _context.Tiffins.FindAsync(dto.TiffinId);
            if (tiffin == null)
            {
                throw new InvalidOperationException("Tiffin not found");
            }

            var order = new Order
            {
                TiffinId = dto.TiffinId,
                CustomerId = customer.Id,
                Quantity = (int)dto.Quantity,  // Make sure you cast explicitly if it's a long
                TotalPrice = dto.TotalPrice,
                OrderTime = DateTime.UtcNow,
                Status = OrderStatus.PENDING,
                PaymentStatus = PaymentStatus.PENDING
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return order;
        }


        public async Task<List<Order>> GetMyOrders(User customer)
        {
            return await _context.Orders
                .Include(o => o.Tiffin)
                .Where(o => o.CustomerId == customer.Id)
                .OrderByDescending(o => o.OrderTime)
                .ToListAsync();
        }

        public async Task<Order> GetOrderById(long orderId)
        {
            var order = await _context.Orders
                .Include(o => o.Tiffin)
                .Include(o => o.Customer)
                .FirstOrDefaultAsync(o => o.Id == orderId);

            if (order == null)
            {
                throw new InvalidOperationException("Order not found");
            }

            return order;
        }

        public async Task CancelOrder(long orderId, User user)
        {
            var order = await _context.Orders
                .Include(o => o.Customer)
                .FirstOrDefaultAsync(o => o.Id == orderId);

            if (order == null)
            {
                throw new InvalidOperationException("Order not found");
            }

            if (order.CustomerId != user.Id && user.Role != Role.ADMIN)
            {
                throw new InvalidOperationException("Unauthorized to cancel this order");
            }

            if (order.Status == OrderStatus.DELIVERED || order.Status == OrderStatus.CANCELLED)
            {
                throw new InvalidOperationException("Cannot cancel this order");
            }

            order.Status = OrderStatus.CANCELLED;
            await _context.SaveChangesAsync();
        }

        public async Task Save(Order order)
        {
            _context.Orders.Update(order);
            await _context.SaveChangesAsync();
        }

        public async Task MarkAsPaid(long orderId, string razorpayOrderId, string razorpayPaymentId)
        {
            var order = await GetOrderById(orderId);
            order.PaymentStatus = PaymentStatus.PAID;
            order.RazorpayPaymentId = razorpayPaymentId;
            await _context.SaveChangesAsync();
        }

        public byte[] GenerateReceiptPdf(Order order)
        {
            using (MemoryStream ms = new MemoryStream())
            {
                Document document = new Document(PageSize.A4, 25, 25, 30, 30);
                PdfWriter writer = PdfWriter.GetInstance(document, ms);

                document.Open();

                // Add title
                Font titleFont = FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 18);
                Paragraph title = new Paragraph("Order Receipt", titleFont);
                title.Alignment = Element.ALIGN_CENTER;
                document.Add(title);
                document.Add(new Paragraph(" "));

                // Add order details
                Font normalFont = FontFactory.GetFont(FontFactory.HELVETICA, 12);
                document.Add(new Paragraph($"Order ID: {order.Id}", normalFont));
                document.Add(new Paragraph($"Tiffin: {order.Tiffin.Name}", normalFont));
                document.Add(new Paragraph($"Quantity: {order.Quantity}", normalFont));
                document.Add(new Paragraph($"Total Price: ₹{order.TotalPrice}", normalFont));
                document.Add(new Paragraph($"Order Date: {order.OrderTime:dd/MM/yyyy HH:mm}", normalFont));
                document.Add(new Paragraph($"Status: {order.Status}", normalFont));
                document.Add(new Paragraph($"Payment Status: {order.PaymentStatus}", normalFont));

                document.Close();
                return ms.ToArray();
            }
        }
    }
}
