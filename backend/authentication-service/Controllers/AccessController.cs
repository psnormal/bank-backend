using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using authentication_service.Models;
using authentication_service.Storage;
using Duende.IdentityServer.Services;
using Microsoft.AspNetCore.Identity;

namespace authentication_service.Controllers
{
    public class AccessController : Controller
    {
        /*private IAccessService _accessService;
        public AccessController(IAccessService service)
        {
            _accessService = service;
        }*/

        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;
        private readonly IIdentityServerInteractionService _interactionService;

        public AccessController(SignInManager<User> signInManager, UserManager<User> userManager,
            IIdentityServerInteractionService interactionService) =>
            (_signInManager, _userManager, _interactionService) =
            (signInManager, userManager, interactionService);

        [HttpGet]
        public IActionResult Login(string returnUrl)
        {
            /*ClaimsPrincipal claimUser = HttpContext.User;

            if (claimUser.Identity.IsAuthenticated)
            {
                if (claimUser.HasClaim(ClaimTypes.Role, "Employee") && !claimUser.HasClaim(ClaimTypes.Role, "Client"))
                {
                    return Redirect("http://localhost:3001");
                }
                else if (!claimUser.HasClaim(ClaimTypes.Role, "Employee") && claimUser.HasClaim(ClaimTypes.Role, "Client"))
                {
                    return Redirect("http://localhost:3000");
                }
                else return View("Selection");
            }*/

            var viewModel = new LoginViewModel
            {
                ReturnUrl = returnUrl
            };
            return View(viewModel);
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var user = await _userManager.FindByNameAsync(model.Login);
            if (user == null)
            {
                ModelState.AddModelError(string.Empty, "User not found");
                return View(model);
            }

            var result = await _signInManager.PasswordSignInAsync(model.Login,
                model.Password, false, false);
            if (result.Succeeded)
            {
                return Redirect(model.ReturnUrl);
            }
            ModelState.AddModelError(string.Empty, "Login error");
            return View(model);

            /*try
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
                    return Redirect("http://localhost:3001");
                }
                else if (!identity.HasClaim(ClaimTypes.Role, "Employee") && identity.HasClaim(ClaimTypes.Role, "Client"))
                {
                    return Redirect("http://localhost:3000");
                }
                else return View("Selection");
            }
            catch (Exception e)
            {
                if (e.Message == "Invalid login or password")
                {
                    return StatusCode(400, "Auth failed: " + e.Message);
                }
                return StatusCode(500, "Something went wrong");
            }*/
        }

        /*[HttpPost]
        [Route("[controller]/[action]")]
        public IActionResult CheckAccess(AccessForRoles model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            Console.WriteLine(User.Identity.Name);
            ClaimsPrincipal claimUser = HttpContext.User;
            if (!claimUser.Identity.IsAuthenticated)
            {
                Console.WriteLine("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
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
        }*/
    }
}