document.addEventListener("DOMContentLoaded", function () {
<<<<<<< HEAD


    async function getCurrentBitcoinPrice() {
        // Define the API endpoint URL
        const apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&precision=5';
        let bitcoin = -1
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            const price = data.bitcoin.usd;
            console.log(price);
            if (price !== undefined) {
                bitcoin = price;
            } else {
                bitcoin = -1;
            }
        } catch (error) {
            bitcoin = -2;
        }
        return bitcoin.toFixed(2);

    }
    (async () => {
        document.getElementById('livePrice').innerText = "$" + (await getCurrentBitcoinPrice())
    })()


    document.getElementById("bitcoinPrices").addEventListener("click", function () {
        console.log("ADDED EVENT LISTENER")
        // document.getElementById("bitcoinPrices").disabled = true
        // document.getElementById("dollarPrices").disabled = false
        // document.getElementById("bothPrices").disabled = false

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "justBTC" }, function (response) {
                if (chrome.runtime.lastError) {
                    console.log(chrome.runtime.lastError.message);
                } else {
                    console.log(response);
                }
            });
        });
    });

=======
>>>>>>> 15ba14f83e0c0870dba71d145124b96e9199e9b8
    const bitcoinPrice = document.getElementById('bitcoinPrice');
    const tooltip = document.getElementById('tooltip');
    var closeButton = document.getElementById('closeButton');
    var reportButton = document.getElementById('reportButton');
    var logoButton = document.getElementById('logoButton');

    logoButton.addEventListener('click', function () {
        var bitstopURL = 'https://bitstop.co/';
        chrome.tabs.create({ url: bitstopURL });
        console.log("LOGO")
    });

    reportButton.addEventListener('click', function () {
        var reportFormURL = 'https://forms.gle/fZyhk7fVLRZAZB8A6';
        chrome.tabs.create({ url: reportFormURL });
        console.log("REPORT")
    });

    closeButton.addEventListener('click', function () {
        window.close();
        //chrome.runtime.sendMessage({ action: 'closeExtension' });
        console.log("CLOSE")
    });
    document.getElementById("dollarPrices").addEventListener("click", function () {
        // document.getElementById("bitcoinPrices").disabled = false
        // document.getElementById("dollarPrices").disabled = true
        // document.getElementById("bothPrices").disabled = false
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "justMoney" }, function (response) {
                if (chrome.runtime.lastError) {
                    console.log(chrome.runtime.lastError.message);
                } else {
                    console.log(response);
                }
            });
        });
    });
    document.getElementById("bothPrices").addEventListener("click", function () {
        document.getElementById("bothPrices").setAttribute("background-color", "yellow")
        document.getElementById("bothPrices").setAttribute("position", "relative")
        // document.getElementById("bitcoinPrices").disabled = false
        // document.getElementById("dollarPrices").disabled = false
        // document.getElementById("bothPrices").disabled = true
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "both" }, function (response) {
                if (chrome.runtime.lastError) {
                    console.log(chrome.runtime.lastError.message);
                } else {
                    console.log(response);
                }
            });
        });
    });
<<<<<<< HEAD

});
=======


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


>>>>>>> 15ba14f83e0c0870dba71d145124b96e9199e9b8
