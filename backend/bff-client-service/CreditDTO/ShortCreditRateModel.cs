using System;
namespace bff_client_service.CreditDTO
{
	public class ShortCreditRateModel
	{
        public Guid CreditRateID { get; set; }
        public string Title { get; set; }
        public CreditRateStatus IsActive { get; set; }
        public ShortCreditRateModel()
		{
		}
	}
}

