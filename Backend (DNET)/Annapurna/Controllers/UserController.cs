using Annapurna.Models.Responses;
using Annapurna.Models.Requests;
using Annapurna.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Annapurna.Controllers
{
    [ApiController]
    [Route("users")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        // GET /users/me
        [HttpGet("me")]
        [Authorize]
        public async Task<IActionResult> GetCurrentUser()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var user = await _userService.GetUserByIdAsync(userId);

            if (user == null) return NotFound();

            return Ok(new UserResponse
            {
                Id = user.Id,
                FullName = user.FullName,
                Email = user.Email,
                MobileNumber = user.MobileNumber,
                Role = user.Role.ToString(),
                Address = new AddressResponse
                {
                    Street = user.Address?.Street,
                    City = user.Address?.City,
                    State = user.Address?.State,
                    PinCode = user.Address?.PinCode,
                    Country = user.Address?.Country
                }
            });
        }

        // PUT /users/me/address
        [HttpPut("me/address")]
        [Authorize]
        public async Task<IActionResult> UpdateAddress([FromBody] AddressRequest updated)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var user = await _userService.GetUserByIdAsync(userId);

            if (user == null) return NotFound();

            if (user.Address != null)
            {
                user.Address.Street = updated.Street;
                user.Address.City = updated.City;
                user.Address.State = updated.State;
                user.Address.PinCode = updated.PinCode;
                user.Address.Country = updated.Country;

                await _userService.SaveAsync();
                return Ok(new { message = "User updated successfully." });
            }

            return BadRequest("Address not found.");
        }
    }
}
