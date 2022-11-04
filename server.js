const http = require('http');

const requestListener = (request, response) => {
  response.setHeader('Content-Type', 'text/html');

  const { method, url } = request;

  if (url === '/') {
    if (method === 'GET') {
      response.statusCode = 200;
      response.end('<h1>Homepage</h1>');
    } else {
      response.statusCode = 400;
      response.end(`<h1>Can not access ${method} request on this page</h1>`);
    }
  } else if (url === '/about') {
    if (method === 'GET') {
      response.statusCode = 200;
      response.end('<h1>About</h1>');
    } else if (method === 'POST') {
      let body = [];

      request.on('data', chunk => {
        body.push(chunk);
      });

      request.on('end', () => {
        body = Buffer.concat(body).toString();
        const { name } = JSON.parse(body);

        response.statusCode = 200;
        response.end(`<h1>Hi, ${name}!</h1>`);
      });
    } else {
      response.statusCode = 400;
      response.end(`<h1>Can not access ${method} request on this page</h1>`);
    }
  } else {
    response.statusCode = 404;
    response.end('<h1>Page not found!</h1>');
  }
};

const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
  console.log(`Server running on http://${host}:${port}`);
});
