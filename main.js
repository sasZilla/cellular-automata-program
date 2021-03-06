function Board(type) {
    this.xsize = 10;
    this.ysize = 10;

    this.dead = 0;
    this.alive = 1;

    var emptyBoard = new Array(this.xsize);
    for (var x = 0; x < this.xsize; ++x) {
        emptyBoard[x] = new Array(this.ysize);
        for (var y = 0; y < this.ysize; ++y) {
            emptyBoard[x][y] = this.dead;
        }
    }

    if (type == "blinker") {
        emptyBoard[1][0] = 1;
        emptyBoard[1][1] = 1;
        emptyBoard[1][2] = 1;
    } else if (type == "glider") {
        emptyBoard[2][0] = 1;
        emptyBoard[2][1] = 1;
        emptyBoard[2][2] = 1;
        emptyBoard[1][2] = 1;
        emptyBoard[0][1] = 1;
    } else if (type == "flower") {
        emptyBoard[4][6] = 1;
        emptyBoard[5][6] = 1;
        emptyBoard[6][6] = 1;
        emptyBoard[7][6] = 1;
        emptyBoard[8][6] = 1;
        emptyBoard[9][6] = 1;
        emptyBoard[4][7] = 1;
        emptyBoard[6][7] = 1;
        emptyBoard[8][7] = 1;
        emptyBoard[4][8] = 1;
        emptyBoard[5][8] = 1;
        emptyBoard[6][8] = 1;
        emptyBoard[7][8] = 1;
        emptyBoard[8][8] = 1;
        emptyBoard[9][8] = 1;
    }

    this.structBoard = emptyBoard;
}

Board.prototype = {
    kill: function(x, y) {
        if (this.structBoard[x] && this.structBoard[x][y] === this.alive) {
            this.structBoard[x][y] = this.dead;
        }
    },

    makeLive: function(x, y) {
        if (this.structBoard[x] && this.structBoard[x][y] === this.dead) {
            this.structBoard[x][y] = this.alive;
        }
    },

    nextStep: function() {
        var nextBoard = new Board();

        for (var x = 0; x < this.xsize; ++x) {
            for (var y = 0; y < this.ysize; ++y) {
                var n = this.findAliveNeighbors(x, y);

                if (n === 3) {
                    nextBoard.makeLive(x, y);
                }
                if ((n < 2) || (n > 3)) {
                    nextBoard.kill(x, y);
                }
            }
        }

        this.structBoard = nextBoard.structBoard;

        return this;
    },

    findAliveNeighbors: function(x, y) {
        var n = 0;
        for (var dx = -1; dx <= 1; ++dx) {
            for (var dy = -1; dy <= 1; ++dy) {
                if (dx === 0 && dy === 0) {
                    continue;
                }

                var ax = x + dx;
                var ay = y + dy;

                if ((typeof this.structBoard[ax] !== "undefined") && (this.structBoard[ax][ay] === this.alive)) {
                    ++n;
                }
            }
        }
        return n;
    },

    draw: function() {
        var self = this;
        document.getElementById("board").innerHTML = self.structBoard.reduce(function(prevArr, currArr) {
            return prevArr + currArr.reduce(function(prev, curr) {
                return prev + '<div class="cell">' + (curr === self.alive ? "o":"&nbsp;") + '</div>';
            }, '') + "<br/>";
        }, '');

        return this;
    }
}

function Main() {
    // *** Change this variable to choose a different baord setup from below
    // blinker, glider, flower
    var BoardSetup = "glider";
    var newBoard = new Board(BoardSetup).draw();

    var nextStep = document.getElementById('nextStep');
    if (nextStep) {
        nextStep.addEventListener('click', function(event) {
            event = event || window.event;
            event.preventDefault();

            newBoard.nextStep().draw();
        }, false);
    }
}