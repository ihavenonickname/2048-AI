function findBestDirection(game, nSimulations) {
    const directions = [
        Direction.UP,
        Direction.DOWN,
        Direction.LEFT,
        Direction.RIGHT
    ]

    function evaluateDirection(game, direction) {
        let simulationScore = 0

        for (let i = 0; i < nSimulations; i += 1) {
            const simulationGame = new Game(game.board)

            if (!simulationGame.play(direction)) {
                return 0
            }

            let depth = 1

            while (!simulationGame.isOver) {
                simulationGame.play(Helper.randomFrom(directions))
                depth += 1
            }

            simulationScore += simulationGame.score * depth
        }

        return simulationScore
    }

    if (game.isOver) {
        throw new Error('game is already over')
    }

    const randomDirections = directions.slice(0)
    Helper.shuffle(randomDirections)

    let bestSimulationScore = 0
    let bestDirection = null

    for (const direction of randomDirections) {
        const simulationScore = evaluateDirection(game, direction)

        if (simulationScore > bestSimulationScore) {
            bestSimulationScore = simulationScore
            bestDirection = direction
        }
    }

    return bestDirection
}
