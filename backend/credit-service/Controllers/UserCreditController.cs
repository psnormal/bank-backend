using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using credit_service.Models;
using credit_service.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

        [Route("userCredits")]
        [HttpGet]
        public async Task<List<ShortCreditModel>> Get(Guid userId)
        {
            return await _userCreditService.GetAllCredits(userId);
        }

        [HttpGet("userCredits/{creditId}")]
        public async Task<ActionResult<CreditInfoModel>> Get(Guid userId, Guid creditId)
        {
            var credit = await _context.Credit.Where(x => x.CreditId == creditId).FirstOrDefaultAsync();
            if (credit == null)
            {
                return BadRequest();
            }

            var creditRate = await _context.CreditRates.Where(x => x.CreditRateId == credit.CreditRateId).FirstOrDefaultAsync();

            return new CreditInfoModel(credit, creditRate.Title, creditRate.InterestRate);
        }

        [HttpGet("{userId}/credits/{creditId}/loanBalance")]
        public async Task<ActionResult<double>> GetLoanBalance(Guid creditId)
        {
            var credit = await _context.Credit.Where(x => x.CreditId == creditId).FirstOrDefaultAsync();
            if (credit == null)
            {
                return BadRequest();
            }

            return credit.LoanBalance;
        }

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

        [HttpPut("{userId}/credits/{creditId}/regularPayment")]
        public async Task<IActionResult> Put(Guid userId, Guid creditId)
        {
            var credit = _userCreditService.MakeRegularPayment(creditId);
            if (credit == null)
            {
                return BadRequest();
            }
            return Ok();
        }

        [HttpPut("{userId}/credits/{creditId}/lastPayment")]
        public async Task<IActionResult> Put(Guid userId, Guid creditId, double paymentAmount)
        {
            Credit credit = null;
            try
            {
                credit = await _userCreditService.MakeLastPayment(creditId, paymentAmount);
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

        // DELETE api/values/5
        [HttpPut("{userId}/credits/{creditId}/closeCredit")]
        public async Task<IActionResult> Put(Guid creditId)
        {
            Credit credit = null;
            try
            {
                credit = await _userCreditService.CloseCredit(creditId);
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
    }
}

