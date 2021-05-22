(function(window) {
  window.__env = window.__env || {};

  const apiPath      = '/api';

  // Environment variables
  window.__env.production = false;
  window.__env.bob = 'bobby';
  window.__env.serviceWorkerScript = 'sw-sync.js';
  window.__env.wsEndpoint = 'ws://localhost:3333';
  window.__env.backendApi = {};
  window.__env.backendApi.baseUrlAuth          = 'http://localhost:3333' + apiPath + '/auth';
  window.__env.backendApi.baseUrlUser          = 'http://localhost:3333' + apiPath + '/users';
  window.__env.backendApi.baseUrlCalendarEvent = 'http://localhost:3333' + apiPath + '/events';
  window.__env.backendApi.baseUrlTodos         = 'http://localhost:3333' + apiPath + '/todos';
})(this);
