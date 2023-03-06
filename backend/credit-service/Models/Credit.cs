using System;
namespace credit_service.Models
{
	public class Credit
	{
		public Guid CreditId { get; set; }
        public Guid UserId { get; set; }
		public Guid CreditRateId { get; set; }
		public CreditRate CreditRate { get; set; }
		public DateTime MaturityDate { get; set; }
		public int PaymentTerm { get; set; }
		public double LoanAmount { get; set; }//размер кредита
		public double PayoutAmount { get; set; }//платеж
		public CreditStatus Status { get; set; }
		public int AccountNum { get; set; }
		public double? LoanBalance { get; set; }//остаток

        public Credit()
		{
		}

        public Credit(Guid userId, Guid creditRateId, int accountNum, double interestRate, CreditTakingModel model)
        {
			this.UserId = userId;
			this.CreditRateId = creditRateId;
			this.AccountNum = accountNum;
			this.MaturityDate = new DateTime();
			this.MaturityDate = model.MaturityDate;
			this.PaymentTerm = model.PaymentTerm;
			this.LoanAmount = model.LoanAmount;
			this.Status = CreditStatus.notRepaid;
			double monthInterestRate = (double)((double)interestRate / 12)/100;
			double a = 1 + monthInterestRate;
			this.PayoutAmount = this.LoanAmount * ((monthInterestRate * Math.Pow(a, this.PaymentTerm)) /
				(Math.Pow(a, this.PaymentTerm) - 1));
			this.LoanBalance = this.LoanAmount;
        }
    }
}

