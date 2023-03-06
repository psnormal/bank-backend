using System;
namespace credit_service.Models
{
	public class CreditRate
	{
		public Guid CreditRateId { get; set; }
		public string Title { get; set; }
		public string? Description { get; set; }
		public int InterestRate { get; set; }
		public CreditRateStatus IsActive { get; set; }

        public CreditRate()
		{

		}

        public CreditRate(CreditRateModel model)
		{
			this.Title = model.Title;
			this.Description = model.Description;
			this.InterestRate = model.InterestRate;
			this.IsActive = CreditRateStatus.active;
		}
	}
}

