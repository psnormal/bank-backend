using System;
namespace credit_service.Models
{
	public class CreditInfoModel
	{
        public string CreditRateTitle { get; set; }
        public double InterestRate { get; set; }
        public DateTime MaturityDate { get; set; }
        public int PaymentTerm { get; set; }
        public decimal LoanAmount { get; set; }//размер кредита
        public decimal PayoutAmount { get; set; }//платеж
        public CreditStatus Status { get; set; }
        public int AccountNum { get; set; }
        public decimal? LoanBalance { get; set; }//остаток

        public CreditInfoModel(Credit model, string creditRateTitle, double interestRate)
		{
            this.MaturityDate = model.MaturityDate;
            this.PaymentTerm = model.PaymentTerm;
            this.LoanAmount = model.LoanAmount;
            this.PayoutAmount = model.PayoutAmount;
            this.Status = model.Status;
            this.AccountNum = model.AccountNum;
            this.LoanAmount = model.LoanAmount;
            this.CreditRateTitle = creditRateTitle;
            this.InterestRate = interestRate;
		}
	}
}

