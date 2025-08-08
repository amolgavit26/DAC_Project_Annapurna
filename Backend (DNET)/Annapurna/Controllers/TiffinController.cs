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
    public class TiffinController : ControllerBase
    {
        private readonly TiffinService _tiffinService;
        private readonly JwtService _jwtService;
        private readonly UserService _userService;
        private readonly ApplicationDbContext _context;

        public TiffinController(TiffinService tiffinService, JwtService jwtService, UserService userService, ApplicationDbContext context)
        {
            _tiffinService = tiffinService;
            _jwtService = jwtService;
            _userService = userService;
            _context = context;
        }

        [HttpGet("all")]
        [Authorize(Roles = "CUSTOMER")]
        public async Task<IActionResult> AllTiffins()
        {
            try
            {
                var email = User.FindFirst(ClaimTypes.Email)?.Value;
                if (string.IsNullOrEmpty(email))
                {
                    return BadRequest(new { message = "User not found." });
                }

                var customer = await _userService.GetByEmail(email);
                if (customer == null)
                {
                    return BadRequest(new { message = "Customer not found." });
                }

                if (customer.Role != Role.CUSTOMER)
                {
                    return BadRequest(new { message = "Only customers can view tiffins." });
                }

                var customerPincode = customer.Address?.PinCode;
                List<Tiffin> tiffins;

                if (string.IsNullOrEmpty(customerPincode))
                {
                    tiffins = new List<Tiffin>();
                }
                else
                {
                    tiffins = await _tiffinService.GetTiffinsForCustomerByPinCode(customerPincode);
                }

                var dtos = tiffins.Select(tiffin => new TiffinDTO
                {
                    Id = tiffin.Id,
                    Name = tiffin.Name,
                    Description = tiffin.Description,
                    Price = tiffin.Price,
                    VendorName = tiffin.Vendor?.FullName,
                    Category = tiffin.Category.ToString(),
                    ImageUrl = tiffin.Image != null ? $"data:image/jpeg;base64,{Convert.ToBase64String(tiffin.Image)}" : tiffin.ImageUrl
                }).ToList();

                return Ok(dtos);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("all-tiffins")]
        public async Task<IActionResult> GetAllTiffinsPublic()
        {
            try
            {
                var tiffins = await _context.Tiffins
                    .Include(t => t.Vendor)
                    .ToListAsync();

                var dtos = tiffins.Select(tiffin => new TiffinDTO
                {
                    Id = tiffin.Id,
                    Name = tiffin.Name,
                    Description = tiffin.Description,
                    Price = tiffin.Price,
                    VendorName = tiffin.Vendor?.FullName,
                    Category = tiffin.Category.ToString(),
                    ImageUrl = tiffin.Image != null ? $"data:image/jpeg;base64,{Convert.ToBase64String(tiffin.Image)}" : tiffin.ImageUrl
                }).ToList();

                return Ok(dtos);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
