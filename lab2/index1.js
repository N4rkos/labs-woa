const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  fs.readFile("data.json", (err, jsonData) => {
    if (err) res.end("Unable to fetch data");
    fs.readFile("template.html", (err, htmlData) => {
      if (err) return res.end("Oups");
      const html = htmlData.toString().replace(
        "<li>%</li>",
        JSON.parse(jsonData.toString())
          .map((title) => "<li>" + title + "</li>")
          .join("\n")
      );
      return res.end(html);
    });
  });
});

server.listen(5002);
