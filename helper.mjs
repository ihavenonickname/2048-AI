export function randomFrom(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

export function shuffle(array) {
    for (let currentIndex = array.length - 1; currentIndex !== 0; currentIndex -= 1) {
        const randomIndex = Math.floor(Math.random() * currentIndex)
        const temp = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temp
    }
}

export function copyBoard(board) {
    return board.map(row => [...row])
}
