using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JunoBE.Features.User.Jwt
{
    public class JwtSettings
    {
        public const string SectionName = "Jwt";
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public string JwtKey { get; set; }
    }
}