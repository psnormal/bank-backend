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
    public class CreditRateController : Controller
    {
        private Context _context;
        private ICreditRateService _creditRateService;
   
        public CreditRateController(Context context, ICreditRateService creditRateService)
        {
            _context = context;
            _creditRateService = creditRateService;
        }

        [Route("AllCreditRates")]
        [HttpGet]
        public async Task<List<ShortCreditRateModel>> Get()
        {
            return await _creditRateService.GetAllCreditRates();
        }
        // GET api/values/5
        [HttpGet("{creditRateId}/CreditRateInformation")]
        public async Task<ActionResult<CreditRateInformationModel>> Get(Guid creditRateId)
        {
            var creditRate = await _context.CreditRates.Where(x => x.CreditRateId == creditRateId).FirstOrDefaultAsync();
            if (creditRate == null)
            {
                return BadRequest();
            }
            return new CreditRateInformationModel(creditRate);
        }

        [Route("NewCreditRate")]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]CreditRateModel model)
        {
            CreditRate newRate = null;
            try
            {
                newRate = await _creditRateService.AddNewCreditRate(model);
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
        [HttpPut("{creditRateId}/edit")]
        public async Task<IActionResult> Put(Guid creditRateId, [FromBody]CreditRateModel model)
        {
            var creditRate = await _context.CreditRates.Where(x => x.CreditRateId == creditRateId).FirstOrDefaultAsync();
            if (creditRate == null)
            {
                return BadRequest();
            }
            creditRate.Title = model.Title;
            creditRate.Description = model.Description;
            creditRate.InterestRate = model.InterestRate;
            await _context.SaveChangesAsync();
            return Ok();
        }

        // DELETE api/values/5
        [HttpDelete("{creditRateId}/delete")]
        public async Task<IActionResult> Delete(Guid creditRateId)
        {
            var creditRate = await _context.CreditRates.Where(x => x.CreditRateId == creditRateId).FirstOrDefaultAsync();
            if (creditRate == null)
            {
                return BadRequest();
            }
            creditRate.IsActive = CreditRateStatus.notActive;
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}

