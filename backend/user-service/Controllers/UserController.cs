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

        [Route("userInformation")]
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

        [HttpGet]
        public async Task<List<ClientProfileModel>> Get()
        {
            return await _userService.GetAllUsers();
        }

        // PUT api/values/5
        [HttpPut("block")]
        public async Task<IActionResult> Put(Guid userId)
        {
            var user = await _context.Users.Where(x => x.UserId == userId).FirstOrDefaultAsync();
            user.Status = UserStatus.Blocked;
            await _context.SaveChangesAsync();
            return Ok();
        }

        /* PUT api/values/5
        [Authorize]
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] ProfileModel model)
        {
            var user = await _context.Users.Where(x => x.Username == User.Identity.Name).FirstOrDefaultAsync();
            if (user == null)
            {
                return BadRequest();
            }
            user.Name = model.Name;
            user.avatarLink = model.avatarLink;
            user.Email = model.Email;
            user.Gender = model.Gender;
            user.BirthDate = model.BirthDate;
            await _context.SaveChangesAsync();
            return Ok();
        }*/


    }
}

