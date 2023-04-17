using core_service.DTO;
using core_service.Services;
using core_service.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization.Infrastructure;

namespace core_service.Controllers
{
    [Route("api")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost]
        [Route("account/create")]
        //[Authorize(Roles = "Client")]
        public async Task<ActionResult<InfoAccountDTO>> CreateAccount(CreateAccountDTO model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            try
            {
                var accountNumber = await _accountService.CreateAccount(model);
                return GetAccount(model.UserID, accountNumber);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Something went wrong");
            }
        }

        [HttpGet]
        [Route("account/{id}")]
        //[Authorize(Roles = "Client, Employee")]
        public ActionResult<InfoAccountDTO> GetAccount(Guid UserID, int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            try
            {
                return _accountService.GetInfoAccount(UserID, id);
            }
            catch(Exception ex)
            {
                if (ex.Message == "This account does not exist")
                {
                    return StatusCode(400, ex.Message);
                }
                return StatusCode(500, "Something went wrong");
            }
        }

        [HttpPut]
        [Route("account/{id}/edit")]
        //[Authorize(Roles = "Client, Employee")]
        public async Task<ActionResult<InfoAccountDTO>> EditAccount(Guid UserID, int id, AccountState accountState)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            try
            {
                await _accountService.EditAccount(UserID, id, accountState);
                return GetAccount(UserID, id);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Something went wrong");
            }
        }

        [HttpGet]
        [Route("accounts/all")]
        //[Authorize(Roles = "Client, Employee")]
        public ActionResult<InfoAccountsDTO> GetAllUserAccounts(Guid UserID)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            try
            {
                return _accountService.GetAllUserAccounts(UserID);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Something went wrong");
            }
        }
    }
}
