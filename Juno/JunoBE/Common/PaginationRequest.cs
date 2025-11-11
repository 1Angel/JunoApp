namespace JunoBE.Common
{
    public class PaginationRequest
    {
        public int pageNumber { get; set; } = 1;
        public int pageSize { get; set; } = 10;
        public string? search { get; set; }
        //move everything above here to another class an use herencia xd, because maybe i want to use this class multiple times
        public int? filterByBeds { get; set; }
        public string? homestatus { get; set; }
        public int? minimumPrice { get; set; }
        public int? maximumPrice { get; set; }
    }
}