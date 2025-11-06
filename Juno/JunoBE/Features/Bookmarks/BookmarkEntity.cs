using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JunoBE.Features.Properties;
using JunoBE.Features.User;

namespace JunoBE.Features.Bookmarks
{
    public class BookmarkEntity
    {
        public int Id { get; set; }
        public UserEntity user { get; set; }
        public string UserEntityId { get; set; }
        public PropertyEntity property { get; set; }
        public int PropertyEntityId { get; set; }
    }
}