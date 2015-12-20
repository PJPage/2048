
var score = 0;

var t0  = new Image();  t0.src  = "0.png";
var t1  = new Image();  t1.src  = "2.png";
var t2  = new Image();  t2.src  = "4.png";
var t3  = new Image();  t3.src  = "8.png";
var t4  = new Image();  t4.src  = "16.png";
var t5  = new Image();  t5.src  = "32.png";
var t6  = new Image();  t6.src  = "64.png";
var t7  = new Image();  t7.src  = "128.png";
var t8  = new Image();  t8.src  = "256.png";
var t9  = new Image();  t9.src  = "512.png";
var t10 = new Image();  t10.src = "1024.png";
var t11 = new Image();  t11.src = "2048.png";

document.addEventListener('keydown', function(event) {
	if(event.keyCode == 37) {
		moveLeft();
	}
	else if(event.keyCode == 38) {
		moveUp();
	}
	else if(event.keyCode == 39) {
		moveRight();
	}
	else if(event.keyCode == 40) {
		moveDown();
	}
	document.getElementById("score").innerHTML = "Score: "+score;
});

function draw() {
	var canvas = document.getElementById("window");
	var ctx = canvas.getContext('2d');

	ctx.fillStyle = "rgb(150,150,150)";
	ctx.fillRect(0,0,400,400);


	var xpos = 5;
	var ypos = 5;
	for (i=0; i<4; i++) {
		for (x=0; x<4; x++) {
			ctx.drawImage(TILES[grid[4 * i + x]], xpos, ypos);
			xpos += 95;
		}
		xpos = 5;
		ypos += 95;
	}
}



var over = false;
var TILES = [t0, t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11];
var grid = [0, 0, 0, 0,
			0, 0, 0, 0,
			0, 0, 0, 0,
			0, 0, 0, 0 ];
function moveUp() {
	move = -4;
	edge = [0, 1, 2, 3];
	for (i = 0; i < 16; i++) {
		moveTile(i, move, edge);
	}
	for (i = 0; i < 16; i++) {
		combine(i, move, edge);
	}
	for (i = 0; i < 16; i++) {
		moveTile(i, move, edge);
	}
	if (changed == true) {
		newTile();
		draw();
		changed = false;
	}
}
function moveLeft() {
	move = -1;
	edge = [0, 4, 8, 12];
	for (i = 0; i < 16; i++) {
		moveTile(i, move, edge);
	}
	for (i = 0; i < 16; i++) {
		combine(i, move, edge);
	}
	for (i = 0; i < 16; i++) {
		moveTile(i, move, edge);
	}
	if (changed == true) {
		newTile();
		draw();
		changed = false;
	}
}
function moveDown() {
	move = 4;
	edge = [12, 13, 14, 15];
	for (i = 15; i >= 0; i--) {
		moveTile(i, move, edge);
	}
	for (i = 15; i >= 0; i--) {
		combine(i, move, edge);
	}
	for (i = 15; i >= 0; i--) {
		moveTile(i, move, edge);
	}
	if (changed == true) {
		newTile();
		draw();
		changed = false;
	}
}
function moveRight() {
	move = 1;
	edge = [3, 7, 11, 15];
	for (i = 15; i >= 0; i--) {
		moveTile(i, move, edge);
	}
	for (i = 15; i >= 0; i--) {
		combine(i, move, edge);
	}
	for (i = 15; i >= 0; i--) {
		moveTile(i, move, edge);
	}
	if (changed == true) {
		newTile();
		draw();
		changed = false;
	}
}

function newTile() {
	var whichTile = Math.random();
	if (whichTile > .9) {
		var n = 2;
	}
	else {
		var n = 1;
	}
	var empty = [];
	for (i = 0; i <= 15; i++) {
		if (grid[i] == 0) {
			empty.push(i);
		}
	}
	if (empty == []) {
		return 0;
	}
	var newPos = Math.floor(Math.random() * empty.length);
	grid[empty[newPos]] = n; 

}
function combine(i, move, edge) {
	if (grid[i] != 0 && i != edge[0] && i != edge[1] && i != edge[2] && i != edge[3]) {
		if (grid[i + move] == grid[i]) {
			grid[i + move] = grid[i] + 1
			grid[i] = 0
			score += Math.pow(2, grid[i + move]);
			changed = true;
			if (x + 1 >= 11) {
				console.log("You Win!");
			}
		}
	}
}
function moveTile(i, move, edge) {
	if (grid[i] != 0 && i != edge[0] && i != edge[1] && i != edge[2] && i != edge[3]) {
		if (grid[i + move] == 0) {
			grid[i + move] = grid[i];
			grid[i] = 0;
			moveTile(i + move, move, edge);
			changed = true;
		}
	}
}



newTile();
newTile();
