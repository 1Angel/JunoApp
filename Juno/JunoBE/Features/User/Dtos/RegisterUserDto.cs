namespace JunoBE.Features.User.Dtos
{
    public class RegisterUserDto
    {
        public string first_name { get; set; }
        public string last_name { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public string phone_number { get; set; }
    }
}