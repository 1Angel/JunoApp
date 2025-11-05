using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using JunoBE.Features.User;

namespace JunoBE.Common.Authorization
{
    public class CurrentUser
    {
        private readonly IHttpContextAccessor httpContextAccessor;

        public CurrentUser(IHttpContextAccessor httpContextAccessor)
        {
            this.httpContextAccessor = httpContextAccessor;
        }

        public string? getUser()
        {
            return httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Name);
        }
    }
}