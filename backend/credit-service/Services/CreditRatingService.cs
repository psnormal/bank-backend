using System;
using credit_service.Models;
using Microsoft.EntityFrameworkCore;

namespace credit_service.Services
{
    public interface ICreditRatingService
	{
        public Task<double> CountCreditRating(Guid userId);
    }


    public class CreditRatingService: ICreditRatingService
    {
        private Context _context;

        public CreditRatingService(Context context)
        {
            _context = context;
        }

        public async Task<double> CountCreditRating(Guid userId)
        {
            var credits = await _context.Credit.Where(x => x.UserId == userId).ToListAsync();
            double rating = 100;
            var repaidCredits = new List<Credit>();
            var notRepaidCredits = new List<Credit>();
            var payments = new List<CreditPayment>();
            var allPayments = new List<CreditPayment>();
            var allUsersNotOverduePayments = new List<CreditPayment>();

            for (int i = 0; i < credits.Count(); i++)
            {
                if (credits[i].Status == CreditStatus.notRepaid)
                {
                    notRepaidCredits.Add(credits[i]);
                }
                else
                {
                    repaidCredits.Add(credits[i]);
                }

                payments = await _context.CreditPayments.Where(x => x.CreditId == credits[i].CreditId).ToListAsync();

                for (int j = 0; j<payments.Count(); j++)
                {
                    if (payments[j].IsOverdue == false)
                    {
                        allUsersNotOverduePayments.Add(payments[j]);
                    }
                    allPayments.Add(payments[j]);
                }
            }
            var maxRating = rating * credits.Count();
            if (credits.Count() == 0)
            {
                return rating;
            }
            rating = rating * repaidCredits.Count();
            rating = rating * ((double)allUsersNotOverduePayments.Count() / (double)allPayments.Count());

            rating = (rating/maxRating)*100;
            return rating;
        }

	}
}

