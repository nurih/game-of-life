import { Life } from './life.js';
const game = new Life();

const app = Vue.createApp({
    el: '#app',
    data() {
        return {
            board: game.board
        }
    },
    methods: {
        _refresh() {
            this.board = game.board;
            this.$forceUpdate();
        },
        clear() {
            game.reset();
            this._refresh();
        },
        advance() {
            game.advance();
            this.board = game.board;
        },
        toggle(x, y) {
            const current = game.board[x][y];
            const next = current === 1 ? 0 : 1;
            game.place(x, y, next);
            this._refresh();
        }
    }
}).mount('#app')
