const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set EJS as view engine
app.set("view engine", "ejs");

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Socket.IO connection
io.on("connection", function (socket) {
  socket.on("send-location", function (data) {
    io.emit("receive-location", { id: socket.id, ...data });
  });
  socket.on("disconnect", function () {
    io.emit("user-disconnected", socket.io);
  });
});

// Route for rendering index.ejs
app.get("/", function (req, res) {
  res.render("index");
});

const port = 8080;

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
