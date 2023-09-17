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
    return bitcoin;
}

// // Set the HTML content of the page
// document.body.innerHTML = newContent;

// Define the replacement strings
let searchString = /\$\d+(\.\d{2})?/g;
let bitPrice
let replacementString = ` (\u20BF${bitPrice})`

let priceState = 2   //0 = both prices shown, 1 = just BTC shown, 2 = just money shown
getCurrentBitcoinPrice().then((value) => {
    bitPrice = value
    replacementString = `${bitPrice}`
}).then((value) => {
    bitcoinAndMoney(document.documentElement, priceState)
})
console.log(bitPrice)



// Function to replace text in a given node
function bitcoinAndMoney(node, moneyState) {
    if (moneyState === 2) { // if just money shown, convert to BTC and add
        if (node.nodeType === Node.TEXT_NODE) {
            node.textContent = node.textContent.replace(searchString, function (match) { return match + "\n(\u20BF" + (parseFloat(match.slice(1)) / parseFloat(replacementString)).toFixed(7) + ")" });
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            // Recursively traverse child nodes of elements
            for (let i = 0; i < node.childNodes.length; i++) {
                bitcoinAndMoney(node.childNodes[i], moneyState);
            }
        }
    } else if (moneyState === 1) { //if just BTC shown, convert to money and add
        if (node.nodeType === Node.TEXT_NODE) {
            node.textContent = node.textContent.replace(/\(\u20BF\d+(\.\d*)?\)/g, function (match) { return "$" + (parseFloat(match.substring(2, match.length - 1)) * bitPrice).toFixed(2) + " " + match });
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            // Recursively traverse child nodes of elements
            for (let i = 0; i < node.childNodes.length; i++) {
                bitcoinAndMoney(node.childNodes[i], moneyState);
            }
        }
    }
    priceState = 0
}

// Function to remove bitcoin value in a given node
function justMoney(node, moneyState) {
    console.log("JUST MOENY    ", moneyState)
    if (moneyState === 0) { //if both are there remove just BTC
        if (node.nodeType === Node.TEXT_NODE) {
            node.textContent = node.textContent.replace(/\(\u20BF\d+(\.\d*)?\)/g, "");
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            // Recursively traverse child nodes of elements
            for (let i = 0; i < node.childNodes.length; i++) {
                justMoney(node.childNodes[i], moneyState);
            }
        }
    } else if (moneyState === 1) {//convert from BTC to money
        if (node.nodeType === Node.TEXT_NODE) {
            node.textContent = node.textContent.replace(/\(\u20BF\d+(\.\d*)?\)/g, function (match) { return "$" + (parseFloat(match.substring(2, match.length - 1)) * bitPrice).toFixed(2) });
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            // Recursively traverse child nodes of elements
            for (let i = 0; i < node.childNodes.length; i++) {
                justMoney(node.childNodes[i], moneyState);
            }
        }
    }
    priceState = 2
}

function justBitcoin(node, moneyState) {
    console.log("JUST BITCOIN    ", moneyState)
    if (moneyState === 0) { //if both are there remove just money
        if (node.nodeType === Node.TEXT_NODE) {
            node.textContent = node.textContent.replace(searchString, "");
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            // Recursively traverse child nodes of elements
            for (let i = 0; i < node.childNodes.length; i++) {
                justBitcoin(node.childNodes[i], moneyState);
            }
        }
    } else if (moneyState === 2) {//convert from money to BTC
        if (node.nodeType === Node.TEXT_NODE) {
            node.textContent = node.textContent.replace(searchString, function (match) { return "\n(\u20BF" + (parseFloat(match.slice(1)) / parseFloat(replacementString)).toFixed(7) + ")" });
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            // Recursively traverse child nodes of elements
            for (let i = 0; i < node.childNodes.length; i++) {
                justBitcoin(node.childNodes[i], moneyState);
            }
        }
    }
    priceState = 1
}


// Get the root node of the document (usually <html>)
let rootNode = document.documentElement;
// Start the replacement process
// replaceText(rootNode);

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "justBTC") {
        // Call the replaceText function when requested
        justBitcoin(document.documentElement, priceState);
    } else if (message.action === "justMoney") {
        justMoney(document.documentElement, priceState)
    } else if (message.action === "both") {
        bitcoinAndMoney(document.documentElement, priceState)
        console.log("STARTED")
    }
});