// Function to load and display the portfolio from localStorage
function loadPortfolio() {
    const portfolio = JSON.parse(localStorage.getItem('portfolio')) || [];

    // Get the list element where the portfolio will be displayed
    const portfolioList = document.getElementById('portfolioList');

    // Clear any existing portfolio items
    portfolioList.innerHTML = '';
    console.log('Loading portfolio...');

    // Check if the portfolio is empty
    if (portfolio.length === 0) {
        portfolioList.innerHTML = '<li>No investments found.</li>';
    } else {
        // Iterate over the portfolio and display each stock's info
        portfolio.forEach(item => {
            const totalValue = item.shares * item.price;

            // Create a list item for each stock
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <strong>${item.symbol}</strong>: $${item.price.toFixed(2)} per share, 
                ${item.shares} shares, 
                Total Value: $${totalValue.toFixed(2)}
            `;
            portfolioList.appendChild(listItem);
        });
    }
}

// Call the function to load the portfolio when the page is loaded
window.onload = function () {
    console.log('Investments page loaded');
    loadPortfolio();
  };
  