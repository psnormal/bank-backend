using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using credit_service.Models;
using credit_service.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace credit_service.Controllers
{
    [Route("api/[controller]")]
    public class UserCreditController : Controller
    {
        private Context _context;
        private IUserCreditService _userCreditService;

        public UserCreditController(Context context, IUserCreditService userCreditService)
        {
            _context = context;
            _userCreditService = userCreditService;
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        /*[Route("{userId}/credits/{userCreditId}")]
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }*/

        [Route("{creditRateId}/takeCredit")]
        [HttpPost]
        public async Task<IActionResult> Post(Guid creditRateId, Guid userId, int accountNum, [FromBody]CreditTakingModel model)
        {
            Credit newRate = null;
            try
            {
                newRate = await _userCreditService.AddNewCredit(creditRateId, userId, accountNum, model);
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

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}

