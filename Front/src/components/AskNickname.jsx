import React, { useState } from "react";
import WaitPlayer from "./WaitPlayers";

const AskNickname = ({ io }) => {
	const [nickname, setNickname] = useState("");
	const [push, setPush] = useState(false);

	const handleNickname = event => {
		setNickname(event.target.value);
	};

	const sendNickname = () => {
		io.emit("event::initialize", { nickname });
		//setPush(true);
		setNickname("");
	};

	return push != "" ? (
		<WaitPlayer />
	) : (
		<div className="field">
			<div className="control">
				<input className="input" onChange={handleNickname} value={nickname} />
			</div>
			<div className="control">
				<a className="button is-info" onClick={sendNickname}>
					Send
				</a>
			</div>
		</div>
	);
};

export default AskNickname;
