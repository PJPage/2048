var GRID_SIZE = 4;
var PIECE_SIZE = 100;
var COLORS = [ "#212121", "#8D6E63", "#6D4C41", "#EF6C00", "#E65100", "#B71C1C", "#880E4F", "#6A1B9A", "#4A148C", "#3F51B5", "#1A237E" ];
var BOARD_COLOR = "#9E9E9E";
var FONT_SIZE = 30;

var canvas;
var ctx;

var over = false;
var score = 0;
var grid = [];
for (var i = 0; i < Math.pow(GRID_SIZE, 2); i++) {
    grid.push(0);
}

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
	direction = -GRID_SIZE;
	edge = [];
    for (var i = 0; i < GRID_SIZE; i++) {
        edge.push(i);
    }
    moveTiles(direction, edge);
}
function moveLeft() {
	direction = -1;
	edge = [];
    for (var i = 0; i < GRID_SIZE; i++) {
        edge.push(i * GRID_SIZE);
    }
    moveTiles(direction, edge);
}
function moveDown() {
	direction = GRID_SIZE;
	edge = [];
    for (var i = 0; i < GRID_SIZE; i++) {
        edge.push(i + GRID_SIZE * (GRID_SIZE - 1));
    }
    moveTiles(direction, edge);
}
function moveRight() {
	direction = 1;
	edge = [];
    for (var i = 0; i < GRID_SIZE; i++) {
        edge.push((i + 1) * GRID_SIZE - 1);
    }
    moveTiles(direction, edge);
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
	for (i = 0; i < grid.length; i++) {
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
function moveTiles(direction, edge) {
	for (var i = 0; i < grid.length; i++) {
		moveTile(i, direction, edge);
	}
	for (var i = 0; i < grid.length; i++) {
		combine(i, direction, edge);
	}
	for (var i = 0; i < grid.length; i++) {
		moveTile(i, direction, edge);
	}
	if (changed) {
		newTile();
		draw();
		changed = false;
	}

}
function isEdge(piece, edge) {
    for (var i = 0; i < edge.length; i++) {
        if (edge[i] == piece) {
            return true;
        }
    }
    return false;
}
function combine(piece, direction, edge) {
	if (grid[piece] != 0 && !isEdge(piece, edge)) {
		if (grid[piece + direction] == grid[piece]) {
			grid[piece + direction] = grid[piece] + 1;
			grid[piece] = 0;
			score += Math.pow(2, grid[piece + direction]);
			changed = true;
		}
	}
}
function moveTile(piece, direction, edge) {
	if (grid[piece] != 0 && !isEdge(piece, edge)) {
		if (grid[piece + direction] == 0) {
			grid[piece + direction] = grid[piece];
			grid[piece] = 0;
			moveTile(piece + direction, direction, edge);
			changed = true;
		}
	}
}
