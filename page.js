const worker = new Worker('worker.js')
let game = new Game()

const app = new Vue({
    el: '#app',
    data() {
        return {
            direction: Direction,
            board: Helper.copyBoard(game.board),
            isAiPlaying: false,
            lastAiTimings: [],
            aiAggressiveness: 'medium'
        }
    },
    computed: {
        averageAitimings() {
            if (this.lastAiTimings.length === 0) {
                return 0
            }

            const startIndex = Math.max(0, this.lastAiTimings.length - 3)
            const timings = this.lastAiTimings.slice(startIndex)
            const average = timings.reduce((acc, x) => acc + x, 0) / timings.length
            return Math.floor(average)
        }
    },
    methods: {
        startNewGame() {
            game = new Game()
            this.board = Helper.copyBoard(game.board)
            this.lastAiTimings = []
        },
        toggleAi() {
            if (game.isOver) {
                alert('Game is over! Start a new game')
            } else if (this.isAiPlaying) {
                this.isAiPlaying = false
            } else {
                this.isAiPlaying = true
                this.postAiWork()
            }
        },
        makeMove(direction) {
            if (game.isOver) {
                alert('Game is over! Start a new game')
            } else {
                game.play(direction)
                this.board = Helper.copyBoard(game.board)
            }
        },
        postAiWork() {
            const nSimulations = ({
                'high': 3000,
                'medium': 1000,
                'low': 200
            })[this.aiAggressiveness]

            worker.postMessage({
                type: 'find-best-direction',
                board: game.board,
                nSimulations,
            })
        }
    },
    mounted() {
        worker.addEventListener('message', ({ data }) => {
            switch (data.type) {
                case 'find-best-direction': {
                    const { direction, duration } = data

                    this.makeMove(direction)
                    this.lastAiTimings.push(duration)

                    if (this.isAiPlaying) {
                        if (game.isOver) {
                            this.isAiPlaying = false
                        } else {
                            this.postAiWork()
                        }
                    }
                }
            }
        })
    }
})
