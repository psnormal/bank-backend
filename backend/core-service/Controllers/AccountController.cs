using core_service.DTO;
using core_service.Services;
using Microsoft.AspNetCore.Mvc;

namespace core_service.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost]
        [Route("create")]
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
        [Route("{id}")]
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
    }
}
