using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using bff_client_service.AccountDTO;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace bff_client_service.Controllers
{
    [Route("api")]
    public class AccountController : Controller
    {
        [HttpPost]
        [Route("account/create")]
        public async Task<ActionResult<InfoAccountDTO>> CreateAccount([FromBody]CreateAccountDTO model)
        {
            var url = $"https://localhost:7139/api/account/create";
            using var client = new HttpClient();
            JsonContent account = JsonContent.Create(model);
            var response = await client.PostAsync(url, account);
            if (response.IsSuccessStatusCode)
            {
                var resultContent = await response.Content.ReadFromJsonAsync<InfoAccountDTO>();
                return resultContent;
            }
            return StatusCode(500, "Something went wrong");
        }

        /*[HttpGet]
        [Route("accounts/all")]
        //[Authorize(Roles = "Employee")]
        public ActionResult<InfoAccountsDTO> GetAllUserAccounts(Guid UserID)
        {
            var url = $"https://localhost:7139/api/accounts/all";
            var content = new StringContent(UserID);
        }*/
    }
}

