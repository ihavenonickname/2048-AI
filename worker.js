importScripts('./helper.js')
importScripts('./game.js')
importScripts('./ai.js')

addEventListener('message', function (e) {
    const type = e.data.type

    switch (type) {
        case 'find-best-direction': {
            const game = new Game(e.data.board)
            const direction = findBestDirection(game)
            postMessage({ type, direction })
            break
        }
    }
})
