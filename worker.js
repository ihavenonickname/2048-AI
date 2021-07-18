importScripts('./helper.js')
importScripts('./game.js')
importScripts('./ai.js')

addEventListener('message', function ({ data }) {
    const { type } = data

    switch (type) {
        case 'find-best-direction': {
            const { board, nSimulations } = data
            const start = performance.now()
            const game = new Game(board)
            const direction = findBestDirection(game, nSimulations)
            const end = performance.now()
            const duration = end - start
            postMessage({ type, direction, duration })
            break
        }
    }
})
