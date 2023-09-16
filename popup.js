document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("replaceButton").addEventListener("click", function () {
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
