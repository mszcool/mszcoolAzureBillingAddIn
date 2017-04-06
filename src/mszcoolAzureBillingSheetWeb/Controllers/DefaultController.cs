using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Results;

namespace mszcoolAzureBillingSheetWeb.Controllers
{
    public class DefaultController : ApiController
    {
        public JsonResult<string> Get()
        {
            return Json("Azure Billing Office Add-In APIs are running here!");
        }
    }
}
