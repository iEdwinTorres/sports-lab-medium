// Deafault App component that all other compents are rendered through
class Team extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			shots: 0,
			score: 0,
		};

		this.shotSound = new Audio("./assets/audio/smb_fireball.wav");
		this.scoreSound = new Audio("./assets/audio/smb_1-up.wav");
	}

	shotHandler = () => {
		let score = this.state.score;
		this.shotSound.play();

		if (Math.random() > 0.5) {
			score += 1;

			setTimeout(() => {
				this.scoreSound.play();
			}, 300);
		}

		this.setState((state, props) => ({
			shots: state.shots + 1,
			score,
		}));
	};

	render() {
		let shotPercentageDiv;

		if (this.state.shots) {
			const shotPercentage = Math.round((this.state.score / this.state.shots) * 100);
			shotPercentageDiv = (
				<div>
					<strong>Shooting %: {shotPercentage}</strong>
				</div>
			);
		}

		return (
			<div className="Team">
				<h2>{this.props.name}</h2>

				<div className="identity">
					<img src={this.props.logo} alt={this.props.name} />
				</div>

				<div>
					<strong>Shots: {this.state.shots}</strong>
				</div>

				<div>
					<strong>Score: {this.state.score}</strong>
				</div>

				{shotPercentageDiv}

				<button onClick={this.shotHandler}>Shoot!</button>
			</div>
		);
	}
}

function Game(props) {
	return (
		<div className="Game">
			<h1>Welcome to {props.venue}</h1>
			<div className="stats">
				<Team name={props.visitingTeam.name} logo={props.visitingTeam.logoSrc} />
				<div>
					<h1>VS</h1>
				</div>
				<Team name={props.homeTeam.name} logo={props.homeTeam.logoSrc} />
			</div>
		</div>
	);
}

function App(props) {
	const pacers = {
		name: "Indiana Pacers",
		logoSrc: "./assets/images/pacers.png",
	};

	const raptors = {
		name: "Toronto Raptors",
		logoSrc: "./assets/images/raptors.png",
	};

	const lakers = {
		name: "L.A. Lakers",
		logoSrc: "./assets/images/lakers.png",
	};

	const bulls = {
		name: "Chicago Bulls",
		logoSrc: "./assets/images/bulls.png",
	};

	return (
		<div className="App">
			<Game venue="Bankers Life Fieldhouse" homeTeam={pacers} visitingTeam={raptors} />

			<Game venue="The Staples Center" homeTeam={lakers} visitingTeam={bulls} />
		</div>
	);
}

//Render the application
ReactDOM.render(<App />, document.getElementById("root"));
