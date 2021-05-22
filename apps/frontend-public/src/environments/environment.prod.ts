const apiPath = '/api';

export const environment = {
  production: (window as any).__env?.production || true,
  bob: (window as any).__env?.bob || 'undefined',
  // hmr: true,
  // envName: 'local',
  // appVersion,
  // buildVersion: 'dev local',
  // docApiUrl : '/swagger-ui.html',
  // logsApiUrl: '/api/logs',
  // enabledCache: false, // enable cache management (application + localStorage)
  serviceWorkerScript: (window as any).__env?.serviceWorkerScript || 'undefined',

  wsEndpoint: (window as any).__env?.wsEndpoint || 'undefined',
  backendApi: {
    baseUrlAuth:          (window as any).__env?.backendApi?.baseUrlAuth || 'undefined',
    baseUrlUser:          (window as any).__env?.backendApi?.baseUrlUser || 'undefined',
    baseUrlCalendarEvent: (window as any).__env?.backendApi?.baseUrlCalendarEvent || 'undefined',
    baseUrlTodos:      (window as any).__env?.backendApi?.baseUrlTodos || 'undefined',
  },
};