// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const apiPath = '/api';

export const environment = {
  production: (window as any).__env?.production || false,
  bob: (window as any).__env?.bob || 'marley',
  // hmr: true,
  // envName: 'local',
  // appVersion,
  // buildVersion: 'dev local',
  // docApiUrl : '/swagger-ui.html',
  // logsApiUrl: '/api/logs',
  // enabledCache: false, // enable cache management (application + localStorage)
  serviceWorkerScript: (window as any).__env?.serviceWorkerScript || 'sw-sync.js',

  wsEndpoint: (window as any).__env?.wsEndpoint || 'ws://localhost:3333',
  backendApi: {
    baseUrlAuth:          (window as any).__env?.backendApi?.baseUrlAuth          || 'http://localhost:3333/' + apiPath + 'auth',
    baseUrlUser:          (window as any).__env?.backendApi?.baseUrlUser          || 'http://localhost:3333' + apiPath + '/users',
    baseUrlCalendarEvent: (window as any).__env?.backendApi?.baseUrlCalendarEvent || 'http://localhost:3333' + apiPath + '/events',
    baseUrlTodos:      (window as any).__env?.backendApi?.baseUrlTodos      || 'http://localhost:3333' + apiPath + '/todos',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
