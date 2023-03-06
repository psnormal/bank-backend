using System;
using credit_service.Models;
using Microsoft.EntityFrameworkCore;

namespace credit_service.Services
{
	public interface IUserCreditService
	{
        public Task<Credit> AddNewCredit(Guid creditRateId, Guid userId, int accountNum, CreditTakingModel model);

    }

	public class UserCreditService: IUserCreditService
    {
        private Context _context;

        public UserCreditService(Context context)
        {
            _context = context;
        }

        public async Task<Credit> AddNewCredit(Guid creditRateId, Guid userId, int accountNum, CreditTakingModel model)
        {
            var creditRate = await _context.CreditRates.Where(x => x.CreditRateId == creditRateId).SingleOrDefaultAsync();
            if (creditRate == null)
            {
                throw new Exception("Unable to create credit");
            }
            Credit newCredit = new Credit(userId, creditRateId, accountNum, creditRate.InterestRate, model);
            _context.Credit.Add(newCredit);
            await _context.SaveChangesAsync();
            var credit = await _context.Credit.Where(x => x.CreditId == newCredit.CreditId).SingleOrDefaultAsync();
            if (credit == null)
            {
                throw new Exception("Unable to create credit");
            }
            return credit;
        }
    }
}

