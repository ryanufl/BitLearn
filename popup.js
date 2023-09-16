document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("bitcoinPrices").addEventListener("click", function () {
        document.getElementById("bitcoinPrices").disabled = true
        document.getElementById("dollarPrices").disabled = false
        document.getElementById("bothPrices").disabled = false
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

    document.getElementById("dollarPrices").addEventListener("click", function () {
        document.getElementById("bitcoinPrices").disabled = false
        document.getElementById("dollarPrices").disabled = true
        document.getElementById("bothPrices").disabled = false
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
        document.getElementById("bitcoinPrices").disabled = false
        document.getElementById("dollarPrices").disabled = false
        document.getElementById("bothPrices").disabled = true
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

const button = document.getElementById('bitcoin');

button.addEventListener('click', function () {
    button.classList.toggle('inverted');
});