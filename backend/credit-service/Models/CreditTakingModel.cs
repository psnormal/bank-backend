﻿using System;
namespace credit_service.Models
{
	public class CreditTakingDto
	{
        public int PaymentTerm { get; set; }
        public decimal LoanAmount { get; set; }

        public CreditTakingDto()
		{
		}
	}
}

