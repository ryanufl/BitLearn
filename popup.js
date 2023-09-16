document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("replaceButton").addEventListener("click", function () {
        document.getElementById("removeButton").disabled = false
        document.getElementById("replaceButton").disabled = true
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "replace_text" }, function (response) {
                if (chrome.runtime.lastError) {
                    console.log(chrome.runtime.lastError.message);
                } else {
                    console.log(response);
                }
            });
        });
    });

    document.getElementById("removeButton").addEventListener("click", function () {
        document.getElementById("removeButton").disabled = true
        document.getElementById("replaceButton").disabled = false
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "remove_text" }, function (response) {
                if (chrome.runtime.lastError) {
                    console.log(chrome.runtime.lastError.message);
                } else {
                    console.log(response);
                }
            });
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const bitcoinPrice = document.getElementById('bitcoinPrice');
    const tooltip = document.getElementById('tooltip');

    bitcoinPrice.addEventListener('mouseover', () => {
        // Customize tooltip content and position
        tooltip.textContent = "Bitcoin is a decentralized digital currency...";
        tooltip.style.display = 'block';
        tooltip.style.left = bitcoinPrice.offsetLeft + 'px'; // Adjust position as needed
        tooltip.style.top = (bitcoinPrice.offsetTop + bitcoinPrice.offsetHeight) + 'px'; // Adjust position as needed
    });

    bitcoinPrice.addEventListener('mouseout', () => {
        // Hide the tooltip
        tooltip.style.display = 'none';
    });

});
document.addEventListener("DOMContentLoaded", function() {
    // Check if the button with the original "quiz" ID exists on the page
    var button = document.getElementById("quiz");
  console.log("add event listener is running")
    if (button) {
        // Add a click event listener to the button
        button.addEventListener("click", function() {
            // Redirect to the quizquestions.html file
            window.location.href = "quizquestions.html";
        });
    }
  });
  document.addEventListener("DOMContentLoaded", function() {
    // Check if the button with the original "quiz" ID exists on the page
    var button = document.getElementById("submitbutton");
  console.log("add event listener is running")
    if (button) {
        // Add a click event listener to the button
        button.addEventListener("click", function() {
            // Redirect to the quizquestions.html file
            window.location.href = "results.html";
        });
    }
  });
  document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.getElementById('submitbutton');
  
    submitButton.addEventListener('click', function() {
      // Get the selected answers
      const answer1 = document.querySelector('input[name="q1"]:checked');
      const answer2 = document.querySelector('input[name="q2"]:checked');
      const answer3 = document.querySelector('input[name="q3"]:checked');
  
      if (answer1 && answer2 && answer3) {
        let answers = {
          q1: answer1.value,
          q2: answer2.value,
          q3: answer3.value,
        };
  
        // Store the answers in chrome.storage.sync
        chrome.storage.sync.set(answers, function() {
          console.log('Answers have been stored:', answers);
          alert('Answers have been stored.');
        });
      } else {
        // If not all questions are answered, redirect back to quizquestions.html
        alert('Please complete all quiz questions to recieve a score.');
        window.location.href = 'quizquestions.html';
      }
    });
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get(['q1', 'q2', 'q3'], function(answers) {
        const correctAnswers = {
            q1: 'b',
            q2: 'c',
            q3: 'a',
        };

        let score = 0;

        if (answers.q1 === correctAnswers.q1) {
            score++;
        }

        if (answers.q2 === correctAnswers.q2) {
            score++;
        }

        if (answers.q3 === correctAnswers.q3) {
            score++;
        }

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
});



  
  
  
  

