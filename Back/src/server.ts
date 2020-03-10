import express from "express";
import socketIO from "socket.io";
import { createServer } from "http";
import { config } from "dotenv";

config();

const PORT = process.env.PORT;

const app = express();
const server = createServer(app);
const io = socketIO(server);
let players = [];
let magicNumber: number;
let winner: string;

app.get("/", (_, res) => {
	res.send("hello fellows");
});

io.on("connection", socket => {
	console.log("new connection");

	socket.on("event::initialize", payload => {
		if (players.length >= 2) {
			socket.emit("event::gameFull");
			return;
		}

		players.push(payload.nickname);

		console.log(`Player ${payload.nickname} joined`);

		if (players.length === 2) {
			magicNumber = Math.floor(Math.random() * 1337);
			io.emit("event::gameStart");
		} else {
			socket.emit("event::waitingPlayer");
		}
	});

	socket.on("event::checkNumber", payload => {
		const number = payload.number;

		if (number === magicNumber) {
			winner = payload.nickname;
			socket.emit("event::gameStop");
			return;
		}

		if (number > magicNumber) {
			socket.emit("event::isMore");
			return;
		}

		if (number < magicNumber) {
			socket.emit("event::isLess");
			return;
		}
	});
});

server.listen(PORT, () => {
	console.log("Server ready at ...");
});
