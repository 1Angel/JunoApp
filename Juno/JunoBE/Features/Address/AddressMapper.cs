using JunoBE.Features.Address.Dtos;

namespace JunoBE.Features.Address
{
    public class AddressMapper
    {
        public AddressDto ToAddressDto(AddressEntity? address)
        {
            return new AddressDto
            {
                street = address?.street,
                city = address?.city,
                province = address?.province
            };
        }
    }
}