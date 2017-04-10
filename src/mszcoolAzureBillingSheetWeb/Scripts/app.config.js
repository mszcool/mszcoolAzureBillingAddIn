/*
 * ADAL Configuration for Azrue AD authentication
 */

var mszAuthAzureAdConfig = {
    tenant: 'marioszplive.onmicrosoft.com',
    clientId: '967cdf4f-dd58-45cc-8a14-b27ee5efc6cf',
    endpoints: {
        'MicrosoftGraph': 'https://graph.microsoft.com/',
        'AzureManagement': 'https://management.azure.com'
    }
};


Logging.log = function (msg) {
    console.log(msg);
};
Logging.level = 3;