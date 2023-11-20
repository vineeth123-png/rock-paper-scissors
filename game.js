const possibleDraws = ['rock', 'paper', 'scissors'];

function getComputerChoice() {
    return possibleDraws[Math.floor(Math.random() * 3)];
}

function isValidDraw(playerSelection) {
    const playerDraw = playerSelection.toLowerCase();
    return possibleDraws.findIndex(draw => draw === playerDraw) !== -1;
}

const rockButton = document.querySelector('.rock-btn');
rockButton.addEventListener('click', function(e) {playRoundDOMWrapper('rock', getComputerChoice());} );
const paperButton = document.querySelector('.paper-btn');
paperButton.addEventListener('click', function(e) {playRoundDOMWrapper('paper', getComputerChoice());} );
const scissorsButton = document.querySelector('.scissors-btn');
scissorsButton.addEventListener('click', function(e) {playRoundDOMWrapper('scissors', getComputerChoice());} );

var playerWins = 0, computerWins = 0;



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
        playComments = "This round's a draw!";
    } else if(playerWon) {
        playComments = `You Win this round! ${playerDraw} beats ${computerSelection}`;
    } else {
        playComments = `You Lose this round! ${computerSelection} beats ${playerDraw}`;
    }

    return playComments;
}

function playRoundDOMWrapper(playerSelection, computerSelection) {

    

    resetIfInInitialState();
    // add round's summary into div's textContent
    const containerDiv = document.querySelector('.game-track');
    const scoreTrackingDiv = document.createElement('p');
    const playComments = playRound(playerSelection, computerSelection);

    scoreTrackingDiv.textContent += playComments;
    containerDiv.appendChild(scoreTrackingDiv);

    if (playComments.includes('Win')) {
        playerWins++;
    } else if(playComments.includes('Lose')) {
        computerWins++;
    }

    // display scores in HTML
    displayScores();

    // check if game's done.
    const {isFinished, verdict} = checkIfGameFinished();
    const gameTrackingDiv = document.createElement('p');
    if (isFinished) {
        gameTrackingDiv.textContent = 'Game Over!!!';
        gameTrackingDiv.textContent += verdict;
        containerDiv.appendChild(gameTrackingDiv);
        // Re-write scores to play new game.
        playerWins = 0; computerWins = 0;
    }
}

function checkIfGameFinished() {
    if(playerWins === 5) {
        return {isFinished: true, verdict: 'Player Wins!'};
    } else if (computerWins === 5) {
        return {isFinished: true, verdict: 'Player Loses!'};
    }

    return {isFinished: false, verdict: 'An exciting match in progress!'};
}

function resetIfInInitialState() {
    if(playerWins === 0 && computerWins === 0) {
        const containerDiv = document.querySelector('.game-track');
        containerDiv.textContent = '';
    }
}

function displayScores() {
    let scoresDiv = document.querySelector(".scores");
    if (scoresDiv === null) {
        scoresDiv = document.createElement('p');
        scoresDiv.classList.add('scores');
        scoresDiv.textContent = `Player: ${playerWins} Computer: ${computerWins}`;

        const containerDiv = document.querySelector('.game-track');
        containerDiv.appendChild(scoresDiv);
    }
    scoresDiv.textContent = `Player: ${playerWins} Computer: ${computerWins}`;
}