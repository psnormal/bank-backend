using System;
namespace credit_service.Models
{
	public class CreditTakingModel
	{
        public DateTime MaturityDate { get; set; }
        public int PaymentTerm { get; set; }
        public double LoanAmount { get; set; }

        public CreditTakingModel()
		{
		}
	}
}

