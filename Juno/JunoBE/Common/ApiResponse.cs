using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace JunoBE.Common
{
    public class ApiResponse
    {
        public ApiResponse(string message, HttpStatusCode httpStatusCode)
        {
            this.message = message;
            this.httpStatusCode = httpStatusCode;
        }

        public string message { get; set; }
        public HttpStatusCode httpStatusCode { get; set; }
    }
}