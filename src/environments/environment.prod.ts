/* export const environment = {
  production: true
}; */

export const environment = {
  production: true,
  adalConfig: {
    tenant: 'lntinfotech.onmicrosoft.com',
    clientId: '6033378e-6f9d-451d-8a5e-26f6823a6c37',
    postLogoutRedirectUri: 'http://localhost:4200/logout',
    endpoints: {
      'https://adaltestapi.azurewebsites.net': 'https://adaltestapi.azurewebsites.net',
    },
  },
  apiUrl: 'https://adaltestapi.azurewebsites.net/api/'
};

