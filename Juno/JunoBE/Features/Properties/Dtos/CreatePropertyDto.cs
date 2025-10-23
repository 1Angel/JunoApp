namespace JunoBE.Features.Properties.Dtos
{
    public class CreatePropertyDto
    {
        public int price { get; set; }
        public int bedrooms { get; set; }
        public int bathrooms { get; set; }
        public required string description { get; set; }
        public string homeStatus { get; set; }
        public string homeType { get; set; }

        //address part
        public required string street { get; set; }
        public required string city { get; set; }
        public required string province { get; set; }

        //geolocation
        public double latitude { get; set; }
        public double longitude { get; set; }
    }
}