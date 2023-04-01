using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using credit_service.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace credit_service.Controllers
{
    [Route("api/[controller]")]
    public class CreditRatingController : Controller
    {
        private Context _context;
        public CreditRatingController(Context context)
        {
            _context = context;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }
    }
}

