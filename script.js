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
const dropdownInput = document.getElementById('snapshot-dropdown');


function performSearch() {
    const searchQuery = document.getElementById('snapshots-search').value.toLowerCase();
    const filterValue = document.getElementById('snapshot-dropdown').value.toLowerCase();
    
    // Get all snapshot cards
    const cards = document.querySelectorAll('.snapshot-single');
    
    cards.forEach(card => {
        const title = card.querySelector('#snapshot-title').textContent.toLowerCase();
        const description = card.querySelectorAll('.snapshot-description div');
        const category = card.getAttribute('category').toLowerCase();

        let descMatch = false;
        
        // Check description divs
        description.forEach(desc => {
            const descContent = desc.textContent.toLowerCase();
            if (descContent.includes(searchQuery)) {
                descMatch = true;
            }
        });

        const searchMatch = title.includes(searchQuery) || descMatch;
        const filterMatch = filterValue === 'strategic direction' || category === filterValue;

        // Show the entire row if the main content or any sub-content matches the search and filter
        if (searchMatch && filterMatch) {
            card.style.display = '';  // Show the row
        } else {
            card.style.display = 'none';  // Hide the row if no match
        }
    });
}

// Event listener for clicking the search icon
document.getElementById('magnify-icon').addEventListener('click', performSearch);

// Trigger search when the Enter key is pressed inside the input field
searchInput.addEventListener('input', function(e) {
    performSearch();
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
    dropdownInput.value = 'strategic direction';
    resetSearch();
})

// Function to reset the search
function resetSearch() {
    const cards = document.querySelectorAll('.snapshot-single');
    cards.forEach(card => {
        card.style.display = '';  // Show all rows (reset state)
    });
}

// Dropdown logic -------------------------------------
dropdownInput.addEventListener('change', function() {
    performSearch();
})

dropdownInput.addEventListener("change", function() {
    if (dropdownInput.value !== "strategic direction") {
        // Change background color if a value is selected
        dropdownInput.style.border = "2px solid #00A4A6";  // You can change this color as per your requirement
    } else {
        // Reset background color if the default value is selected
        dropdownInput.style.border = "";
    }
});

