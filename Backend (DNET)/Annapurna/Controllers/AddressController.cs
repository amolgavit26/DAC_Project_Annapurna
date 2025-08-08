using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using AnnapurnaAPI.Services;
using AnnapurnaAPI.Security;
using AnnapurnaAPI.DTOs;
using AnnapurnaAPI.Models;
using System.Security.Claims;

namespace AnnapurnaAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class AddressController : ControllerBase
    {
        private readonly AddressService _addressService;
        private readonly UserService _userService;
        private readonly JwtService _jwtService;

        public AddressController(AddressService addressService, UserService userService, JwtService jwtService)
        {
            _addressService = addressService;
            _userService = userService;
            _jwtService = jwtService;
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

        [HttpPut("update")]
        public async Task<IActionResult> UpdateAddress([FromBody] AddressDTO addressDTO)
        {
            try
            {
                var user = await GetCurrentUser();
                await _addressService.UpdateAddress(user, addressDTO);
                return Ok(new { message = "Address updated successfully." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("my")]
        public async Task<IActionResult> GetMyAddress()
        {
            try
            {
                var user = await GetCurrentUser();
                var address = await _addressService.GetAddressByUser(user);

                if (address == null)
                {
                    var empty = new AddressResponseDTO("", "", "", "", "");
                    return Ok(empty);
                }

                var dto = new AddressResponseDTO(
                    address.Street,
                    address.City,
                    address.State,
                    address.PinCode,
                    address.Country
                );

                return Ok(dto);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
