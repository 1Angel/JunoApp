using JunoBE.Features.Address.Dtos;
using JunoBE.Features.ProperyImage;
using JunoBE.Features.User.Dtos;

namespace JunoBE.Features.Properties.Dtos
{
    public class PropertiesDto
    {
        public int Id { get; set; }
        public int price { get; set; }
        public int bedrooms { get; set; }
        public int bathrooms { get; set; }
        public string description { get; set; }
        public double latitude { get; set; }
        public double longitude { get; set; }
        public AddressDto address { get; set; }
        //add home status table -For sale or for rent, recently-sold
        public string homeStatus { get; set; }
        public string homeType { get; set; }
        public int square_meters { get; set; }
        public UserDto user { get; set; }
        public List<PropertiesImageDto> images { get; set; }
        public DateTime createdAt { get; set; }
    }
}