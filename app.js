import { Life } from './life.js';
const game = new Life();

Vue.createApp({
    el: '#app',
    data() {
        return {
            board: game.board,
            framesPerSecond: 1,
            liveCellCount:0
        }
    },
    methods: {
        _refresh() {
            this.board = game.board;
            this.$forceUpdate();
        },
        clear() {
            this.stop();
            game.reset();
            this._refresh();
        },
        play() {
            if (this.__timer) { this.stop(); }
            this.__timer = setInterval(this.advance, 1000 / this.framesPerSecond);
        },
        stop() {
            if (this.__timer) {
                clearInterval(this.__timer);
                delete this.__timer;
            }
        },
        advance() {
            game.advance();
            this.board = game.board;
            this.liveCellCount = game.liveCellCount;
        },
        toggle(x, y) {
            const current = game.board[x][y];
            const next = current === 1 ? 0 : 1;
            game.place(x, y, next);
            this._refresh();
        }
    }
}).mount('#app')
