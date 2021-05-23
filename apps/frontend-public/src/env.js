(function(window) {
  window.__env = window.__env || {};

  const hostname = 'localhost:3333';
  // const hostname = 'dev.family-calendar.nicolasmura.com';
  const secure   = false;
  const protocol = secure ? 'https' : 'http';
  const ws       = secure ? 'wss' : 'ws';
  const apiPath  = '/api';

  // Environment variables
  window.__env.production = false;
  window.__env.bob = 'bobby';
  window.__env.serviceWorkerScript = window.__env.production ? 'sw-master.js' : 'sw-sync.js';
  window.__env.wsEndpoint = ws + '://' + hostname;
  window.__env.backendApi = {};
  window.__env.backendApi.baseUrlAuth          = protocol + '://' + hostname + apiPath + '/auth';
  window.__env.backendApi.baseUrlUser          = protocol + '://' + hostname + apiPath + '/users';
  window.__env.backendApi.baseUrlCalendarEvent = protocol + '://' + hostname + apiPath + '/events';
  window.__env.backendApi.baseUrlTodos         = protocol + '://' + hostname + apiPath + '/todos';
})(this);
