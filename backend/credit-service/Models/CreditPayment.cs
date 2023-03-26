using System;
namespace credit_service.Models
{
	public class CreditPayment
	{
		public Guid CreditPaymentId { get; set; }
        public Guid CreditId { get; set; }
		public Credit Credit { get; set; }
		public DateTime PaymentDate { get; set; }
        public decimal PayoutAmount { get; set; }
		public bool IsSuccessful { get; set; }
		public bool IsOverdue { get; set; }
		public bool IsLast { get; set; }

		public CreditPayment()
		{

		}

		public CreditPayment(Credit credit)
		{
			CreditId = credit.CreditId;
			Credit = credit;
			PaymentDate = DateTime.Now;
			PayoutAmount = credit.PayoutAmount;
			IsLast = false;
			IsOverdue = false;
			IsSuccessful = true;
		}
	}
}

