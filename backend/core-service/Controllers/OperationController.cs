using core_service.Services;
using core_service.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace core_service.Controllers
{
    [Route("api")]
    [ApiController]
    public class OperationController : ControllerBase
    {
        private IOperationService _operationService;
        IHubContext<OperationsHub> _hubContext;

        public OperationController(IOperationService operationService, IHubContext<OperationsHub> hubContext)
        {
            _operationService = operationService;
            _hubContext = hubContext;
        }

        [HttpPost]
        [Route("operation/create")]
        public async Task<IActionResult> CreateOperation(CreateOperationDTO model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            /*//проверка авторизации
            var checker = new CheckAccess(true, false);
            var url = $"https://localhost:7290/api/auth/check";
            using var client = new HttpClient();
            JsonContent content = JsonContent.Create(checker);
            var response = await client.PostAsync(url, content);

            if (response.IsSuccessStatusCode)
            {*/
                try
                {
                    await _operationService.CreateOperation(model);
                    await GetOperations(model.UserID, model.AccountNumber);
                    return Ok();
                }
                catch (Exception ex)
                {
                    if (ex.Message == "This account does not exist")
                    {
                        return StatusCode(400, ex.Message);
                    }
                    if (ex.Message == "This account is closed")
                    {
                        return StatusCode(400, ex.Message);
                    }
                    if (ex.Message == "Not enough money")
                    {
                        return StatusCode(400, ex.Message);
                    }
                    return StatusCode(500, "Something went wrong");
                }
            /*}
            else
            {
                return Unauthorized();
            }*/
        }

        [HttpGet]
        [Route("account/{id}/operations")]
        public async Task<IActionResult> GetOperations(Guid UserID, int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            try
            {
                var operationsList = _operationService.GetOperations(UserID, id);
                string groupName = id.ToString();
                await _hubContext.Clients.Group(groupName).SendAsync("GetOperations", operationsList);
                //await _hubContext.Clients.All.SendAsync("GetOperations", operationsList);
                //return _operationService.GetOperations(UserID, id);
                return Ok();
            }
            catch (Exception ex)
            {
                if (ex.Message == "This account does not exist")
                {
                    return StatusCode(400, ex.Message);
                }
                if (ex.Message == "This page does not exist")
                {
                    return StatusCode(400, ex.Message);
                }
                return StatusCode(500, "Something went wrong");
            }
        }
    }
}
