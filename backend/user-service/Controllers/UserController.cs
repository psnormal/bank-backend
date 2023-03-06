using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using user_service.Models;
using user_service.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace user_service.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private Context _context;
        public IHashService _hashService { get; set; }
        private IUserService _userService { get; set; }

        public UserController(Context context, IUserService userService, IHashService hashService)
        {
            _context = context;
            _userService = userService;
            _hashService = hashService;
        }

        [Route("ClientRegistration")]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ClientRegistrationModel model)
        {
            User user = null;
            try
            {
                user = await _userService.AddNewClient(model);
            }
            catch (ArgumentException)
            {
                return BadRequest();
            }
            catch (Exception)
            {
                return BadRequest();
            }
            return Ok();
        }

        [Route("EmployeeRegistration")]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] EmployeeRegistrationModel model)
        {
            User user = null;
            try
            {
                user = await _userService.AddNewEmployee(model);
            }
            catch (ArgumentException)
            {
                return BadRequest();
            }
            catch (Exception)
            {
                return BadRequest();
            }
            return Ok();
        }

        [Route("{userId}/ClientInformation")]
        [HttpGet]
        public async Task<ActionResult<ClientProfileModel>> Get(Guid userId)
        {
            var user = await _context.Users.Where(x => x.UserId == userId).FirstOrDefaultAsync();
            if (user == null)
            {
                return BadRequest();
            }
            return new ClientProfileModel(user);
        }

        [Route("AllUsers")]
        [HttpGet]
        public async Task<List<ClientProfileModel>> Get()
        {
            return await _userService.GetAllUsers();
        }

        [HttpPut("{userId}/block")]
        public async Task<IActionResult> Put(Guid userId)
        {
            var user = await _context.Users.Where(x => x.UserId == userId).FirstOrDefaultAsync();
            user.Status = UserStatus.Blocked;
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}

