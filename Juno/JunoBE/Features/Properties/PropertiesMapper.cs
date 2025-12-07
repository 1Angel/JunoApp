using JunoBE.Features.Address;
using JunoBE.Features.Properties.Dtos;
using JunoBE.Features.ProperyImage;
using JunoBE.Features.User;

namespace JunoBE.Features.Properties
{
    public class PropertiesMapper
    {
        private readonly AddressMapper _addressMapper;
        private readonly PropertyImageMapper propertyImageMapper;
        private readonly UserMapper userMapper;

        public PropertiesMapper(AddressMapper addressMapper, PropertyImageMapper propertyImageMapper, UserMapper userMapper)
        {
            _addressMapper = addressMapper;
            this.propertyImageMapper = propertyImageMapper;
            this.userMapper = userMapper;
        }


        public PropertyEntity ToEntity(CreatePropertyDto createPropertyDto, string userId)
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

        public PropertiesDto ToDto(PropertyEntity property, string userId)
        {
            return new PropertiesDto
            {
                Id = property.Id,
                price = property.price,
                bedrooms = property.bedrooms,
                bathrooms = property.bathrooms,
                description = property.description,
                latitude = property.latitude,
                longitude = property.longitude,
                address = _addressMapper.ToAddressDto(property.address),
                homeStatus = property.homeStatus.ToString(),
                homeType = property.homeType.ToString(),
                square_meters = property.square_meters,
                user = userMapper.ToDto(property.user),
                isBookmarkedByUser = property.bookmark.Any(u=>u.UserEntityId == userId),
                isCreatedByUser = property.UserEntityId.Equals(userId),
                images = propertyImageMapper.ToDto(property.propertiesImage),
                createdAt = property.createdAt
            };
        }

    }
}