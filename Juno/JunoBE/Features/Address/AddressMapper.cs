using JunoBE.Features.Address.Dtos;

namespace JunoBE.Features.Address
{
    public static class AddressMapper
    {
        public static AddressDto ToAddressDto(AddressEntity? address)
        {
            return new AddressDto(address!.street, address.city, address.province);
        }
    }
}