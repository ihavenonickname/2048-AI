const Direction = Object.freeze({
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
    UP: 'UP',
    DOWN: 'DOWN',
})

class Game {
    _board
    _isOver

    constructor(board = null) {
        if (board !== null) {
            this._board = Helper.copyBoard(board)
        } else {
            this._board = [
                [null, null, null, null],
                [null, null, null, null],
                [null, null, null, null],
                [null, null, null, null],
            ]

            this._inserNewValue()
            this._inserNewValue()
        }

        this._isOver = false
    }

    get isOver() {
        for (let rowIndex = 0; rowIndex < this._board.length; rowIndex += 1) {
            for (let colIndex = 0; colIndex < this._board.length; colIndex += 1) {
                if (this._board[rowIndex][colIndex] === null) {
                    return false
                }
            }
        }

        return true
    }

    get score() {
        return Math.max(...this._board.map(row => Math.max(...row.map(v => v || 0))))
    }

    get board() {
        return this._board
    }

    play(direction) {
        const moved = this._move(direction)

        if (moved) {
            this._inserNewValue()
        }

        return moved
    }

    _move(direction) {
        switch (direction) {
            case Direction.DOWN: {
                return this._moveDown()
            }

            case Direction.UP: {
                return this._moveUp()
            }

            case Direction.RIGHT: {
                return this._moveRight()
            }

            case Direction.LEFT: {
                return this._moveLeft()
            }
        }
    }

    _inserNewValue() {
        if (this.isOver) {
            throw new Error('game is already over')
        }

        const lastIndex = this._board.length - 1
        const emptyCells = []

        for (let rowIndex = 0; rowIndex <= lastIndex; rowIndex += 1) {
            for (let colIndex = 0; colIndex <= lastIndex; colIndex += 1) {
                if (this._board[rowIndex][colIndex] === null) {
                    emptyCells.push({ rowIndex, colIndex })
                }
            }
        }

        if (emptyCells.length !== 0) {
            const { rowIndex, colIndex } = Helper.randomFrom(emptyCells)
            this._board[rowIndex][colIndex] = Math.random() < 0.9 ? 2 : 4
        } else {
            this._isOver = true
        }
    }

    _moveDown() {
        const lastIndex = this._board.length - 1
        const modified = this._createModifiedCache()
        let moved = false

        for (let rowIndex = lastIndex - 1; rowIndex >= 0; rowIndex -= 1) {
            for (let colIndex = 0; colIndex <= lastIndex; colIndex += 1) {
                if (this._board[rowIndex][colIndex] === null) {
                    continue
                }

                let i = rowIndex + 1

                while (i < lastIndex && this._board[i][colIndex] === null) {
                    i += 1
                }

                if (i === lastIndex) {
                    if (this._board[i][colIndex] === null) {
                        this._board[i][colIndex] = this._board[rowIndex][colIndex]
                        this._board[rowIndex][colIndex] = null
                        moved = true
                    } else if (this._board[i][colIndex] === this._board[rowIndex][colIndex] && !modified[i][colIndex]) {
                        this._board[i][colIndex] *= 2
                        this._board[rowIndex][colIndex] = null
                        modified[i][colIndex] = true
                        moved = true
                    } else if (i - 1 !== rowIndex) {
                        this._board[i - 1][colIndex] = this._board[rowIndex][colIndex]
                        this._board[rowIndex][colIndex] = null
                        moved = true
                    }
                } else {
                    if (this._board[rowIndex][colIndex] === this._board[i][colIndex] && !modified[i][colIndex]) {
                        this._board[i][colIndex] *= 2
                        this._board[rowIndex][colIndex] = null
                        modified[i][colIndex] = true
                        moved = true
                    } else if (i - 1 !== rowIndex) {
                        this._board[i - 1][colIndex] = this._board[rowIndex][colIndex]
                        this._board[rowIndex][colIndex] = null
                        moved = true
                    }
                }
            }
        }

        return moved
    }

    _moveUp() {
        const lastIndex = this._board.length - 1
        const modified = this._createModifiedCache()
        let moved = false

        for (let rowIndex = 1; rowIndex <= lastIndex; rowIndex += 1) {
            for (let colIndex = 0; colIndex <= lastIndex; colIndex += 1) {
                if (this._board[rowIndex][colIndex] === null) {
                    continue
                }

                let i = rowIndex - 1

                while (i > 0 && this._board[i][colIndex] === null) {
                    i -= 1
                }

                if (i === 0) {
                    if (this._board[i][colIndex] === null) {
                        this._board[i][colIndex] = this._board[rowIndex][colIndex]
                        this._board[rowIndex][colIndex] = null
                        moved = true
                    } else if (this._board[i][colIndex] === this._board[rowIndex][colIndex] && !modified[i][colIndex]) {
                        this._board[i][colIndex] *= 2
                        this._board[rowIndex][colIndex] = null
                        modified[i][colIndex] = true
                        moved = true
                    } else if (i + 1 !== rowIndex) {
                        this._board[i + 1][colIndex] = this._board[rowIndex][colIndex]
                        this._board[rowIndex][colIndex] = null
                        moved = true
                    }
                } else {
                    if (this._board[rowIndex][colIndex] === this._board[i][colIndex] && !modified[i][colIndex]) {
                        this._board[i][colIndex] *= 2
                        this._board[rowIndex][colIndex] = null
                        modified[i][colIndex] = true
                        moved = true
                    } else if (i + 1 !== rowIndex) {
                        this._board[i + 1][colIndex] = this._board[rowIndex][colIndex]
                        this._board[rowIndex][colIndex] = null
                        moved = true
                    }
                }
            }
        }

        return moved
    }

    _moveLeft() {
        const lastIndex = this._board.length - 1
        const modified = this._createModifiedCache()
        let moved = false

        for (let colIndex = 1; colIndex <= lastIndex; colIndex += 1) {
            for (let rowIndex = 0; rowIndex <= lastIndex; rowIndex += 1) {
                if (this._board[rowIndex][colIndex] === null) {
                    continue
                }

                let i = colIndex - 1

                while (i > 0 && this._board[rowIndex][i] === null) {
                    i -= 1
                }

                if (i === 0) {
                    if (this._board[rowIndex][i] === null) {
                        this._board[rowIndex][i] = this._board[rowIndex][colIndex]
                        this._board[rowIndex][colIndex] = null
                        moved = true
                    } else if (this._board[rowIndex][i] === this._board[rowIndex][colIndex] && !modified[rowIndex][i]) {
                        this._board[rowIndex][i] *= 2
                        this._board[rowIndex][colIndex] = null
                        modified[rowIndex][i] = true
                        moved = true
                    } else if (i + 1 !== colIndex) {
                        this._board[rowIndex][i + 1] = this._board[rowIndex][colIndex]
                        this._board[rowIndex][colIndex] = null
                        moved = true
                    }
                } else {
                    if (this._board[rowIndex][colIndex] === this._board[rowIndex][i] && !modified[rowIndex][i]) {
                        this._board[rowIndex][i] *= 2
                        this._board[rowIndex][colIndex] = null
                        modified[rowIndex][i] = true
                        moved = true
                    } else if (i + 1 !== colIndex) {
                        this._board[rowIndex][i + 1] = this._board[rowIndex][colIndex]
                        this._board[rowIndex][colIndex] = null
                        moved = true
                    }
                }
            }
        }

        return moved
    }

    _moveRight() {
        const lastIndex = this._board.length - 1
        const modified = this._createModifiedCache()
        let moved = false

        for (let colIndex = lastIndex - 1; colIndex >= 0; colIndex -= 1) {
            for (let rowIndex = 0; rowIndex <= lastIndex; rowIndex += 1) {
                if (this._board[rowIndex][colIndex] === null) {
                    continue
                }

                let i = colIndex + 1

                while (i < lastIndex && this._board[rowIndex][i] === null) {
                    i += 1
                }

                if (i === lastIndex) {
                    if (this._board[rowIndex][i] === null) {
                        this._board[rowIndex][i] = this._board[rowIndex][colIndex]
                        this._board[rowIndex][colIndex] = null
                        moved = true
                    } else if (this._board[rowIndex][i] === this._board[rowIndex][colIndex] && !modified[rowIndex][i]) {
                        this._board[rowIndex][i] *= 2
                        this._board[rowIndex][colIndex] = null
                        modified[rowIndex][i] = true
                        moved = true
                    } else if (i - 1 !== colIndex) {
                        this._board[rowIndex][i - 1] = this._board[rowIndex][colIndex]
                        this._board[rowIndex][colIndex] = null
                        moved = true
                    }
                } else {
                    if (this._board[rowIndex][colIndex] === this._board[rowIndex][i] && !modified[rowIndex][i]) {
                        this._board[rowIndex][i] *= 2
                        this._board[rowIndex][colIndex] = null
                        modified[rowIndex][i] = true
                        moved = true
                    } else if (i - 1 !== colIndex) {
                        this._board[rowIndex][i - 1] = this._board[rowIndex][colIndex]
                        this._board[rowIndex][colIndex] = null
                        moved = true
                    }
                }
            }
        }

        return moved
    }

    _createModifiedCache() {
        const modified = []

        for (let i = 0; i < this._board.length; i += 1) {
            modified.push([])

            for (let j = 0; j < this._board.length; j += 1) {
                modified[i].push(false)
            }
        }

        return modified
    }
}
