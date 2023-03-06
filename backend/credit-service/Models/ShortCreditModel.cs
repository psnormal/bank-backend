using System;
namespace credit_service.Models
{
	public class ShortCreditModel
	{
        public string CreditRateTitle { get; set; }
        public int InterestRate { get; set; }
        public CreditStatus Status { get; set; }
        public double? LoanBalance { get; set; }//остаток

        public ShortCreditModel(Credit model, string creditRateTitle, int interestRate)
		{
            this.CreditRateTitle = creditRateTitle;
            this.InterestRate = interestRate;
            this.Status = model.Status;
            this.LoanBalance = model.LoanBalance;
		}
	}
}

