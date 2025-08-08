using Microsoft.AspNetCore.Mvc;
using AnnapurnaAPI.Services;
using AnnapurnaAPI.Security;
using AnnapurnaAPI.DTOs;
using AnnapurnaAPI.Models;

namespace AnnapurnaAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserService _userService;
        private readonly JwtService _jwtService;

        public AuthController(UserService userService, JwtService jwtService)
        {
            _userService = userService;
            _jwtService = jwtService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserDTO dto)
        {
            try
            {
                // Register user with DTO (Role is now directly an enum)
                var user = await _userService.RegisterUser(dto);

                // Convert the User to UserResponseDTO using the static method
                var response = UserResponseDTO.FromUser(user);

                return Ok(response);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }




        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO dto)
        {
            try
            {
                var isValid = await _userService.ValidatePassword(dto.Email, dto.Password);
                if (!isValid)
                {
                    return BadRequest(new { message = "Invalid credentials" });
                }

                var user = await _userService.GetUserByEmail(dto.Email);
                if (user == null)
                {
                    return BadRequest(new { message = "User not found" });
                }

                var token = _jwtService.GenerateToken(user.Email, user.Role.ToString());

                return Ok(new
                {
                    token = $"Bearer {token}",
                    userId = user.Id,
                    email = user.Email,
                    fullName = user.FullName,
                    role = user.Role.ToString()
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
