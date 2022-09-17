// PLAYERS-MODULE
const players = (() => {
    let playerOne;
    let playerTwo;

    const player = (name) => {
        return {name};
    };

    const createPlayers = () => {
        let playerOneName = document.getElementById("player-one").value;
        players.playerOne = player(playerOneName);

        let playerTwoName = document.getElementById("player-two").value;
        players.playerTwo = player(playerTwoName);
    }

    return {
        createPlayers,
        playerOne,
        playerTwo,
    };
})();

// GAME-MODULE
const game = (() => {
    let gameActive = false;
    let playTurn = Math.random() < 0.5 ? "playerOne" : "playerTwo";

    const startGame = () => {
        let playerOneName = document.getElementById("player-one");
        let playerTwoName = document.getElementById("player-two");

        if ((!gameBoard.boardStatus.includes("x")) && (!gameBoard.boardStatus.includes("o")) && !playerOneName.value == "" && !playerTwoName.value == ""
        && gameActive == false) {
            game.gameActive = true;
            players.createPlayers();

            playerOneName.setAttribute('disabled', '');
            playerTwoName.setAttribute('disabled', '');

            if (playTurn == "playerOne") {
                gameBoard.displayMessage(`${players.playerOne.name}'s turn (X)`);
            }
            if (playTurn == "playerTwo") {
                gameBoard.displayMessage(`${players.playerTwo.name}'s turn (O)`);
            };
        };
    };

    const playerMove = (e) => {
        if (game.gameActive) {
            const grid = e.target;
            if (gameBoard.boardStatus[grid.id] == null && playTurn == "playerOne" && checkScore() == false) { 
                updateGameStatus(grid.id, "x");
                if (checkScore() == "draw") {
                    gameBoard.displayMessage("Draw!");
                    game.gameActive = false;
                }
                else if (checkScore() == "x") { 
                    gameBoard.displayMessage(`${players.playerOne.name} wins!`);
                    game.gameActive = false;
                }
                else {
                    gameBoard.displayMessage(`${players.playerTwo.name}'s turn (O)`);
                    playTurn = "playerTwo";
                };
            };
    
            if (gameBoard.boardStatus[grid.id] == null && playTurn === "playerTwo" && checkScore() == false) {
                updateGameStatus(grid.id, "o");
                if (checkScore() == "draw") { 
                    gameBoard.displayMessage("Draw!");
                    game.gameActive = false;
                }
                else if (checkScore() == "o") { 
                    gameBoard.displayMessage(`${players.playerTwo.name} wins!`);
                    game.gameActive = false;
                }
                else {
                    gameBoard.displayMessage(`${players.playerOne.name}'s turn (X)`);
                    playTurn = "playerOne";
                };
            };
        };
    };

    const updateGameStatus = (id, mark) => {
        gameBoard.boardStatus[id] = mark;
        gameBoard.displayController();
    };

    const checkScore = function () {
        let str = gameBoard.boardStatus
        .map(item => item === null ? "n" : `${item}`)
        .join('');
    
        if (/xxx....../.test(str) || /ooo....../.test(str)) {
            gameBoard.changeGridColor("#90EE90", 0, 1, 2);
            if (/xxx....../.test(str)) {
                return "x";
            }
            else {return "o";}
        }
    
        else if (/...xxx.../.test(str) || /...ooo.../.test(str)) {
            gameBoard.changeGridColor("#90EE90", 3, 4, 5);
            if (/...xxx.../.test(str)) {
                return "x";
            }
            else {return "o";}
        }
    
        else if (/......xxx/.test(str) || /......ooo/.test(str)) {
            gameBoard.changeGridColor("#90EE90", 6, 7, 8);
            if (/......xxx/.test(str)) {
                return "x";
            }
            else {return "o";}
        }
    
        else if (/x..x..x../.test(str) || /o..o..o../.test(str)) {
            gameBoard.changeGridColor("#90EE90", 0, 3, 6);
            if (/x..x..x../.test(str)) {
                return "x";
            }
            else {return "o";}
        }
    
        else if (/.x..x..x./.test(str) || /.o..o..o./.test(str)) {
            gameBoard.changeGridColor("#90EE90", 1, 4, 7);
            if (/.x..x..x./.test(str)) {
                return "x";
            }
            else {return "o";}
        }
    
        else if (/..x..x..x/.test(str) || /..o..o..o/.test(str)) {
            gameBoard.changeGridColor("#90EE90", 2, 5, 8);
            if (/..x..x..x/.test(str)) {
                return "x";
            }
            else {return "o";}
        }
    
        else if (/x...x...x/.test(str) || /o...o...o/.test(str)) {
            gameBoard.changeGridColor("#90EE90", 0, 4, 8);
            if (/x...x...x/.test(str)) {
                return "x";
            }
            else {return "o";}
        }
    
        else if (/..x.x.x../.test(str) || /..o.o.o../.test(str)) {
            gameBoard.changeGridColor("#90EE90", 2, 4, 6);
            if (/..x.x.x../.test(str)) {
                return "x";
            }
            else {return "o";}
        }
    
        else if (!str.includes("n")) {
            gameBoard.changeGridColor("#90EE90", 0, 1, 2, 3, 4, 5, 6, 7, 8);
            return "draw";
        }
    
        else {
            return false;
        };
    };

    const resetGame = () => {
        let el = document.getElementsByClassName("grid");

        for (let i = 0; i < 9; i++) {
            gameBoard.boardStatus[i] = null;
            el[i].style.backgroundColor = "white"
          }
          gameBoard.displayController();
          document.getElementById("player-one").value = "";
          document.getElementById("player-two").value = "";

          const playerOneName = document.getElementById("player-one");
          const playerTwoName = document.getElementById("player-two");

          playerOneName.removeAttribute('disabled', '');
          playerTwoName.removeAttribute('disabled', '');
          game.gameActive = false;

          playTurn = Math.random() < 0.5 ? "playerOne" : "playerTwo";

          gameBoard.displayMessage('Write names and press "Start game"');
    };

return {
    playerMove,
    startGame,
    resetGame,
};
})();

// GAMEBOARD-MODULE
const gameBoard = (() => {
    const boardStatus = [null, null, null, null, null, null, null, null, null];

    let grid = document.querySelectorAll('.grid');
    grid.forEach(grid => grid.addEventListener('click', game.playerMove));

    document.getElementById('start').onclick = () => game.startGame();

    document.getElementById('reset').onclick = () => game.resetGame();

    const displayController = () => {
        for (let i = 0; i < boardStatus.length; i++) {
            const element = document.getElementById(i);
            
            if (boardStatus[i] == "x") {
                element.classList.add("x");
            }

            else if (boardStatus[i] == "o") {
                element.classList.add("o");
            }
            
            else if (boardStatus[i] == null) {
                element.classList.remove('x');
                element.classList.remove('o');
                element.classList.add('null');
            };
        };
    };

    const changeGridColor = function (color, ...args) {
        const el = document.getElementsByClassName("grid");
        for(let i = 0; i < args.length; i++){ 
            el[args[i]].style.backgroundColor = color;
        };
    };

    const displayMessage = (msg) => {
        document.querySelector(".messages > p").innerText = msg;
    };

    return {
      displayController,
      boardStatus,
      changeGridColor,
      displayMessage,
    };
})();