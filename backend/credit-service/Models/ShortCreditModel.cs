using System;
namespace credit_service.Models
{
	public class ShortCreditModel
	{
        public Guid CreditID { get; set; }
        public string CreditRateTitle { get; set; }
        public double InterestRate { get; set; }
        public CreditStatus Status { get; set; }
        public double? LoanBalance { get; set; }//остаток

        public ShortCreditModel(Credit model, string creditRateTitle, double interestRate)
		{
            CreditID = model.CreditId;
            this.CreditRateTitle = creditRateTitle;
            this.InterestRate = interestRate;
            this.Status = model.Status;
            this.LoanBalance = model.LoanBalance;
		}
	}
}

