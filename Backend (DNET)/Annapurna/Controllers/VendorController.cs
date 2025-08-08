using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using AnnapurnaAPI.Data;
using AnnapurnaAPI.Services;
using AnnapurnaAPI.Security;
using AnnapurnaAPI.DTOs;
using AnnapurnaAPI.Models;
using System.Security.Claims;
using System.Text;

namespace AnnapurnaAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "VENDOR")]
    public class VendorController : ControllerBase
    {
        private readonly UserService _userService;
        private readonly JwtService _jwtService;
        private readonly ApplicationDbContext _context;
        private readonly EmailService _emailService;

        public VendorController(UserService userService, JwtService jwtService, ApplicationDbContext context, EmailService emailService)
        {
            _userService = userService;
            _jwtService = jwtService;
            _context = context;
            _emailService = emailService;
        }

        private async Task<User> GetCurrentVendor()
        {
            var email = User.FindFirst(ClaimTypes.Email)?.Value;
            if (string.IsNullOrEmpty(email))
            {
                throw new InvalidOperationException("User not found");
            }

            var user = await _userService.GetByEmail(email);
            if (user == null)
            {
                throw new InvalidOperationException("User not found");
            }

            if (user.Role != Role.VENDOR)
            {
                throw new InvalidOperationException("Only vendors can access this endpoint.");
            }

            return user;
        }

        [HttpPost("tiffins")]
        public async Task<IActionResult> AddTiffin([FromForm] string name, [FromForm] string description,
    [FromForm] double price, [FromForm] int category, [FromForm] IFormFile? image)
        {
            try
            {
                // Validate Category Enum
                if (!Enum.IsDefined(typeof(TiffinCategory), category))
                {
                    return BadRequest(new { message = "Invalid category value. Valid values are: 1 (BREAKFAST), 2 (LUNCH), 3 (DINNER)" });
                }

                TiffinCategory parsedCategory = (TiffinCategory)category;

                // Validate name and description
                if (string.IsNullOrEmpty(name) || string.IsNullOrEmpty(description))
                {
                    return BadRequest(new { message = "Name and description are required." });
                }

                // Fetch Vendor (User who is logged in)
                var vendor = await GetCurrentVendor();

                // Create the Tiffin object to save
                var tiffin = new Tiffin
                {
                    Name = name,
                    Description = description,
                    Price = price,
                    Category = parsedCategory,
                    VendorId = vendor.Id  // This should be long, matching User.Id
                };



                // Handle image upload
                if (image != null && image.Length > 0)
                {
                    using var memoryStream = new MemoryStream();
                    await image.CopyToAsync(memoryStream);
                    tiffin.Image = memoryStream.ToArray();
                }
                else
                {
                    // Set to empty array instead of null to avoid database constraint issues
                    tiffin.Image = new byte[0];
                }

                // Set default ImageUrl if not provided
                if (string.IsNullOrEmpty(tiffin.ImageUrl))
                {
                    tiffin.ImageUrl = "";
                }

                // Save to database
                _context.Tiffins.Add(tiffin);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Tiffin added successfully." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message, details = ex.InnerException?.Message });
            }
        }






        [HttpPost("tiffins/{id}/upload-image")]
        public async Task<IActionResult> UploadImage(long id, [FromForm] IFormFile file)
        {
            try
            {
                var vendor = await GetCurrentVendor();
                var tiffin = await _context.Tiffins.FindAsync(id);
                
                if (tiffin == null)
                {
                    return NotFound(new { message = "Tiffin not found" });
                }

                if (tiffin.VendorId != vendor.Id)
                {
                    return Forbid();
                }

                var fileName = $"{Guid.NewGuid()}_{file.FileName}";
                var uploadPath = Path.Combine("uploads", "tiffins");
                
                if (!Directory.Exists(uploadPath))
                {
                    Directory.CreateDirectory(uploadPath);
                }

                var filePath = Path.Combine(uploadPath, fileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                var imageUrl = $"http://localhost:8080/uploads/tiffins/{fileName}";
                tiffin.ImageUrl = imageUrl;
                await _context.SaveChangesAsync();

                return Ok(new { message = "Image uploaded successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("tiffins")]
        public async Task<IActionResult> GetMyTiffins()
        {
            try
            {
                var vendor = await GetCurrentVendor();
                var tiffins = await _context.Tiffins
                    .Where(t => t.VendorId == vendor.Id)
                    .ToListAsync();

                var dtoList = tiffins.Select(t => new TiffinDTO
                {
                    Id = t.Id,
                    Name = t.Name,
                    Description = t.Description,
                    Price = t.Price,
                    VendorName = vendor.FullName,
                    Category = t.Category.ToString(),
                    ImageUrl = t.Image != null ? $"data:image/jpeg;base64,{Convert.ToBase64String(t.Image)}" : null
                }).ToList();

                return Ok(dtoList);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("tiffins/{id}")]
        public async Task<IActionResult> UpdateMyTiffin(long id, [FromForm] string name, [FromForm] string description,
            [FromForm] double price, [FromForm] TiffinCategory category, [FromForm] IFormFile? image)
        {
            try
            {
                var vendor = await GetCurrentVendor();
                var existing = await _context.Tiffins.FindAsync(id);
                
                if (existing == null)
                {
                    return NotFound(new { message = "Tiffin not found" });
                }

                if (existing.VendorId != vendor.Id)
                {
                    return Forbid();
                }

                existing.Name = name;
                existing.Description = description;
                existing.Price = price;
                existing.Category = category;

                if (image != null && image.Length > 0)
                {
                    using var memoryStream = new MemoryStream();
                    await image.CopyToAsync(memoryStream);
                    existing.Image = memoryStream.ToArray();
                }

                await _context.SaveChangesAsync();
                return Ok(new { message = "Tiffin updated successfully." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("tiffins/{id}")]
        public async Task<IActionResult> DeleteTiffin(long id)
        {
            try
            {
                var vendor = await GetCurrentVendor();
                var tiffin = await _context.Tiffins.FindAsync(id);
                
                if (tiffin == null)
                {
                    return NotFound(new { message = "Tiffin not found" });
                }

                if (tiffin.VendorId != vendor.Id)
                {
                    return Forbid();
                }

                _context.Tiffins.Remove(tiffin);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Tiffin deleted successfully." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("orders")]
        public async Task<IActionResult> GetVendorOrders()
        {
            try
            {
                var vendor = await GetCurrentVendor();
                var vendorTiffins = await _context.Tiffins
                    .Where(t => t.VendorId == vendor.Id)
                    .Include(t => t.Orders)
                    .ThenInclude(o => o.Customer)
                    .ToListAsync();

                var orders = vendorTiffins
                    .SelectMany(tiffin => tiffin.Orders.Select(order => new OrderDTO
                    {
                        OrderId = order.Id,
                        TiffinId = tiffin.Id,
                        TiffinName = tiffin.Name,
                        Quantity = order.Quantity,
                        TotalPrice = order.TotalPrice,
                        Status = order.Status.ToString(),
                        CustomerName = order.Customer.FullName,
                        CustomerEmail = order.Customer.Email,
                        CustomerMobileNumber = order.Customer.MobileNumber ?? ""
                    }))
                    .ToList();

                return Ok(orders);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPatch("orders/{orderId}/status")]
        public async Task<IActionResult> UpdateOrderStatus(long orderId, [FromBody] StatusUpdateDTO dto)
        {
            try
            {
                var vendor = await GetCurrentVendor();
                var order = await _context.Orders
                    .Include(o => o.Tiffin)
                    .Include(o => o.Customer)
                    .FirstOrDefaultAsync(o => o.Id == orderId);

                if (order == null)
                {
                    return NotFound(new { message = "Order not found" });
                }

                if (order.Tiffin.VendorId != vendor.Id)
                {
                    return Forbid();
                }

                order.Status = Enum.Parse<OrderStatus>(dto.Status.ToUpper());
                await _context.SaveChangesAsync();

                await _emailService.SendStatusUpdateEmail(
                    order.Customer.Email,
                    order.Customer.FullName,
                    order.Tiffin.Name,
                    order.Status.ToString()
                );

                return Ok(new { message = "Order status updated and email sent." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
