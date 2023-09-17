
let score = 0;
document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.sync.get(['q1', 'q2', 'q3'], function (answers) {
        const correctAnswers = {
            q1: 'b',
            q2: 'c',
            q3: 'a',
        };


        if (answers.q1 === correctAnswers.q1) {
            score++;
        }

        if (answers.q2 === correctAnswers.q2) {
            score++;
        }

        if (answers.q3 === correctAnswers.q3) {
            score++;
        }



    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Check if the button with the original "quiz" ID exists on the page
    let scoreMessage = document.getElementById('scoreMessage');
    let scoreDisplay = document.getElementById('score');
    let userAccount = 0;

    scoreMessage.textContent = 'You Scored:';
    scoreDisplay.textContent = `${score} out of 3`;
    if (score === 3) {
        let greatJobMessage = document.createElement('p'); // Create a paragraph element
        greatJobMessage.id = 'greatJobMessage';
        greatJobMessage.textContent = 'Congrats! A dollar worth of Bitcoin will be sent to your account!';
        document.body.appendChild(greatJobMessage);

    } else {
        let greatJobMessage = document.createElement('p'); // Create a paragraph element
        greatJobMessage.id = 'greatJobMessage';
        greatJobMessage.textContent = 'Almost got it!';
        document.body.appendChild(greatJobMessage);
    }
});