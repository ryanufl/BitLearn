document.addEventListener("DOMContentLoaded", function () {


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

});
