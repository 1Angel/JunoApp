using JunoBE.Features.Bookmarks;
using JunoBE.Features.Properties;
using Microsoft.AspNetCore.Identity;

namespace JunoBE.Features.User
{
    public class UserEntity : IdentityUser
    {
        public string first_name { get; set; }
        public string last_name { get; set; }
        public int posts { get; set; }
        public string suscriptionStatus { get; set; }
        public List<PropertyEntity> properties { get; set; }
        public List<BookmarkEntity> bookmarks { get; set; }
    }
}