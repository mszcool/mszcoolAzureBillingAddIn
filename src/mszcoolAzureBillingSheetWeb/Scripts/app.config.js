/*
 * ADAL Configuration for Azrue AD authentication
 */

var mszAuthAzureAdConfig = {
    clientId: '9ce26f20-cb6e-438b-bc31-70e8c7ac8cd5',
    endpoints: {
        'https://graph.microsoft.com': 'https://graph.microsoft.com/',
        'https://management.azure.com': 'https://management.azure.com'
    }
};


Logging.log = function (msg) {
    console.log(msg);
};
Logging.level = 3;