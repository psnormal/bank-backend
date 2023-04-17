using System.ComponentModel.DataAnnotations;

namespace core_service.DTO
{
    public class InfoOperationsDTO
    {
        [Required]
        public List<InfoOperationDTO> Operations { get; set; }
        /*[Required]
        public PageInfoDTO PageInfo { get; set; }*/
    }
}
