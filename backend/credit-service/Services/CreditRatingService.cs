using System;
using credit_service.Models;
using Microsoft.EntityFrameworkCore;

namespace credit_service.Services
{
    public interface ICreditRatingService
	{

	}


    public class CreditRatingService: ICreditRatingService
    {
        private Context _context;

        public CreditRatingService(Context context)
        {
            _context = context;
        }

        public async Task<int> CountCreditRating(Guid userId)
        {
            var credits = await _context.Credit.Where(x => x.UserId == userId).ToListAsync();

            return 1;
        }

	}
}

