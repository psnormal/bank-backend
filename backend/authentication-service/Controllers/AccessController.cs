using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using authentication_service.Models;
using authentication_service.Services;

namespace authentication_service.Controllers
{
    public class AccessController : Controller
    {
        private IAccessService _accessService;

        public AccessController(IAccessService service)
        {
            _accessService = service;
        }

        [HttpGet]
        public IActionResult Login()
        {
            ClaimsPrincipal claimUser = HttpContext.User;

            if (claimUser.Identity.IsAuthenticated)
            {
                if (claimUser.HasClaim(ClaimTypes.Role, "Employee") && !claimUser.HasClaim(ClaimTypes.Role, "Client"))
                {
                    return Redirect("https://localhost:3001");
                }
                else if (!claimUser.HasClaim(ClaimTypes.Role, "Employee") && claimUser.HasClaim(ClaimTypes.Role, "Client"))
                {
                    return Redirect("https://localhost:3000");
                }
                else return Redirect("https://localhost:3003");
            }

            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            try
            {
                var identity = _accessService.Login(model);

                AuthenticationProperties properties = new AuthenticationProperties()
                {
                    AllowRefresh = true,
                    IsPersistent = true
                };

                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme,
                    new ClaimsPrincipal(identity), properties);

                if (identity.HasClaim(ClaimTypes.Role, "Employee") && !identity.HasClaim(ClaimTypes.Role, "Client"))
                {
                    return Redirect("https://localhost:3001");
                }
                else if (!identity.HasClaim(ClaimTypes.Role, "Employee") && identity.HasClaim(ClaimTypes.Role, "Client"))
                {
                    return Redirect("https://localhost:3000");
                }
                else return Redirect("https://localhost:3003");
            }
            catch (Exception e)
            {
                if (e.Message == "Invalid login or password")
                {
                    return StatusCode(400, "Auth failed: " + e.Message);
                }
                return StatusCode(500, "Something went wrong");
            }
        }
    }
}
