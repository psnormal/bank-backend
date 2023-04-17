using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using bff_client_service.AccountDTO;
using bff_client_service.DTO;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using RabbitMQ.Client;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace bff_client_service.Controllers
{
    [Route("api")]
    public class OperationController : Controller
    {

        // POST api/values
        [HttpPost]
        [Route("operation/create")]
        public async Task<IActionResult> Post([FromBody]CreateOperation model)
        {
            var factory = new ConnectionFactory { HostName = "localhost" };
            using var connection1 = factory.CreateConnection();
            using var channel = connection1.CreateModel();

            var url1 = $"https://localhost:7139/api/account/{model.AccountNumber}?UserID={model.UserID}";
            using var client = new HttpClient();
            //using HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, url1);
            // выполняем запрос
            var response0 = await client.GetAsync(url1);
            if (response0.IsSuccessStatusCode)
            {
                //var resultContent = response0.Content.ReadFromJsonAsync<AccountInfo>();
                var resultContent = await response0.Content.ReadFromJsonAsync<AccountInfo>();
                //var resultContent1 = response0.ToString();
                //var resultContent = JsonConvert.DeserializeObject<AccountInfo>(resultContent1);
                if (resultContent.Balance >= -1 * model.TransactionAmount)
                {
                    channel.QueueDeclare(queue: "accounts-operations",
                                durable: true,
                                exclusive: false,
                                autoDelete: false,
                                arguments: null);

                    var operation = model;
                    var json = JsonConvert.SerializeObject(operation);
                    var body = Encoding.UTF8.GetBytes(json);
                    channel.BasicPublish(exchange: "",
                                         routingKey: "accounts-operations",
                                         basicProperties: null,
                                         body: body);
                    
                    return Ok();
                }
                else return StatusCode(400, "Not enough money");
            }
            else
            {
                return BadRequest();
            }
            
        }

        // POST api/values
        [HttpPost]
        [Route("transaction/create")]
        public async Task<IActionResult> Post([FromBody] CreateTransactionDTO model)
        {
            var factory = new ConnectionFactory { HostName = "localhost" };
            using var connection1 = factory.CreateConnection();
            using var channel = connection1.CreateModel();

            var url1 = $"https://localhost:7139/api/account/{model.SenderAccountNumber}?UserID={model.UserID}";
            using var client = new HttpClient();

            var response0 = await client.GetAsync(url1);

            if (response0.IsSuccessStatusCode)
            {
                var resultContent = await response0.Content.ReadFromJsonAsync<AccountInfo>();
                if (resultContent.Balance >= model.TransactionAmount)
                {
                    channel.QueueDeclare(queue: "accounts-transactions",
                                durable: true,
                                exclusive: false,
                                autoDelete: false,
                                arguments: null);

                    var transaction = model;
                    var json = JsonConvert.SerializeObject(transaction);
                    var body = Encoding.UTF8.GetBytes(json);
                    channel.BasicPublish(exchange: "",
                                         routingKey: "accounts-transactions",
                                         basicProperties: null,
                                         body: body);
                    return Ok();
                }
                else return StatusCode(400, "Not enough money");
            }
            else
            {
                return BadRequest();
            }            
        }
    }
}

