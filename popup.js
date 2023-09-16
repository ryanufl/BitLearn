document.addEventListener("DOMContentLoaded", function () {
    const bitcoinPrice = document.getElementById('bitcoinPrice');
    const tooltip = document.getElementById('tooltip');
    var closeButton = document.getElementById('closeButton');
    var reportButton = document.getElementById('reportButton');
    var logoButton = document.getElementById('logoButton');

    // bitcoinPrice.addEventListener('mouseover', () => {
    //     // Customize tooltip content and position
    //     tooltip.textContent = "Bitcoin is a decentralized digital currency...";
    //     tooltip.style.display = 'block';
    //     tooltip.style.left = bitcoinPrice.offsetLeft + 'px'; // Adjust position as needed
    //     tooltip.style.top = (bitcoinPrice.offsetTop + bitcoinPrice.offsetHeight) + 'px'; // Adjust position as needed
    // });

    // bitcoinPrice.addEventListener('mouseout', () => {
    //     // Hide the tooltip
    //     tooltip.style.display = 'none';
    // });

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
});

const button = document.getElementById('bitcoin');

button.addEventListener('click', function () {
    button.classList.toggle('inverted');
});