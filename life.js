class Life {

    CONFIG = { board: { rows: 24, columns: 32 } }
    constructor() {
        this._current = this.cleanBoard;
    }

    get cleanBoard() {
        return Array(this.CONFIG.board.rows + 2).fill(null).map(e => Array(this.CONFIG.board.columns + 2).fill(0));
    }

    get board() {
        return this._current;
    }

    place(x, y) {
        this._current[x][y] = 1;
    }
    liveNeighbors(x, y) {
        return [
            this._current[x - 1][y - 1], this._current[x - 1][y], this._current[x - 1][y + 1],
            this._current[x][y - 1], , this._current[x][y + 1],
            this._current[x + 1][y - 1], this._current[x + 1][y], this._current[x + 1][y + 1],
        ].reduce((a, c) => a + c);
    }

    nextState(x, y) {
        const isAliveNow = this.board[x][y] === 1;

        const liveNeighborCount = this.liveNeighbors(x, y);

        return Life.shouldLive(isAliveNow, liveNeighborCount);
    }

    static shouldLive(isAliveNow, liveNeighborCount) {
        if (liveNeighborCount === 3) {
            return 1
        }

        if (isAliveNow && liveNeighborCount === 2) {
            return 1
        }

        return 0;
    }

    nextBoard() {
        const board = this.cleanBoard
        for (var x = 1; x <= this.CONFIG.board.rows; x++) {
            for (var y = 1; y <= this.CONFIG.board.columns; y++) {
                board[x][y] = this.nextState(x, y);
            }
        }
        return board;
    }
}

module.exports = { Life }
