using authentication_service.Services;
using authentication_service.Storage;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace authentication_service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private IAuthService _authService;
        public AuthController(IAuthService service)
        {
            _authService = service;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(RegisterDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            try
            {
                await _authService.Register(model);
                return Ok();
            }
            catch (Exception ex)
            {
                if (ex.Message == "A user with the same login already exists")
                {
                    return StatusCode(400, "Registration failed: " + ex.Message);
                }
                return StatusCode(500, "Something went wrong");
            }
        }
    }
}
