using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Results;

namespace mszcoolAzureBillingSheetWeb.Controllers
{
    public class SubscriptionsController : ApiController
    {
        [HttpGet]
        public async Task<string> GetSubscriptions(string token)
        {
            var httpRequest = new HttpClient();
            httpRequest.DefaultRequestHeaders.Host = "management.azure.com";
            httpRequest.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);

            var result = await httpRequest.GetAsync(new Uri("https://management.azure.com/subscriptions?api-version=2016-06-01"));

            if (result.IsSuccessStatusCode)
            {
                return await result.Content.ReadAsStringAsync();
            }
            else
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }
        }
    }
}
