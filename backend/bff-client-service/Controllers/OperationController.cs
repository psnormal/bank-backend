using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using bff_client_service.DTO;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RabbitMQ.Client;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace bff_client_service.Controllers
{
    [Route("api/[controller]")]
    public class OperationController : Controller
    {

        // POST api/values
        [HttpPost]
        [Route("operation/create")]
        public void Post([FromBody]CreateOperation model)
        {
            var factory = new ConnectionFactory { HostName = "localhost" };
            using var connection1 = factory.CreateConnection();
            using var channel = connection1.CreateModel();

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
        }

        // POST api/values
        [HttpPost]
        [Route("transaction/create")]
        public void Post([FromBody] CreateTransactionDTO model)
        {
            var factory = new ConnectionFactory { HostName = "localhost" };
            using var connection1 = factory.CreateConnection();
            using var channel = connection1.CreateModel();

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
        }
    }
}

