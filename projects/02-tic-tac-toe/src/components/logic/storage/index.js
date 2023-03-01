export const saveGameToStorage = ({board, turn}) => {
    // guaradr aqui partida, siemrpe guardar con string primer parametro y con un JSON.stringify segundo parametro
    window.localStorage.setItem("board", JSON.stringify(board))
    window.localStorage.setItem("turn", turn)
}

export const resetGameStorage = () => {
    window.localStorage.removeItem("board")
    window.localStorage.removeItem("turn")
}