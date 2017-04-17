var c, ctx;

var gridSize = 4;
var pieceSize;
var offset = 2;

var COLORS = [ "#212121", "#8D6E63", "#6D4C41", "#EF6C00", "#E65100", "#B71C1C", "#880E4F", "#6A1B9A", "#4A148C", "#3F51B5", "#1A237E" ];
var BOARD_COLOR = "#9E9E9E";
var FONT_SIZE = 30;


var over, score, grid;

function setCanvasSize() {
    if (window.innerWidth > window.innerHeight) {
        c.width = c.height = window.innerHeight * 0.7;
    } else {
        c.width = c.height = window.innerWidth * 0.7;
    }

    pieceSize = c.width / gridSize;
}

function newGame() {
    over = false;
    score = 0;
    grid = [];
    for (var i = 0; i < Math.pow(gridSize, 2); i++) {
        grid.push(0);
    }
    newTile();
    newTile();
    console.log("hello");
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

    c = document.getElementById("canvas");
    ctx = c.getContext('2d');

    newGame();

    setCanvasSize();

    window.addEventListener("resize", setCanvasSize, false);

    requestAnimationFrame(draw);
}


function draw() {
	ctx.fillStyle = BOARD_COLOR;
	ctx.fillRect(0, 0, c.width, c.height);

    for (var i = 0; i < grid.length; i++) {
        drawPiece(i, grid[i]);
    }
    requestAnimationFrame(draw);
}


function drawPiece(pos, val) {
    var x = pos % gridSize;
    var y = (pos - pos % gridSize) / gridSize;

    var piece_x = x * pieceSize;
    var piece_y = y * pieceSize;

    var text_x = piece_x + (pieceSize / 2);
    var text_y = piece_y + (pieceSize / 2); 

    if (val > 0) {
        ctx.shadowBlur = 4;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'; 
        ctx.fillStyle = COLORS[val % COLORS.length];
        ctx.fillRect(piece_x + offset, piece_y + offset, pieceSize - (2 * offset), pieceSize - (2 * offset));
        ctx.shadowBlur = 0;

        ctx.font = FONT_SIZE + "px Sans";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "white";
        ctx.fillText(Math.pow(2, val), text_x, text_y);


    }

}

function moveUp() {
	var direction = -gridSize;
	var edge = [];
    for (var i = 0; i < gridSize; i++) {
        edge.push(i);
    }
    moveTiles(direction, edge);
}
function moveLeft() {
	var direction = -1;
	var edge = [];
    for (var i = 0; i < gridSize; i++) {
        edge.push(i * gridSize);
    }
    moveTiles(direction, edge);
}
function moveDown() {
	var direction = gridSize;
	var edge = [];
    for (var i = 0; i < gridSize; i++) {
        edge.push(i + gridSize * (gridSize - 1));
    }
    moveTiles(direction, edge);
}
function moveRight() {
	var direction = 1;
	var edge = [];
    for (var i = 0; i < gridSize; i++) {
        edge.push((i + 1) * gridSize - 1);
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
    if (direction < 0) {
        for (var i = 0; i < grid.length; i++) {
            moveTile(i, direction, edge);
        }
        for (var i = 0; i < grid.length; i++) {
            combine(i, direction, edge);
        }
        for (var i = 0; i < grid.length; i++) {
            moveTile(i, direction, edge);
        }
    } else {
        for (var i = grid.length - 1; i >= 0; i--) {
            moveTile(i, direction, edge);
        }
        for (var i = grid.length - 1; i >= 0; i--) {
            combine(i, direction, edge);
        }
        for (var i = grid.length - 1; i >= 0; i--) {
            moveTile(i, direction, edge);
        }
    }
	if (changed) {
		newTile();
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
