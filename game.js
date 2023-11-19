const possibleDraws = ['rock', 'paper', 'scissors'];

function getComputerChoice() {
    return possibleDraws[Math.floor(Math.random() * 3)];
}

function isValidDraw(playerSelection) {
    const playerDraw = playerSelection.toLowerCase();
    return possibleDraws.findIndex(draw => draw === playerDraw) !== -1;
}

function game() {
    let playerWins = 0, computerWins = 0;
    

    for(let count = 0; count < 5; count++){
        let playerSelection = prompt('Enter your draw!'), computerSelection = getComputerChoice();
        let comments = playRound(playerSelection, computerSelection);
        if (comments.includes('draw')) {
            continue;
        } else if ( comments.includes('Win')) {
            playerWins++;
        } else {
            computerWins++;
        }
    }
    const trackElement = document.querySelector('.track');

    if (computerWins === playerWins) {
        trackElement.textContent = 'Its a draw!';
    } else if(computerWins > playerWins) {
        trackElement.textContent = 'You Lose!';
    } else {
        trackElement.textContent = 'You Win!';
    }
}

function playRound(playerSelection, computerSelection) {
    const playerDraw = playerSelection.toLowerCase(), computerDraw = computerSelection.toLowerCase();

    if( !isValidDraw(playerDraw) || !isValidDraw(computerSelection)) {
        return `Invalid Inputs! Player chose: ${playerSelection}, Computer chose: ${computerSelection}. Play again!`;
    }
    let isDraw = false, playerWon = false;
    let playComments = '';
    switch (playerDraw) {
        case 'rock':
            if(computerDraw === 'rock') {
                isDraw = true;
            } else if (computerDraw === 'paper') {
                playerWon = false;
            } else {
                playerWon = true;
            }
            break;
        case 'paper':
            if(computerDraw === 'paper') {
                isDraw = true;
            } else if (computerDraw === 'scissor') {
                playerWon = false;
            } else {
                playerWon = true;
            }
            break;
        case 'scissors':
            if(computerDraw === 'scissors') {
                isDraw = true;
            } else if (computerDraw === 'rock') {
                playerWon = false;
            } else {
                playerWon = true;
            }
            break;
        default:
            break;
    }

    if(isDraw) {
        playComments = 'Its a draw!';
    } else if(playerWon) {
        playComments = `You Win! ${playerDraw} beats ${computerSelection}`;
    } else {
        playComments = `You Lose! ${computerSelection} beats ${playerDraw}`;
    }

    return playComments;
}