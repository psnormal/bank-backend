using System;
namespace credit_service.Models
{
	public class ShortCreditRateModel
	{
        public string Title { get; set; }
        public CreditRateStatus IsActive { get; set; }

        public ShortCreditRateModel(CreditRate model)
		{
			this.Title = model.Title;
			this.IsActive = model.IsActive;
		}
	}
}

