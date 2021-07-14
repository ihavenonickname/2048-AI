import * as game from './game.mjs'
import * as helper from './helper.mjs'

const directions = [
    game.Direction.UP,
    game.Direction.DOWN,
    game.Direction.LEFT,
    game.Direction.RIGHT
]

const nSimulations = 2_000
const depthSimulation = 300

export function findBestMove(board) {
    let totalScore = {}
    const randomDirections = directions.slice(0)
    helper.shuffle(randomDirections)

    for (const direction of randomDirections) {
        const testBoard = helper.copyBoard(board)
        game.play(testBoard, direction)
        totalScore[direction] = {}

        for (let i = 0; i < nSimulations; i += 1) {
            const simulationBoard = helper.copyBoard(testBoard)
            const finalScore = simulate(simulationBoard)
            totalScore[direction][finalScore] = 1 + (totalScore[direction][finalScore] || 0)
        }
    }

    let bestFit = 0
    let bestMove = null

    for (const direction of directions) {
        const fit = evaluateFitness(totalScore[direction])
        if (fit > bestFit) {
            bestFit = fit
            bestMove = direction
        }
    }

    return bestMove
}

function simulate(board) {
    let i
    for (i = 0; i < depthSimulation; i += 1) {
        if (!game.fillNextRound(board)) {
            break
        }

        game.play(board, helper.randomFrom(directions))
    }

    return game.score(board) * i * 10
}

function evaluateFitness(scores) {
    let total = 0
    for (const key of Object.keys(scores)) {
        total += key * scores[key]
    }
    return total
}
