// Define the regular expression for dollar values
var dollarValueRegex = /\$\d+(\.\d{2})?/g;

// Get the HTML content of the page
var pageContent = document.body.innerHTML;

// Replace every dollar value with itself plus " this is too much"
var newContent = pageContent.replace(dollarValueRegex, function(match) {
  return match + "ENTER BIT COIN PRICE HERE";
});

// Set the HTML content of the page
document.body.innerHTML = newContent;
