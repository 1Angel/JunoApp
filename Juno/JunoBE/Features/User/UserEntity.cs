using JunoBE.Features.Bookmarks;
using JunoBE.Features.Properties;
using Microsoft.AspNetCore.Identity;

namespace JunoBE.Features.User
{
    public class UserEntity : IdentityUser
    {
        public required string first_name { get; set; }
        public required string last_name { get; set; }
        public int posts { get; set; }
        public required string suscriptionStatus { get; set; }
        public List<PropertyEntity> properties { get; set; }
        public List<BookmarkEntity> bookmarks { get; set; }
    }
}