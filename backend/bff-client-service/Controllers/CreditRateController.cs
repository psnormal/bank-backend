using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using bff_client_service.CreditDTO;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace bff_client_service.Controllers
{
    [Route("api/[controller]")]
    public class CreditRateController : Controller
    {
        [Route("AllCreditRates")]
        [HttpGet]
        public async Task<ActionResult<List<ShortCreditRateModel>>> Get()
        {
            var url = $"https://localhost:7239/api/CreditRate/AllCreditRates";
            using var client = new HttpClient();
            var response = await client.GetAsync(url);
            if (response.IsSuccessStatusCode)
            {
                var resultContent = await response.Content.ReadFromJsonAsync<List<ShortCreditRateModel>>();
                return resultContent;
            }
            return StatusCode(500, "Something went wrong");
        }

        [Route("NewCreditRate")]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]CreditRateModel model)
        {
            var url = $"https://localhost:7239/api/CreditRate/NewCreditRate";
            using var client = new HttpClient();
            JsonContent creditRate = JsonContent.Create(model);
            var response = await client.PostAsync(url, creditRate);
            if (response.IsSuccessStatusCode)
            {
                //var resultContent = await response.Content.ReadFromJsonAsync<CreditRateModel>();
                return Ok();
            }
            else return Ok();
        }

        [HttpPut("{creditRateId}/edit")]
        public async Task<IActionResult> Put(Guid creditRateId, [FromBody] CreditRateModel model)
        {
            var url = $"https://localhost:7239/api/CreditRate/{creditRateId}/edit";
            using var client = new HttpClient();
            JsonContent creditRate = JsonContent.Create(model);
            var response = await client.PutAsync(url, creditRate);
            if (response.IsSuccessStatusCode)
            {
                //var resultContent = await response.Content.ReadFromJsonAsync<CreditRateModel>();
                return Ok();
            }
            else return Ok();
        }

        [HttpDelete("{creditRateId}/delete")]
        public async Task<IActionResult> Delete(Guid creditRateId)
        {
            var url = $"https://localhost:7239/api/CreditRate/{creditRateId}/delete";
            using var client = new HttpClient();
            var response = await client.DeleteAsync(url);
            if (response.IsSuccessStatusCode)
            {
                return Ok();
            }
            return StatusCode(500, "Something went wrong");
        }
    }
}

