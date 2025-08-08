using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using AnnapurnaAPI.Data;
using AnnapurnaAPI.Services;
using AnnapurnaAPI.Security;
using AnnapurnaAPI.DTOs;
using AnnapurnaAPI.Models;
using System.Security.Claims;

namespace AnnapurnaAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "ADMIN")]
    public class AdminController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly JwtService _jwtService;
        private readonly UserService _userService;

        public AdminController(ApplicationDbContext context, JwtService jwtService, UserService userService)
        {
            _context = context;
            _jwtService = jwtService;
            _userService = userService;
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

        private void EnsureAdmin(User user)
        {
            if (user.Role != Role.ADMIN)
            {
                throw new InvalidOperationException("Access denied: Admins only");
            }
        }

        [HttpGet("customers")]
        public async Task<IActionResult> GetAllCustomers()
        {
            try
            {
                var admin = await GetCurrentUser();
                EnsureAdmin(admin);

                var customers = await _context.Users
                    .Where(u => u.Role == Role.CUSTOMER)
                    .Select(u => new SimpleUserDTO
                    {
                        Id = u.Id,
                        FullName = u.FullName,
                        Email = u.Email,
                        MobileNumber = u.MobileNumber
                    })
                    .ToListAsync();

                return Ok(customers);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("vendors")]
        public async Task<IActionResult> GetAllVendors()
        {
            try
            {
                var admin = await GetCurrentUser();
                EnsureAdmin(admin);

                var vendors = await _context.Users
                    .Where(u => u.Role == Role.VENDOR)
                    .Select(u => new SimpleUserDTO
                    {
                        Id = u.Id,
                        FullName = u.FullName,
                        Email = u.Email
                    })
                    .ToListAsync();

                return Ok(vendors);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("delete/{userId}")]
        public async Task<IActionResult> DeleteUser(long userId)
        {
            try
            {
                var admin = await GetCurrentUser();
                EnsureAdmin(admin);

                var user = await _context.Users.FindAsync(userId);
                if (user == null)
                {
                    return NotFound(new { message = "User not found" });
                }

                _context.Users.Remove(user);
                await _context.SaveChangesAsync();

                return Ok(new { message = "User deleted successfully." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("vendor/delete/{vendorId}")]
        public async Task<IActionResult> DeleteVendor(long vendorId)
        {
            try
            {
                var admin = await GetCurrentUser();
                EnsureAdmin(admin);

                await _userService.DeleteVendorById(vendorId);

                return Ok(new { message = "Vendor and associated tiffins/orders deleted successfully." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
