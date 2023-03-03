using core_service.Services;
using core_service.DTO;
using Microsoft.AspNetCore.Mvc;

namespace core_service.Controllers
{
    [Route("api/operation")]
    [ApiController]
    public class OperationController : ControllerBase
    {
        private IOperationService _operationService;

        public OperationController(IOperationService operationService)
        {
            _operationService = operationService;
        }

        [HttpPost]
        [Route("create")]
        public async Task<ActionResult<InfoAccountDTO>> CreateOperation(CreateOperationDTO model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            try
            {
                await _operationService.CreateOperation(model);
                return Ok();
            }
            catch (Exception ex)
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
