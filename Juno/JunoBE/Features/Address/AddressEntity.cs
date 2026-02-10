
using JunoBE.Features.Properties;

namespace JunoBE.Features.Address
{
    public class AddressEntity
    {
        public int Id { get; set; }
        public required string street { get; set; }
        public required string city { get; set; }
        public required string province { get; set; }
        //relationship
        public int PropertyEntityId { get; set; }
        public PropertyEntity property { get; set; }
    }
}