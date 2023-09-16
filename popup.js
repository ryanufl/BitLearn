document.addEventListener("DOMContentLoaded", function () {
    const bitcoinPrice = document.getElementById('bitcoinPrice');
    const tooltip = document.getElementById('tooltip');
    var closeButton = document.getElementById('closeButton');
    var reportButton = document.getElementById('reportButton');
    var logoButton = document.getElementById('logoButton');

    logoButton.addEventListener('click', function() {
        var bitstopURL = 'https://bitstop.co/';
        chrome.tabs.create({url: bitstopURL});
        console.log("LOGO")
     });
    
    reportButton.addEventListener('click', function() {
        var reportFormURL = 'https://forms.gle/fZyhk7fVLRZAZB8A6';
        chrome.tabs.create({url: reportFormURL});
        console.log("REPORT")
     });

    closeButton.addEventListener('click', function() { window.close(); 
      //chrome.runtime.sendMessage({ action: 'closeExtension' });
      console.log("CLOSE")
    });

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