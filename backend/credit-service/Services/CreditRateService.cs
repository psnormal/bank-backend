using System;
using System.Threading.Tasks;
using credit_service.Models;
using Microsoft.EntityFrameworkCore;

namespace credit_service.Services
{
	public interface ICreditRateService
	{
        public Task<CreditRate> AddNewCreditRate(CreditRateModel model);
        public Task<List<ShortCreditRateModel>> GetAllCreditRates();
    }

	public class CreditRateService:ICreditRateService
	{
        private Context _context;

        public CreditRateService(Context context)
		{
			_context = context;
		}

        public async Task<CreditRate> AddNewCreditRate(CreditRateModel model)
        {
            CreditRate newRate = new CreditRate(model);
            _context.CreditRates.Add(newRate);
            await _context.SaveChangesAsync();
            var creditRate = await _context.CreditRates.Where(x => x.CreditRateId == newRate.CreditRateId).SingleOrDefaultAsync();
            if (creditRate == null)
            {
                throw new Exception("Unable to create credit rate");
            }
            return creditRate;
        }

        public async Task<List<ShortCreditRateModel>> GetAllCreditRates()
        {
            var creditRates = await _context.CreditRates.ToListAsync();
            var creditRatesInfo = new List<ShortCreditRateModel>();
            for (int i = 0; i < creditRates.Count(); i++)
            {
                var creditRateInfo = new ShortCreditRateModel(creditRates[i]);
                creditRatesInfo.Add(creditRateInfo);
            }
            return creditRatesInfo;
        }
    }
}

