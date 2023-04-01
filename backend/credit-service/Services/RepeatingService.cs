using System;

namespace credit_service.Services
{
	public class RepeatingService: BackgroundService
	{
        private readonly PeriodicTimer _timer = new(TimeSpan.FromMilliseconds(5000));
        public IServiceProvider Services { get; }
        private readonly ILogger<RepeatingService> _logger;

        public RepeatingService(IServiceProvider service, ILogger<RepeatingService> logger)
		{
            _logger = logger;
            Services = service;
		}

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (await _timer.WaitForNextTickAsync(stoppingToken)
                && !stoppingToken.IsCancellationRequested)
            {
                await DoWork(stoppingToken);
            }
        }

        private async Task DoWork(CancellationToken stoppingToken)
        {
            Console.WriteLine(DateTime.Now.ToString("O"));
            using (var scope = Services.CreateScope())
            {
                var userCreditService =
                    scope.ServiceProvider
                        .GetRequiredService<IUserCreditService>();

                await userCreditService.MakeAllRegularPayments();
            }
        }
    }
}

