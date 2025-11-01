using System.Threading.Tasks;
using JunoBE.Common.Services;
using JunoBE.Features.ProperyImage.Entity;

namespace JunoBE.Features.ProperyImage
{
    public class PropertyImageMapper
    {
        public PropertiesImageEntity ToEntity(string imageUrl, int propertyId)
        {
            return new PropertiesImageEntity
            {
                imageUrl = imageUrl,
                PropertyEntityId = propertyId
            };
        }

        public List<PropertiesImageDto> ToDto(List<PropertiesImageEntity> propertiesImageEntity)
        {
            return propertiesImageEntity.Select(x => new PropertiesImageDto
            {
                imageUrl = x.imageUrl
            }).ToList();
        }
    }
}