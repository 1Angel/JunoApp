using JunoBE.Features.Address.Dtos;
using JunoBE.Features.ProperyImage;
using JunoBE.Features.User.Dtos;

namespace JunoBE.Features.Properties.Dtos
{
    public  record PropertiesDto
    (
          int Id,
          int price,
          int bedrooms,
          int bathrooms,
          string description,
          double latitude,
          double longitude,
          AddressDto address,
        //add home status table -For sale or for rent, recently-sold
          string homeStatus,
          string homeType,
          int square_meters,
          UserDto user,
          bool isBookmarkedByUser,
          bool isCreatedByUser,
          List<PropertiesImageDto> images,
          DateTime createdAt
    ){}
}