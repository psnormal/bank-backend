using System;
namespace credit_service.Models
{
	public class CreditRateInformationModel
	{
        public string Title { get; set; }
        public string? Description { get; set; }
        public double InterestRate { get; set; }
        public CreditRateStatus IsActive { get; set; }

        public CreditRateInformationModel(CreditRate model)
        {
            this.Title = model.Title;
            this.Description = model.Description;
            this.InterestRate = model.InterestRate;
            this.IsActive = model.IsActive;
        }
    }

}

