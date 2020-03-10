import React, { useState, useEffect } from "react";
import socketIO from "socket.io-client";
import AskNickname from "./components/AskNickname";
import MagicNumber from "./components/MagicNumber";
import WaitPlayer from "./components/WaitPlayers";
// const io = socketIO("http://localhost:3000");
const io = socketIO("http://10.0.2.1:3000");

const App = () => {
	const [isGameStarted, setGameStarted] = useState(false);
	const [isWaiting, setIsWaiting] = useState(false);

	io.on("event::waitingPlayer", () => {
		console.log("Waiting Player");
		setIsWaiting(true);
	});

	io.on("event::gameStart", () => {
		console.log("game started");
		setGameStarted(true);
	});

	function renderScreen() {
		if (isGameStarted === true) {
			return <MagicNumber />;
		} else {
			if (isWaiting === true) {
				return <WaitPlayer />;
			} else {
				return <AskNickname io={io} />;
			}
		}
	}

	return (
		<section className="hero is-fullheight is-light">
			<div className="hero-head">
				<div className="container">
					<div className="tabs is-centered">
						<ul>
							<li>
								<a>PWA Games</a>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<div className="hero-body">
				<div className="container">
					<header className="bd-index-header">{renderScreen()}</header>
				</div>
			</div>

			<div className="hero-foot">
				<div className="container">
					<div className="tabs is-centered">
						<ul>
							<li>
								<a>Let's Rock!</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
};

export default App;
