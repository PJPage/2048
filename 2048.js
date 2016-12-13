var GRID_SIZE = 4;
var PIECE_SIZE = 100;
var COLORS = [ "#212121", "#8D6E63", "#6D4C41", "#EF6C00", "#E65100", "#B71C1C", "#880E4F", "#6A1B9A", "#4A148C", "#3F51B5", "#1A237E" ];
var BOARD_COLOR = "#9E9E9E";
var FONT_SIZE = 30;

var canvas;
var ctx;

var over = false;
var score = 0;
var grid = [0, 0, 0, 0,
			0, 0, 0, 0,
			0, 0, 0, 0,
			0, 0, 0, 0 ];

window.onload = function() {
    document.addEventListener('keydown', function(event) {
        switch (event.keyCode) {
            case 37:
                moveLeft();
                break;
            case 38:
                moveUp();
                break;
            case 39:
                moveRight();
                break;
            case 40:
                moveDown();
                break;
        }
        document.getElementById("score").innerHTML = "Score: "+score;
    });

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d');

    canvas.width = canvas.height = GRID_SIZE * PIECE_SIZE;

    newTile();
    newTile();
    draw();
}


function draw() {
	ctx.fillStyle = BOARD_COLOR;
	ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < grid.length; i++) {
        drawPiece(i, grid[i]);
    }
}


function drawPiece(pos, val) {
    var x = pos % GRID_SIZE;
    var y = (pos - pos % GRID_SIZE) / GRID_SIZE;

    var piece_x = x * PIECE_SIZE;
    var piece_y = y * PIECE_SIZE;

    var text_x = piece_x + (PIECE_SIZE / 2);
    var text_y = piece_y + (PIECE_SIZE / 2); 

    if (val > 0) {
        ctx.fillStyle = COLORS[val % COLORS.length];
        ctx.fillRect(piece_x, piece_y, PIECE_SIZE, PIECE_SIZE);

        ctx.font = FONT_SIZE + "px Sans";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "white";
        ctx.fillText(Math.pow(2, val), text_x, text_y);


    }

}

function moveUp() {
	move = -4;
	edge = [0, 1, 2, 3];
	for (var i = 0; i < 16; i++) {
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
	for (var i = 0; i < 16; i++) {
		moveTile(i, move, edge);
	}
	for (var i = 0; i < 16; i++) {
		combine(i, move, edge);
	}
	for (var i = 0; i < 16; i++) {
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
	for (var i = 15; i >= 0; i--) {
		moveTile(i, move, edge);
	}
	for (var i = 15; i >= 0; i--) {
		combine(i, move, edge);
	}
	for (var i = 15; i >= 0; i--) {
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
			if (grid[i] + 1 >= 11) {
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
