class App extends React.Component
{
	constructor() {
		super();
		this.state = {
      score: 0,
			speed: 0,
			gameOver: false
		};
	}
	render()
	{
		return <div>
			<h1 className = "center">Piano Tiles</h1>
			<Score speed = {this.state.speed}
				score = {this.state.score}
				gameOver = {this.state.gameOver}/>
			<Board />
		</div>;
	}
}

class Score extends React.Component {
	render() {
		const speed = this.props.speed;
		const score = this.props.score;
		const gameOver = this.props.gameOver;
		return (
			<div>
				{speed > 10 && <p>You're superman</p>}
				{gameOver && <p>Game Over!</p>}
				<p className = "center">Score: {score}</p>
			</div>
		);
	}
}

class Board extends React.Component {
	render() {
    //r rows = [];
    return (
			<div className = "grid">
        <Cell />
        <Cell />
			</div>
		);
	}
}

class Cell extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {
    const color = event.target.className;
    if(color == "black") {
      event.target.className = "white";
    }
  }
	render() {
		const cell = createCell();
		return (
			<div>
				<div className = {cell[0]} onClick = {this.handleClick}/>
				<div className = {cell[1]} onClick = {this.handleClick}/>
				<div className = {cell[2]} onClick = {this.handleClick}/>
				<div className = {cell[3]} onClick = {this.handleClick}/>
			</div>
		);
	}
}

function createCell()
{
	var cell = ["white", "white", "white", "white"];
	var i = Math.floor(Math.random() * 4);
	cell[i] = "black";
	return cell;
}

ReactDOM.render(
	<App />,
	document.getElementById("root")
);