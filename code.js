var clock = null;
var speed = 4;

function initialize()
{
	for(var i = 0;i < 4;i++)
		addRow();

	document.getElementById("btn").addEventListener("click", mouseClick);
}

function mouseClick(e)
{
	if(e.type == "click")
	{
		var t = e.target;
		if(t.innerText == "Start")
		{
			t.innerText = "Stop";
			document.getElementById("grid").addEventListener("click", check);
			clock = setInterval(move, 30);
		}
		else if(t.innerText == "Stop")
		{
			t.innerText = "Start";
			document.getElementById("grid").removeEventListener("click", check);
			clearInterval(clock);
		}
	}
}

function createCell()
{
	var cell = ["white", "white", "white", "white"];
	var i = Math.floor(Math.random() * 4);
	cell[i] = "black";
	return cell;
}

function createDiv(className)
{
	var div = document.createElement("div");
	div.className = className;
	return div;
}

function addRow()
{
	var col = document.getElementById("col");
	var row = createDiv("row");
	var cell = createCell();

	for(var i = 0;i < cell.length;i++)
		row.appendChild(createDiv(cell[i]));

	if(col.firstChild == null)
		col.appendChild(row);
	else
		col.insertBefore(row, col.firstChild);
}

function deleteRow()
{
	var col = document.getElementById("col");
	if(col.childNodes.length == 6)
		col.removeChild(col.lastChild);
}

function move()
{
	var col = document.getElementById("col");
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
	else if(top == (speed - 100))
	{
		var rows = col.childNodes;
		if((rows.length == 5) && (rows[rows.length - 1].pass !== 1))
			gameOver();
	}
}

function speedUp()
{
	speed += 2;
	if(speed >= 6)
	{
		var sm = document.getElementById("sm");
		sm.innerText = "You're superman!!!!!";
	}
}

function score()
{
	var score = document.getElementById("score");
	var newScore = parseInt(score.innerText) + 1;
	score.innerText = newScore;
	if(newScore % 10 == 0)
		speedUp();

}

function gameOver()
{
	clearInterval(clock);
	document.getElementById("grid").removeEventListener("click", check);
	document.getElementById("over").innerHTML = "Game Over! <br />";
	document.getElementById("f").innerHTML =  "Your Final "
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

initialize();