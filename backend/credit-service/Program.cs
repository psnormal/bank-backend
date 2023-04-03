using credit_service.Models;
using credit_service.Services;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddCors();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<ICreditRateService, CreditRateService>();
builder.Services.AddScoped<IUserCreditService, UserCreditService>();
builder.Services.AddScoped<ICreditRatingService, CreditRatingService>();
builder.Services.AddHostedService<RepeatingService>();


var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<Context>(options => options.UseSqlServer(connectionString));

/*builder.Services.AddDbContext<Context>(
            dbContextOptions => dbContextOptions
                .UseMySql(connectionString, ServerVersion.AutoDetect(connectionString))
                .LogTo(Console.WriteLine, LogLevel.Information)
                .EnableSensitiveDataLogging()
                .EnableDetailedErrors());*/

var app = builder.Build();

using var serviceScope = app.Services.CreateScope();
var dbContext = serviceScope.ServiceProvider.GetService<Context>();

dbContext?.Database.Migrate();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(builder => builder.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000", "http://localhost:3001"));

app.UseAuthorization();

app.MapControllers();

app.Run();

