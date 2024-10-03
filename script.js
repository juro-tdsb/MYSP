// Add event listeners to every snapshot card ---------------
const snapShotCards = document.querySelectorAll('.snapshot-single .snapshot-card-container');

snapShotCards.forEach(card => {
    card.addEventListener('click', () => {
        const details = card.nextElementSibling;
        if (details) {
            const currentDisplay = window.getComputedStyle(details).display;
            details.style.display = currentDisplay === 'none' ? 'flex' : 'none';
        }
    });
});


// Seachbar logic  ----------------------------------------
const searchInput = document.getElementById('snapshots-search');
const closeIcon = document.getElementById('close-icon');

function performSearch() {
    const searchQuery = document.getElementById('snapshots-search').value.toLowerCase();
    
    // Get all snapshot cards
    const cards = document.querySelectorAll('.snapshot-single');
    
    cards.forEach(card => {
        const title = card.querySelector('#snapshot-title').textContent.toLowerCase();
        const description = card.querySelectorAll('.snapshot-description div');
        let descMatch = false;
        
        // Check description divs
        description.forEach(desc => {
            const descContent = desc.textContent.toLowerCase();
            if (descContent.includes(searchQuery)) {
                descMatch = true;
            }
        });

        // Show the entire row if the main content or any sub-content matches the search
        if (title.includes(searchQuery) || descMatch) {
            card.style.display = '';  // Show the row
        } else {
            card.style.display = 'none';  // Hide the row if no match
        }
    });
}

// Event listener for clicking the search icon
document.getElementById('magnify-icon').addEventListener('click', performSearch);

// Trigger search when the Enter key is pressed inside the input field
searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        performSearch();
    }
});

// Show/hide the close icon based on input content
searchInput.addEventListener('input', function() {
    if (this.value.length > 0) {
        closeIcon.style.display = 'block';
    } else {
        closeIcon.style.display = 'none';
        resetSearch();
    }
})

closeIcon.addEventListener('click', function() {
    searchInput.value = '';
    closeIcon.style.display = 'none';
    resetSearch();
})

// Function to reset the search
function resetSearch() {
    const cards = document.querySelectorAll('.snapshot-single');
    cards.forEach(card => {
        card.style.display = '';  // Show all rows (reset state)
    });
}

// Favorite Button Logic ------------------------------
// document.getElementById('favorite-button').addEventListener('click', function() {
//     if (this.classList.contains('favorite-container')) {
//         this.classList.replace('favorite-container', 'favorite-container-clicked');
//         document.querySelector('#favorite-button-text').textContent = 'Added to favorites';

//     } else if (this.classList.contains('favorite-container-clicked')) {
//         this.classList.replace('favorite-container-clicked', 'favorite-container');
//         document.querySelector('#favorite-button-text').textContent = 'Add to favorites';
//     }
// })

document.querySelectorAll('.favorite-button').forEach(function(button) {
    button.addEventListener('click', function() {
        // Check if the button has the 'favorite-container' class
        if (button.firstElementChild.classList.contains('favorite-container')) {
            button.firstElementChild.classList.replace('favorite-container', 'favorite-container-clicked');
            button.firstElementChild.querySelector('#favorite-button-text').textContent = 'Added to favorites';

        // Check if the button has the 'favorite-container-clicked' class
        } else if (button.firstElementChild.classList.contains('favorite-container-clicked')) {
            button.firstElementChild.classList.replace('favorite-container-clicked', 'favorite-container');
            button.firstElementChild.querySelector('#favorite-button-text').textContent = 'Add to favorites';
        }
    });
});