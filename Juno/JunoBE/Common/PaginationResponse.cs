namespace JunoBE.Common
{
    public class PaginationResponse<T> where T : class
    {
        public int pageNumber { get; set; }
        public int pageSize { get; set; }
        public int totalCount { get; set; }
        public T results { get; set; }
        public PaginationResponse(int pageNumber, int pageSize, int totalCount, T results)
        {
            this.pageNumber = pageNumber;
            this.pageSize = pageSize;
            this.totalCount = totalCount;
            this.results = results;
        }


    }
}