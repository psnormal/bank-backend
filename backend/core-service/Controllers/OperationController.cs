using core_service.Services;
using core_service.DTO;
using Microsoft.AspNetCore.Mvc;

namespace core_service.Controllers
{
    [Route("api")]
    [ApiController]
    public class OperationController : ControllerBase
    {
        private IOperationService _operationService;

        public OperationController(IOperationService operationService)
        {
            _operationService = operationService;
        }

        [HttpPost]
        [Route("operation/create")]
        public async Task<IActionResult> CreateOperation(CreateOperationDTO model)
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

        [HttpGet]
        [Route("account/{id}/operations/{page}")]
        public ActionResult<InfoOperationsDTO> GetOperations(Guid UserID, int id, int page)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            try
            {
                return _operationService.GetOperations(UserID, id, page);
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
