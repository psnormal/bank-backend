using core_service;
using core_service.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using RabbitMQ.Client.Events;
using RabbitMQ.Client;
using System.Text;
using core_service.DTO;
using Newtonsoft.Json;
using core_service.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;

//RabbitMQ connection
var factory = new ConnectionFactory { HostName = "localhost" };
using var connection1 = factory.CreateConnection();
using var channel = connection1.CreateModel();
using var channel2 = connection1.CreateModel();

channel.QueueDeclare(queue: "accounts-operations",
                     durable: true,
                     exclusive: false,
                     autoDelete: false,
                     arguments: null);

channel2.QueueDeclare(queue: "accounts-transactions",
                     durable: true,
                     exclusive: false,
                     autoDelete: false,
                     arguments: null);

/*var op = new CreateOperationDTO()
{
    UserID = new Guid("733594c4-3167-47b0-2bb0-08db1e40fb2e"),
    AccountNumber = 1,
    DateTime = DateTime.Now,
    TransactionAmount = 30
};
var a = 0;
while(a < 3)
{
    Thread.Sleep(3000);
    a++;
    var json = JsonConvert.SerializeObject(op);
    var body = Encoding.UTF8.GetBytes(json);
    channel.BasicPublish(exchange: "",
                         routingKey: "accounts-operations",
                         basicProperties: null,
                         body: body);
}*/

MessageBrokerHelp mbh = new MessageBrokerHelp();
var consumer = new EventingBasicConsumer(channel);
consumer.Received += async (sender, e) =>
{
    var body = e.Body;
    var message = Encoding.UTF8.GetString(body.ToArray());
    var operation = JsonConvert.DeserializeObject<CreateOperationDTO>(message);
    await mbh.CreateOperation(operation);
};

channel.BasicConsume(queue: "accounts-operations",
                     autoAck: true,
                     consumer: consumer);

var consumer2 = new EventingBasicConsumer(channel2);
consumer2.Received += async (sender, e) =>
{
    var body = e.Body;
    var message = Encoding.UTF8.GetString(body.ToArray());
    var transaction = JsonConvert.DeserializeObject<CreateTransactionDto>(message);
    await mbh.CreateTransaction(transaction);
};

channel2.BasicConsume(queue: "accounts-transactions",
                     autoAck: true,
                     consumer: consumer2);

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddSignalR();
builder.Services.AddControllers();
builder.Services.AddCors();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Services
builder.Services.AddScoped<IAccountService, AccountService>();
builder.Services.AddScoped<IOperationService, OperationService>();
builder.Services.AddSingleton<IDictionary<string, int>>(opts => new Dictionary<string,int>());

//DB connection:
var connection = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(connection));

builder.Services.AddAuthorization();
builder.Services.AddAuthentication(config =>
{
    config.DefaultAuthenticateScheme =
        JwtBearerDefaults.AuthenticationScheme;
    config.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
                .AddJwtBearer("Bearer", options =>
                {
                    options.Authority = "https://localhost:7290";
                    options.Audience = "WebAPI";
                    options.RequireHttpsMetadata = false;
                });

var app = builder.Build();

//DB init and update:
using var serviceScope = app.Services.CreateScope();
var context = serviceScope.ServiceProvider.GetService<ApplicationDbContext>();
context?.Database.Migrate();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(builder => builder.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000", "http://localhost:3001", "https://localhost:7139/operations").AllowCredentials());

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapHub<OperationsHub>("/operations");

app.Run();