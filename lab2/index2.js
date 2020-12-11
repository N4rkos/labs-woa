const http = require("http");
const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);

const server = http.createServer((req, res) => {
  readFile("data.json")
    .then((jsonData) => {
      readFile("template.html")
        .then((template) => {
          const html = template.toString().replace(
            "<li>%</li>",
            JSON.parse(jsonData.toString())
              .map((title) => `<li>${title}</li>`)
              .join("\n")
          );
          res.end(html);
        })
        .catch(({ message }) => res.end(message));
    })
    .catch(({ message }) => res.end(message));
});

server.listen(5002);
