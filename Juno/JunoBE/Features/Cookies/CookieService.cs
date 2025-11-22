using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JunoBE.Features.Cookies
{
    public class CookieService
    {
        public void setCookie(string value, HttpContext httpContext)
        {
            httpContext.Response.Cookies.Append("accessToken", value, new CookieOptions
            {
                Expires = DateTimeOffset.UtcNow.AddMonths(1),
                HttpOnly = true,
                IsEssential = true,
                Secure = true,
                SameSite = SameSiteMode.None
            });
        }

        public void DeleteCookie(string key, HttpContext httpContext)
        {
            httpContext.Response.Cookies.Delete(key);
        }
    }
}