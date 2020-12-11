const http = require("http");
const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);

const server = http.createServer(function (req, res) {
  Promise.all([readFile("data.json"), readFile("template.html")])
    .then(function (data) {
      const [jsonData, template] = data.map((buffer) => buffer.toString());
      const html = template.replace(
        "<li>%</li>",
        JSON.parse(jsonData)
          .map((title) => "<li>" + title + "</li>")
          .join("\n")
      );
      res.end(html);
    })
    .catch(function (err) {
      res.end(err.message);
    });
});

server.listen(5002);
