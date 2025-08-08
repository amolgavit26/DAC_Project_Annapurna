using Microsoft.AspNetCore.Mvc;

namespace AnnapurnaAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HealthController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new { status = "healthy", message = "Annapurna API is running!" });
        }
    }
}
