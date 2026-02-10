using JunoBE.Features.Address;
using JunoBE.Features.Properties.Dtos;
using JunoBE.Features.ProperyImage;
using JunoBE.Features.User;

namespace JunoBE.Features.Properties
{
    public static class PropertiesMapper
    {

        public static PropertyEntity ToEntity(CreatePropertyDto createPropertyDto, string userId)
        {
            return new PropertyEntity
            {
                price = createPropertyDto.price,
                bedrooms = createPropertyDto.bedrooms,
                bathrooms = createPropertyDto.bathrooms,
                description = createPropertyDto.description,
                address = new AddressEntity
                {
                    street = createPropertyDto.street,
                    city = createPropertyDto.city,
                    province = createPropertyDto.province
                },
                homeStatus = createPropertyDto.homeStatus,
                homeType = createPropertyDto.homeType,
                latitude = createPropertyDto.latitude,
                longitude = createPropertyDto.longitude,
                UserEntityId = userId,
                square_meters = createPropertyDto.square_meters
            };
        }

        public static PropertiesDto ToDto(PropertyEntity property, string userId)
        {
            return new PropertiesDto
            (
                 property.Id,
                 property.price,
                 property.bedrooms,
                 property.bathrooms,
                property.description,
                 property.latitude,
                  property.longitude,
                 AddressMapper.ToAddressDto(property.address),
                 property.homeStatus.ToString(),
                property.homeType.ToString(),
                 property.square_meters,
                 UserMapper.ToDto(property.user),
                 property.bookmark.Any(u => u.UserEntityId == userId),
                  property.UserEntityId.Equals(userId),
                PropertyImageMapper.ToDto(property.propertiesImage),
                property.createdAt
            );
        }

    }
}