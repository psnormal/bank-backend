using authentication_service.Services;
using authentication_service.Storage;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace authentication_service.Controllers
{
    /*[Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private IAuthService _authService;
        public AuthController(IAuthService service)
        {
            _authService = service;
        }

        [HttpPost]
        [Route("check")]
        public IActionResult CheckAccess(AccessForRoles model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            //Console.WriteLine(User.Identity.Name);
            ClaimsPrincipal claimUser = HttpContext.User;
            if (!claimUser.Identity.IsAuthenticated)
            {
                Console.WriteLine("AAAAAAAAAAAAAAAAAAAAAAAAAAbbbbbbbbbbbbbbbbbbbb");
                return Unauthorized();
            }
            var isClient = claimUser.HasClaim(ClaimTypes.Role, "Client");
            var isEmployee = claimUser.HasClaim(ClaimTypes.Role, "Employee");

            if (model.IsForClient == true && model.IsForEmployee == true)
            {
                if (isEmployee == true || isClient == true)
                {
                    return Ok();
                }
                else return Unauthorized();
            }

            else if (model.IsForEmployee == true && model.IsForClient == false)
            {
                if (isEmployee == true)
                {
                    return Ok();
                }
                else return Unauthorized();
            }

            else if (model.IsForEmployee == false && model.IsForClient == true)
            {
                if (isClient == true)
                {
                    return Ok();
                }
                else return Unauthorized();
            }

            else
            {
                return Unauthorized();
            }
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
    }*/
}
