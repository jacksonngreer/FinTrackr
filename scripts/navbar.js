// navbar.js

// Load the navbar from navbar.html
fetch('navbar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('navbar').innerHTML = data;
        setActiveNavLink(); // Call to set the active link
    });

// Function to set the active class based on the current page
function setActiveNavLink() {
    const navItems = document.querySelectorAll('.nav-item a');
    const currentPage = window.location.pathname.split('/').pop(); // Get current page name

    navItems.forEach(item => {
        if (item.getAttribute('href') === currentPage) {
            item.classList.add('highlight'); // Add highlight class
        } else {
            item.classList.remove('highlight'); // Remove highlight class
        }
    });
}
