using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using credit_service.Models;
using Microsoft.AspNetCore.Mvc;
using credit_service.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace credit_service.Controllers
{
    [Route("api/[controller]")]
    public class CreditRatingController : Controller
    {
        private Context _context;
        private ICreditRatingService _creditRatingService;
        public CreditRatingController(Context context, ICreditRatingService ratingService)
        {
            _context = context;
            _creditRatingService = ratingService;
        }

        // GET api/values/5
        [HttpGet]
        public async Task<double> Get(Guid userID)
        {
            return await _creditRatingService.CountCreditRating(userID);
        }
    }
}

