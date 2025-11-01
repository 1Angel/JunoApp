using JunoBE.Features.Properties;

namespace JunoBE.Features.ProperyImage.Entity
{
    public class PropertiesImageEntity
    {
        public int id { get; set; }
        public required string imageUrl { get; set; }
        public PropertyEntity property { get; set; }
        public int PropertyEntityId { get; set; }
    }
}