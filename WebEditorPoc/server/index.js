const http = require("http");
const url = require("url");
const handlers = require('./requestHandlers');
const constants = require('./constants');

console.log(`open the browser at localhost:${constants.port}`);

const requestHandler = (request, response) => {
  const path = url.parse(request.url).pathname;
  console.log("request.url : ", request.url);
  response.setHeader("Access-Control-Allow-Origin", "*"); // --- should be done for dev only

  switch (path) {
    case "/getArP":
    handlers.handle_getArP(response);
      break;

    default:
      console.log(`unexpected path : ${path}`);
  }
};

http.createServer(requestHandler).listen(constants.port);

