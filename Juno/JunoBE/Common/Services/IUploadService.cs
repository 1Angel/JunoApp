namespace JunoBE.Common.Services
{
    public interface IUploadService
    {
        Task<string> UploadAsync(Stream stream, string contentType, CancellationToken cancellationToken = default);
        Task DeleteAsync(string fileId, CancellationToken cancellationToken = default);
    }
}