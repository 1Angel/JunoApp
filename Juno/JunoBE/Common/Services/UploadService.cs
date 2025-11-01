
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;

namespace JunoBE.Common.Services
{
    public class UploadService : IUploadService
    {
        private readonly BlobServiceClient blobServiceClient;
        private const string containerName = "files";

        public UploadService(BlobServiceClient blobServiceClient)
        {
            this.blobServiceClient = blobServiceClient;
        }

        public async Task DeleteAsync(string fileId, CancellationToken cancellationToken = default)
        {
            BlobContainerClient containerClient = blobServiceClient.GetBlobContainerClient(containerName);

            BlobClient blobClient = containerClient.GetBlobClient(fileId);
            await blobClient.DeleteIfExistsAsync();
        }

        public async Task<string> UploadAsync(Stream fileStream, string contentType, CancellationToken cancellationToken = default)
        {
            BlobContainerClient containerClient = blobServiceClient.GetBlobContainerClient(containerName);

            var fileId = Guid.NewGuid().ToString();

            BlobClient blobClient = containerClient.GetBlobClient(fileId);

            await blobClient.UploadAsync(fileStream, new BlobHttpHeaders { ContentType = contentType });
            return blobClient.Uri.ToString();
        }

    }
}