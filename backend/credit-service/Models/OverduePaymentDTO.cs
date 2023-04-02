using System;
namespace credit_service.Models
{
	public class OverduePaymentDTO
	{
        public Guid CreditPaymentId { get; set; }
        public Guid CreditId { get; set; }
        public DateTime PaymentDate { get; set; }
        public decimal PayoutAmount { get; set; }

        public OverduePaymentDTO(CreditPayment payment)
		{
            CreditPaymentId = payment.CreditPaymentId;
            CreditId = payment.CreditId;
            PaymentDate = payment.PaymentDate;
            PayoutAmount = payment.PayoutAmount;
		}
	}
}

