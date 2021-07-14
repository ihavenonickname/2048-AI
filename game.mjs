import { randomFrom } from './helper.mjs'

export const Direction = {
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
    UP: 'UP',
    DOWN: 'DOWN',
}

export function initializeBoard() {
    const board = [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
    ]

    fillNextRound(board)
    fillNextRound(board)

    return board
}

export function score(board) {
    return Math.max(...board.map(row => Math.max(...row.map(v => v || 0))))
}

export function fillNextRound(board) {
    const lastIndex = board.length - 1
    const emptyCells = []

    for (let rowIndex = 0; rowIndex <= lastIndex; rowIndex += 1) {
        for (let colIndex = 0; colIndex <= lastIndex; colIndex += 1) {
            if (board[rowIndex][colIndex] === null) {
                emptyCells.push({ rowIndex, colIndex })
            }
        }
    }

    if (emptyCells.length === 0) {
        return false
    }

    const { rowIndex, colIndex } = randomFrom(emptyCells)

    board[rowIndex][colIndex] = Math.random() < 0.9 ? 2 : 4

    return true
}

export function play(board, direction) {
    switch (direction) {
        case Direction.DOWN: {
            moveDown(board)
            break
        }

        case Direction.UP: {
            moveUp(board)
            break
        }

        case Direction.RIGHT: {
            moveRight(board)
            break
        }

        case Direction.LEFT: {
            moveLeft(board)
            break
        }
    }
}

function moveDown(board) {
    const lastIndex = board.length - 1
    const modified = createModifiedCache(board)

    for (let rowIndex = lastIndex - 1; rowIndex >= 0; rowIndex -= 1) {
        for (let colIndex = 0; colIndex <= lastIndex; colIndex += 1) {
            if (board[rowIndex][colIndex] === null) {
                continue
            }

            let i = rowIndex + 1

            while (i < lastIndex && board[i][colIndex] === null) {
                i += 1
            }

            if (i === lastIndex) {
                if (board[i][colIndex] === null) {
                    board[i][colIndex] = board[rowIndex][colIndex]
                    board[rowIndex][colIndex] = null
                } else if (board[i][colIndex] === board[rowIndex][colIndex] && !modified[i][colIndex]) {
                    board[i][colIndex] *= 2
                    board[rowIndex][colIndex] = null
                    modified[i][colIndex] = true
                } else if (i - 1 !== rowIndex) {
                    board[i - 1][colIndex] = board[rowIndex][colIndex]
                    board[rowIndex][colIndex] = null
                }
            } else {
                if (board[rowIndex][colIndex] === board[i][colIndex] && !modified[i][colIndex]) {
                    board[i][colIndex] *= 2
                    board[rowIndex][colIndex] = null
                    modified[i][colIndex] = true
                } else if (i - 1 !== rowIndex) {
                    board[i - 1][colIndex] = board[rowIndex][colIndex]
                    board[rowIndex][colIndex] = null
                }
            }
        }
    }
}

function moveUp(board) {
    const lastIndex = board.length - 1
    const modified = createModifiedCache(board)

    for (let rowIndex = 1; rowIndex <= lastIndex; rowIndex += 1) {
        for (let colIndex = 0; colIndex <= lastIndex; colIndex += 1) {
            if (board[rowIndex][colIndex] === null) {
                continue
            }

            let i = rowIndex - 1

            while (i > 0 && board[i][colIndex] === null) {
                i -= 1
            }

            if (i === 0) {
                if (board[i][colIndex] === null) {
                    board[i][colIndex] = board[rowIndex][colIndex]
                    board[rowIndex][colIndex] = null
                } else if (board[i][colIndex] === board[rowIndex][colIndex] && !modified[i][colIndex]) {
                    board[i][colIndex] *= 2
                    board[rowIndex][colIndex] = null
                    modified[i][colIndex] = true
                } else if (i + 1 !== rowIndex) {
                    board[i + 1][colIndex] = board[rowIndex][colIndex]
                    board[rowIndex][colIndex] = null
                }
            } else {
                if (board[rowIndex][colIndex] === board[i][colIndex] && !modified[i][colIndex]) {
                    board[i][colIndex] *= 2
                    board[rowIndex][colIndex] = null
                    modified[i][colIndex] = true
                } else if (i + 1 !== rowIndex) {
                    board[i + 1][colIndex] = board[rowIndex][colIndex]
                    board[rowIndex][colIndex] = null
                }
            }
        }
    }
}

function moveLeft(board) {
    const lastIndex = board.length - 1
    const modified = createModifiedCache(board)

    for (let colIndex = 1; colIndex <= lastIndex; colIndex += 1) {
        for (let rowIndex = 0; rowIndex <= lastIndex; rowIndex += 1) {
            if (board[rowIndex][colIndex] === null) {
                continue
            }

            let i = colIndex - 1

            while (i > 0 && board[rowIndex][i] === null) {
                i -= 1
            }

            if (i === 0) {
                if (board[rowIndex][i] === null) {
                    board[rowIndex][i] = board[rowIndex][colIndex]
                    board[rowIndex][colIndex] = null
                } else if (board[rowIndex][i] === board[rowIndex][colIndex] && !modified[rowIndex][i]) {
                    board[rowIndex][i] *= 2
                    board[rowIndex][colIndex] = null
                    modified[rowIndex][i] = true
                } else if (i + 1 !== colIndex) {
                    board[rowIndex][i + 1] = board[rowIndex][colIndex]
                    board[rowIndex][colIndex] = null
                }
            } else {
                if (board[rowIndex][colIndex] === board[rowIndex][i] && !modified[rowIndex][i]) {
                    board[rowIndex][i] *= 2
                    board[rowIndex][colIndex] = null
                    modified[rowIndex][i] = true
                } else if (i + 1 !== colIndex) {
                    board[rowIndex][i + 1] = board[rowIndex][colIndex]
                    board[rowIndex][colIndex] = null
                }
            }
        }
    }
}

function moveRight(board) {
    const lastIndex = board.length - 1
    const modified = createModifiedCache(board)

    for (let colIndex = lastIndex - 1; colIndex >= 0; colIndex -= 1) {
        for (let rowIndex = 0; rowIndex <= lastIndex; rowIndex += 1) {
            if (board[rowIndex][colIndex] === null) {
                continue
            }

            let i = colIndex + 1

            while (i < lastIndex && board[rowIndex][i] === null) {
                i += 1
            }

            if (i === lastIndex) {
                if (board[rowIndex][i] === null) {
                    board[rowIndex][i] = board[rowIndex][colIndex]
                    board[rowIndex][colIndex] = null
                } else if (board[rowIndex][i] === board[rowIndex][colIndex] && !modified[rowIndex][i]) {
                    board[rowIndex][i] *= 2
                    board[rowIndex][colIndex] = null
                    modified[rowIndex][i] = true
                } else if (i - 1 !== colIndex) {
                    board[rowIndex][i - 1] = board[rowIndex][colIndex]
                    board[rowIndex][colIndex] = null
                }
            } else {
                if (board[rowIndex][colIndex] === board[rowIndex][i] && !modified[rowIndex][i]) {
                    board[rowIndex][i] *= 2
                    board[rowIndex][colIndex] = null
                    modified[rowIndex][i] = true
                } else if (i - 1 !== colIndex) {
                    board[rowIndex][i - 1] = board[rowIndex][colIndex]
                    board[rowIndex][colIndex] = null
                }
            }
        }
    }
}

function createModifiedCache(board) {
    const modified = []

    for (let i = 0; i < board.length; i += 1) {
        modified.push([])

        for (let j = 0; j < board.length; j += 1) {
            modified[i].push(false)
        }
    }

    return modified
}
