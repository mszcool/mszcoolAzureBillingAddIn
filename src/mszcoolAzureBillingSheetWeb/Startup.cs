using Microsoft.Owin;
using mszcoolAzureBillingSheetWeb.App_Start;
using Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

[assembly:OwinStartup(typeof(mszcoolAzureBillingSheetWeb.Startup))]

namespace mszcoolAzureBillingSheetWeb
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var config = new HttpConfiguration();

            WebApiConfig.Register(config);

            app.UseWebApi(config);
        }
    }
}