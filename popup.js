document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("bitcoin").addEventListener("click", function () {
        console.log("Bitcoin");
        document.getElementById("bitcoin").disabled = true
        document.getElementById("dollar").disabled = false
        document.getElementById("bitcoinDollar").disabled = false
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

    document.getElementById("dollar").addEventListener("click", function () {
        console.log("Dollar");
        document.getElementById("bitcoin").disabled = false
        document.getElementById("dollar").disabled = true
        document.getElementById("bitcoinDollar").disabled = false
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
    document.getElementById("bitcoinDollar").addEventListener("click", function () {
        console.log("Bitcoin and Dollar");
        document.getElementById("bitcoin").disabled = false
        document.getElementById("dollar").disabled = false
        document.getElementById("bitcoinDollar").disabled = true
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

//     const bitcoinPrice = document.getElementById('bitcoinPrice');
//     const tooltip = document.getElementById('tooltip');

//     bitcoinPrice.addEventListener('mouseover', () => {
//         // Customize tooltip content and position
//         tooltip.textContent = "Bitcoin is a decentralized digital currency...";
//         tooltip.style.display = 'block';
//         tooltip.style.left = bitcoinPrice.offsetLeft + 'px'; // Adjust position as needed
//         tooltip.style.top = (bitcoinPrice.offsetTop + bitcoinPrice.offsetHeight) + 'px'; // Adjust position as needed
//     });

//     bitcoinPrice.addEventListener('mouseout', () => {
//         // Hide the tooltip
//         tooltip.style.display = 'none';
//     });
    
// });


// const button = document.getElementById('bitcoin');

// button.addEventListener('click', function () {
//     button.classList.toggle('inverted');
});