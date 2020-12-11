const http = require("http");
const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);

const server = http.createServer(function (req, res) {
  readFile("data.json")
    .then(function (jsonData) {
      readFile("template.html")
        .then(function (template) {
          const html = template.toString().replace(
            "<li>%</li>",
            JSON.parse(jsonData.toString())
              .map((title) => "<li>" + title + "</li>")
              .join("\n")
          );
          res.end(html);
        })
        .catch(function (err) {
          res.end(err.message);
        });
    })
    .catch(function (err) {
      res.end(err.message);
    });
});

server.listen(5002);
