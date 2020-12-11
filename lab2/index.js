const http = require("http");
const fs = require("fs");

const server = http.createServer(function (req, res) {
  const titles = [
    "Do you remember Apple Maps ?",
    "May the force be with you",
    "SLEEP IS FOR THE WEAK",
  ];
  fs.readFile("template.html", function (err, data) {
    if (err) return res.end("Oups");
    const html = data
      .toString()
      .replace(
        "<li>%</li>",
        titles.map((title) => "<li>" + title + "</li>").join("\n")
      );
    return res.end(html);
  });
});

server.listen(5002);
