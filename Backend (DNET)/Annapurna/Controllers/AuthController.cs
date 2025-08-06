using Annapurna.Models.Requests;
using Annapurna.Models.Responses;
using Annapurna.Security;
using Annapurna.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Annapurna.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly JwtProvider _jwtProvider;

        public AuthController(IUserService userService, JwtProvider jwtProvider)
        {
            _userService = userService;
            _jwtProvider = jwtProvider;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequest request)
        {
            if (await _userService.EmailExistsAsync(request.Email))
                return BadRequest("Email already in use");

            // Register user and get the actual User entity (not UserResponse)
            var user = await _userService.RegisterAsync(request);

            var token = _jwtProvider.GenerateToken(user);

            return Ok(new LoginResponse
            {
                Token = token,
                Role = user.Role.ToString(),
                UserId = user.Id
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            var user = await _userService.AuthenticateAsync(request);
            if (user == null)
                return Unauthorized("Invalid email or password");

            var token = _jwtProvider.GenerateToken(user);

            return Ok(new LoginResponse
            {
                Token = token,
                Role = user.Role.ToString(),
                UserId = user.Id
            });
        }
    }
}
