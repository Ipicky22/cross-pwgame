import express from "express";
import socketIO from "socket.io";
import { createServer } from "http";
import { config } from "dotenv";

config();

const PORT = process.env.PORT;

const app = express();
const server = createServer(app);
const io = socketIO(server);
let players: string[] = [];
let magicNumber: number = Math.floor(Math.random() * 1337);
let winner: string;

console.log(magicNumber);

app.get("/", (_, res) => {
	res.send("hello fellows");
});

io.on("connection", socket => {
	let currPlayer: any;

	socket.on("event::initialize", payload => {
		if (players.length >= 2) {
			socket.emit("event::gameFull");
			return;
		}

		players.push(payload.nickname);
		currPlayer = payload.nickname;

		console.log(`Player ${payload.nickname} joined`);
		console.log(`Players: ${players}`);

		if (players.length === 2) {
			io.emit("event::gameStart");
		} else {
			socket.emit("event::waitingPlayer");
		}
	});

	socket.on("event::checkNumber", payload => {
		const number = payload.number;
		console.log(`${currPlayer} try ${number}`);

		if (number < magicNumber) {
			socket.emit("event::isMore");
		} else if (number > magicNumber) {
			socket.emit("event::isLess");
		} else if (number === magicNumber.toString()) {
			nextRound();
		}
	});

	socket.on("disconnect", () => {
		if (currPlayer !== undefined) {
			players = players.filter((player: any) => player !== currPlayer);
			console.log(`Player ${currPlayer} left game`);
			io.emit("event::waitingPlayer");
			magicNumber = Math.floor(Math.random() * 1337);
			console.log(magicNumber);
		}
	});
});

const nextRound = () => {
	magicNumber = Math.floor(Math.random() * 1337);
	io.emit("event::nextRound", { nickname });
};

server.listen(PORT, () => {
	console.log("Server is ready to use");
});
