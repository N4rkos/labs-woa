const http = require("http");
const fs = require("fs");
const util = require("util");

//const readFile = util.promisify(fs.readFile);
// or
const readFile = path => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        return reject(err)
      }
      return resolve(data)
    })
  })
}

const server = http.createServer((req, res) => {
  Promise.all([readFile("data.json"), readFile("template.html")])
    .then((data) => {
      const [jsonData, template] = data.map((buffer) => buffer.toString());
      const html = template.replace(
        "<li>%</li>",
        JSON.parse(jsonData)
          .map((title) => `<li>${title}</li>`)
          .join("\n")
      );
      res.end(html);
    })
    .catch(({ message }) => res.end(message));
});

server.listen(5002);
