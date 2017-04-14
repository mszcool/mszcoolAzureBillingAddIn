/*
 * ADAL Configuration for Azrue AD authentication
 */

var mszAuthAzureAdConfig = {
    tenant: 'marioszplive.onmicrosoft.com',
    clientId: '967cdf4f-dd58-45cc-8a14-b27ee5efc6cf',
    endpoints: {
        'https://graph.microsoft.com/': 'https://graph.microsoft.com/',
        'https://management.azure.com/': 'https://management.azure.com/',
        'https://localhost:44323/api/': 'https://marioszplive.onmicrosoft.com/mszcoolAzureBillingApiBackend' 
    }
};


Logging.log = function (msg) {
    console.log(msg);
};
Logging.level = 3;