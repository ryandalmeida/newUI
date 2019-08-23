// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

/* export const environment = {
  production: false
}; */

export const environment = {
  production: false,
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


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
