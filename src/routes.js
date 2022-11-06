const routes = [
  {
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return 'Homepage';
    },
  },
  {
    method: '*',
    path: '/',
    handler: function (request, h) {
      return `Can not access ${this.method} request on this page`;
    },
  },
  {
    method: 'GET',
    path: '/about',
    handler: (request, h) => {
      return 'About page';
    },
  },
  {
    method: '*',
    path: '/about',
    handler: function (request, h) {
      return `Can not access ${this.method} request on this page`;
    },
  },
  {
    method: '*',
    path: '/{any*}',
    handler: (request, h) => {
      return 'Page not found';
    },
  },
  {
    method: 'GET',
    path: '/hello/{name?}',
    handler: (request, h) => {
      const { name = 'stranger' } = request.params;
      const { lang } = request.query;

      if (lang === 'id') {
        return `Halo, ${name}!`;
      }

      return `Hello, ${name}!`;
    },
  },
];

module.exports = routes;
