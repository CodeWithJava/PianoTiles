var clock = null;
var speed = 4;

function initialize()
{
	score = 0;

	if($("col").children() != null)
		$("col").empty();

	for(var i = 0;i < 4;i++)
		addRow();

	$("#start").on("click", start);
	$("#restart").on("click", start);
}

function start(e)
{
	if(e.type == "click")
	{
		var t = e.target;

		if(t.innerText == "Start")
		{
			t.innerText = "Stop";
			$("grid").on("click", check);
			clock = setInterval(move, 30);
		}
		else if(t.innerText == "Stop")
		{
			t.innerText = "Start";
			$("grid").on("click", check);
			clearInterval(clock);
		}
		else if(t.innerText == "Restart")
		{
			$("#start").innerText = "Start";
			initialize();
		}
	}
}

function addRow()
{
	var col = document.getElementById("col")//$("col");
	var row = createDiv("row");
	var cells = createCells();

	for(var i = 0;i < cells.length;i++)
		row.append(createDiv(cells[i]));

	if(col.firstChild == null)
		col.append(row);
	else
		row.before(col.firstChild);
}

function deleteRow()
{
	var col = document.getElementById("col")//$("col");

	if(col.childNodes.length == 6)
		col.removeChild(col.lastChild);
}

function createDiv(className)
{
//	var div = document.createElement("div");
	var div = $("<div></div>");
	div.className = className;
	return div;
}

function createCells()
{
	var cells = ["white", "white", "white", "white"];
	var i = Math.floor(Math.random() * 4);
	cells[i] = "black";
	return cells;
}

function move()
{
	var col = document.getElementById("col")//$("col");
	var top = parseInt(window.getComputedStyle(col, null)["top"]);

	if(speed + top > 0)
		top = 0;
	else
		top += speed;

	col.style.top = top + "px";

	if(top == 0)
	{
		addRow();
		col.style.top = "-100px";
		deleteRow();
	}
	else if(top == speed - 200)
	{
		var rows = col.childNodes;
		if(rows.length == 5 && rows[rows.length - 1].pass !== 1)
			gameOver();
	}
}

function speedUp()
{
	speed += 2;
	if(speed >= 20)
		$("speed").innerText = "You're superman!";
}

function score()
{
	var score = $("score");
	var newScore = ++parseInt(score.innerText);
	score.innerText = newScore;

	if(newScore % 10 == 0)
			speedUp();
}

function gameOver()
{
	clearInterval(clock);
	$("grid").off("click", check);
	$("over").innerHTML = "Game Over! <br />Your Final "
}

function check(e)
{

	if(e.type == "click" && e.target.className.indexOf("black") != -1)
	{
		e.target.className = "white";
		e.target.parentNode.pass = 1;
		score();
	}
}

$(document).ready(initialize);