import React, { useState } from "react";
import { toaster } from "evergreen-ui";

const MagicNumber = ({ io }) => {
	const [numberProposal, setNumberProposal] = useState("");
	const [previousProposal, setPreviousProposal] = useState("");
	const [hint, setHint] = useState("");
	const [round, setRound] = useState(1);

	const handleNumberProposal = event => {
		setNumberProposal(event.target.value);
		setPreviousProposal(event.target.value);
	};

	const sendNumberProposal = () => {
		io.emit("event::checkNumber", { number: numberProposal });
		setNumberProposal("");
	};

	io.on("event::isMore", () => {
		setHint(`More than ${previousProposal}`);
	});

	io.on("event::isLess", () => {
		setHint(`Less than ${previousProposal}`);
	});

	io.on("event::nextRound", () => {
		setRound(round + 1);
	});

	return (
		<div className="field">
			<div>Round {round}</div>
			<div>Nickanem1 score1 : score2 Nickanem2</div>
			<div>{hint}</div>
			<div className="control">
				<input className="input" onChange={handleNumberProposal} value={numberProposal} />
			</div>
			<div className="control">
				<a className="button is-info" onClick={sendNumberProposal}>
					Send Your Number
				</a>
			</div>
		</div>
	);
};

export default MagicNumber;
