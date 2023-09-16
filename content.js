async function getCurrentBitcoinPrice() {
    // Define the API endpoint URL
    const apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd';
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
getCurrentBitcoinPrice().then((value) => {
    bitPrice = value
    replacementString = `${bitPrice}`
}).then((value) =>{
    replaceText(document.documentElement)
})
console.log(bitPrice)



// Function to replace text in a given node
function replaceText(node) {
    if (node.nodeType === Node.TEXT_NODE) {
        node.textContent = node.textContent.replace(searchString, function (match) { return match + "\n(\u20BF" + (parseFloat(match.slice(1)) / parseFloat(replacementString)).toFixed(5) + ")" });
    } else if (node.nodeType === Node.ELEMENT_NODE) {
        // Recursively traverse child nodes of elements
        for (let i = 0; i < node.childNodes.length; i++) {
            replaceText(node.childNodes[i]);
        }
    }

}

// Function to remove bitcoin value in a given node
function removeText(node) {
    if (node.nodeType === Node.TEXT_NODE) {
        node.textContent = node.textContent.replace(/\(\u20BF\d+(\.\d*)?\)/g, "");
    } else if (node.nodeType === Node.ELEMENT_NODE) {
        // Recursively traverse child nodes of elements
        for (let i = 0; i < node.childNodes.length; i++) {
            removeText(node.childNodes[i]);
        }
    }
}


// Get the root node of the document (usually <html>)
let rootNode = document.documentElement;
// Start the replacement process
// replaceText(rootNode);

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "replace_text") {
        // Call the replaceText function when requested
        replaceText(document.documentElement);
    } else if (message.action === "remove_text") {
        removeText(document.documentElement)
    }else if (message.action === "add_bitcoin_prices"){
        replaceText(document.documentElement)
        console.log("STARTED")
    }
});