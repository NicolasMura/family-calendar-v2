const apiPath = '/api';

export const environment = {
  production: (window as any).__env?.production || true,
  bob: (window as any).__env?.bob || 'marley',
  // hmr: true,
  // envName: 'local',
  // appVersion,
  // buildVersion: 'dev local',
  // docApiUrl : '/swagger-ui.html',
  // logsApiUrl: '/api/logs',
  // enabledCache: false, // enable cache management (application + localStorage)
  serviceWorkerScript: (window as any).__env?.serviceWorkerScript || 'sw-sync.js',

  wsEndpoint: (window as any).__env?.wsEndpoint || 'wss://dev.family-calendar.nicolasmura.com',
  backendApi: {
    baseUrlAuth:          (window as any).__env?.backendApi?.baseUrlAuth          || 'https://dev.family-calendar.nicolasmura.com/' + apiPath + 'auth',
    baseUrlUser:          (window as any).__env?.backendApi?.baseUrlUser          || 'https://dev.family-calendar.nicolasmura.com' + apiPath + '/users',
    baseUrlCalendarEvent: (window as any).__env?.backendApi?.baseUrlCalendarEvent || 'https://dev.family-calendar.nicolasmura.com' + apiPath + '/events',
    baseUrlTodos:      (window as any).__env?.backendApi?.baseUrlTodos      || 'https://dev.family-calendar.nicolasmura.com' + apiPath + '/todos',
  },
};