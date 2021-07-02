import { Life } from './life';


function freshTarget() { return new Life(); }

test('life starts with a surface', () => {
    const target = freshTarget();
    expect(target.board).not.toBeNull();
});

test('cleanBoard size', () => {
    const target = new Life();
    const subject = target.cleanBoard;
    expect(subject.length).toBe(target.CONFIG.board.rows + 2);
    expect(subject[0].length).toBe(target.CONFIG.board.columns + 2);
});

test('place pix', () => {
    const target = freshTarget();
    target.place(1, 2);
    expect(target.board[1][2]).toBe(1);
})


test('liveNighbors returns count', () => {
    const target = solidCorner();

    expect(target.liveNeighbors(2, 2)).toBe(8);
    expect(target.liveNeighbors(4, 1)).toBe(2);
    expect(target.liveNeighbors(3, 3)).toBe(3);
})

test.each([
    [1, 1, 1],
    [1, 2, 0],
    [1, 3, 1],
    [1, 4, 0],
    [2, 4, 1],
    [4, 2, 1]]
)('nextState at [%i,%i] should be %i', (x, y, expected) => {
    const target = solidCorner();

    expect(target.nextState(x, y)).toBe(expected)
});

test('bar-minus cycle', () => {
    const target = freshTarget();
    // create "column" of 3 pixels
    target.place(1, 2);
    target.place(2, 2);
    target.place(3, 2);


    const actual = target.nextBoard();

    // expect "row" of pixesls second row, 3 columns wide
    expect(actual[1][1]).toBe(0);
    expect(actual[1][2]).toBe(0);
    expect(actual[1][3]).toBe(0);
    expect(actual[2][1]).toBe(1);
    expect(actual[2][2]).toBe(1);
    expect(actual[2][3]).toBe(1);
    expect(actual[3][1]).toBe(0);
    expect(actual[3][2]).toBe(0);
    expect(actual[3][3]).toBe(0);
});


test.each([
    [true, 0, 0],
    [true, 1, 0],
    [true, 2, 1],
    [true, 3, 1],
    [true, 4, 0],
    [true, 5, 0],
    [true, 6, 0],
    [true, 7, 0],

    [false, 0, 0],
    [false, 1, 0],
    [false, 2, 0],
    [false, 3, 1],
    [false, 4, 0],
    [false, 5, 0],
    [false, 6, 0],
    [false, 7, 0],

]
)('shouldLive with alive now = %p, live neighbour count %i] should be %i', (aliveNow, liveNeighborCount, expected) => {


    expect(Life.shouldLive(aliveNow, liveNeighborCount)).toBe(expected);
});

function solidCorner() {
    const target = new Life();
    target.place(1, 1); target.place(1, 2); target.place(1, 3);
    target.place(2, 1); target.place(2, 2); target.place(2, 3);
    target.place(3, 1); target.place(3, 2); target.place(3, 3);
    return target;
}

