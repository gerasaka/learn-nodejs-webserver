const http = require('http');

const requestListener = (request, response) => {
  response.setHeader('Content-Type', 'application/json');

  const { method, url } = request;

  if (url === '/') {
    if (method === 'GET') {
      response.statusCode = 200;
      response.end(
        JSON.stringify({
          message: 'success',
          content: 'Homepage',
        })
      );
    } else {
      response.statusCode = 400;
      response.end(
        JSON.stringify({
          message: `Can not access ${method} request on this page</h1>`,
        })
      );
    }
  } else if (url === '/about') {
    if (method === 'GET') {
      response.statusCode = 200;
      response.end(
        JSON.stringify({
          message: 'success',
          content: 'About',
        })
      );
    } else if (method === 'POST') {
      let body = [];

      request.on('data', chunk => {
        body.push(chunk);
      });

      request.on('end', () => {
        body = Buffer.concat(body).toString();
        const { name } = JSON.parse(body);

        response.statusCode = 200;
        response.end(
          JSON.stringify({
            message: 'success',
            content: `Hi, ${name}!`,
          })
        );
      });
    } else {
      response.statusCode = 400;
      response.end(
        JSON.stringify({
          message: `Can not access ${method} request on this page</h1>`,
        })
      );
    }
  } else {
    response.statusCode = 404;
    response.end(
      JSON.stringify({
        message: 'Page not found!',
      })
    );
  }
};

const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
  console.log(`Server running on http://${host}:${port}`);
});
