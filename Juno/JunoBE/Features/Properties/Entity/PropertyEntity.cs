
using JunoBE.Features.Address;
using JunoBE.Features.ProperyImage.Entity;

namespace JunoBE.Features.Properties
{
    public class PropertyEntity
    {
        public int Id { get; set; }
        public int price { get; set; }
        public int bedrooms { get; set; }
        public int bathrooms { get; set; }
        public string description { get; set; }
        public double latitude { get; set; }
        public double longitude { get; set; }
        //add address table - street name, city, municipio, province, 
        public AddressEntity? address { get; set; }
        //add home status table -For sale or for rent, recently-sold
        public string homeStatus { get; set; }
        public DateTime createdAt { get; set; } = DateTime.UtcNow;
        //add home type table -normal house, family house, for one person, etc.
        public string homeType { get; set; }
        public int square_meters { get; set; }

        //propertyImage relationship
        public List<PropertiesImageEntity> propertiesImage { get; set; }

    }
}