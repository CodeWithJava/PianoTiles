import React from "react";
import ReactDOM from "react-dom";
class App extends React.Component {
	constructor() {
		super();
		this.state = {
			score: 0,
			gameOver: false,
		};
		this.handleClick = this.handleClick.bind(this); 
		this.updateScore = this.updateScore.bind(this);
		this.judge = this.judge.bind(this);
	}

	judge() {
		this.setState({gameOver: true});
	}

	handleClick(event) {
		const className = event.target.className;
		if(className === "black") {
			event.target.className = "white";
			this.updateScore();
		}
	}

	updateScore() {
		let {score} = this.state;
		score++;
		this.setState({score});
	}

	render() {
		return (
			<div>
				<h1 className = "center">Piano Tiles</h1>
				<Score score = {this.state.score} gameOver = {this.state.gameOver} />
				<Board judge = {this.judge} handleClick = {this.handleClick}/>
			</div>
		);
	}
}

class Score extends React.Component {
	render() {
		const score = this.props.score;
		const gameOver = this.props.gameOver;

		return (
			<div>
				{gameOver && <p className = "center color-red">GameOver!</p>}
				<p className = "center">Your{gameOver && <span className = "color-red"> Final </span>}Score: {score}</p>
			</div>
		);
	}
}

class Board extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rows: [],
			i: 0,
			handleClick: this.props.handleClick
		}
		this.updateRows = this.updateRows.bind(this);
	}

	componentDidMount() {
		this.timerID = setInterval(
			() => this.updateRows(),
			2000
		);
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	updateRows() {
		let i = this.state.i;
    		let x = this.state.rows;
		i++;
		this.setState({i: i});
		x.unshift(<Cell key = {this.state.i}/>);
		this.setState({rows: x});
		if(this.state.rows.length > 10000) {
			this.props.judge();
      			this.componentWillUnmount();
      			this.setState({handleClick: null});
		}

	}

	render() {
		return (
			<div className = "grid" onClick = {this.state.handleClick}>
				{this.state.rows}
			</div>
		);
	}
}

class Cell extends React.Component {
	constructor(props) {
		super(props);
		this.state = {cell: this.createCell()};
		this.createCell = this.createCell.bind(this);
	}

	createCell() {
		let cell = ["white","white","white","white"];
		let i = Math.floor(Math.random() * 4);
		cell[i] = "black";
		return cell;
	}

	render() {
		let {cell} = this.state;
		return (
			<div>
				<div className = {cell[0]}/>
				<div className = {cell[1]}/>
				<div className = {cell[2]}/>
				<div className = {cell[3]}/>
			</div>
		);
	}
}

ReactDOM.render(
	<App />,
	document.getElementById("root")
);