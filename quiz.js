
document.addEventListener("DOMContentLoaded", function () {
    // Check if the button with the original "quiz" ID exists on the page
    var button = document.getElementById("submitbutton");
    console.log("add event listener is running")
    if (button) {
        // Add a click event listener to the button
        button.addEventListener("click", function () {
            // Redirect to the quizquestions.html file
            window.location.href = "results.html";
        });
    }
});
document.addEventListener('DOMContentLoaded', function () {
    const submitButton = document.getElementById('submitbutton');

    submitButton.addEventListener('click', function () {
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
            chrome.storage.sync.set(answers, function () {
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

