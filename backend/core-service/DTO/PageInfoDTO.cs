namespace core_service.DTO
{
    public class PageInfoDTO
    {
        public int PageSize { get; set; } //сколько операций на странице
        public int PageCount { get; set; } //сколько всего страниц
        public int CurrentPage { get; set; } //номер текущей страницы
    }
}
