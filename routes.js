// const fs = require("fs");

// const routeHandler = (req, res) => {
//   const url = req.url;
//   if (url === "/") {
//     res.write("<html>");
//     res.write("<head><title>login</title><head>");
//     res.write(
//       '<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form></body>'
//     );
//     res.write("<html>");
//     return res.end();
//   }
//   if (url === "/users") {
//     res.write("<html>");
//     res.write("<ul><li>Student1</li><li>Student2</li></ul>");
//     res.write("<html>");
//     return res.end();
//   }
//   if (url === "/create-user") {
//     const body = [];
//     req.on("data", (chunk) => {
//       console.log(chunk);
//       body.push(chunk);
//     });
//     req.on("end", () => {
//       const parsedBody = Buffer.concat(body).toString();
//       console.log(parsedBody.split("=")[1]); // username=whatever-the-user-entered
//     });
//     res.statusCode = 302;
//     res.setHeader("Location", "/");
//     res.end();
//   }
// };

// module.exports = { routeHandler };
