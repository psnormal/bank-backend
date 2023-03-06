using System;
namespace credit_service.Models
{
	public class ShortCreditRateModel
	{
		public Guid CreditRateID { get; set; }
        public string Title { get; set; }
        public CreditRateStatus IsActive { get; set; }

        public ShortCreditRateModel(CreditRate model)
		{
			CreditRateID = model.CreditRateId;
			this.Title = model.Title;
			this.IsActive = model.IsActive;
		}
	}
}

