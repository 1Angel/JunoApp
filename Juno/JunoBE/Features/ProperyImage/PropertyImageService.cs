using JunoBE.Common.Services;
using JunoBE.Data;

namespace JunoBE.Features.ProperyImage
{
    public class PropertyimageService
    {
        private readonly AppDbContext _context;
        private readonly IUploadService uploadService;

        public PropertyimageService(AppDbContext context, IUploadService uploadService)
        {
            _context = context;
            this.uploadService = uploadService;
        }

        public async Task UploadImages(int propertyId, List<IFormFile> images)
        {
            foreach (var i in images)
            {
                using Stream stream = i.OpenReadStream();

                var imageUrl = await uploadService.UploadAsync(stream, i.ContentType);
                var image = PropertyImageMapper.ToEntity(imageUrl, propertyId);
                await _context.propertiesImages.AddAsync(image);
            }
            await _context.SaveChangesAsync();
        }

        public async Task DeleteImage()
        {

        }
    }
}