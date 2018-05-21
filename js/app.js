// Initialize on DOM loaded
document.addEventListener('DOMContentLoaded', fetchBookmarks);

// Listen for form submit
const form = document.querySelector('#myForm');
form.addEventListener('submit', saveBookmark);

// Save bookmark
function saveBookmark(evt) {

    // Fetch form values
    const siteName = document.querySelector('#site-name').value;
    const siteURL = document.querySelector('#site-url').value;

    if (!validateForm(siteName, siteURL)) {
        return false;
    }

    // Create object to submit to local storage
    const bookmark = {
        name: siteName,
        url: siteURL
    }

    // Check if bookmarks is null
    if (localStorage.getItem('bookmarks') === null) {
        // Init array
        let bookmarks = [];
        // Push bookmark object to the array
        bookmarks.push(bookmark);
        // Set to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // Fetch bookmark from local storage
        localStorage.getItem('bookmarks');
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Add bookmark object to array
        bookmarks.push(bookmark);
        // Set back to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    // Clear form
    document.querySelector('#myForm').reset();

    // Re-fetch bookmarks
    fetchBookmarks();

    // Prevent from submitting
    evt.preventDefault();
}

// Delete bookmark
function deleteBookmark(url) {
    // Get bookmarks from local storage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Loop through bookmarks
    const bookmarksLen = bookmarks.length;
    for (let i = 0; i < bookmarksLen; i++) {
        if (bookmarks[i].url === url) {
            // Remove from array
            bookmarks.splice(i, 1)
        }
    }
    // Set back to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    // Re-fetch bookmarks
    fetchBookmarks();
}

// Fetch bookmarks
function fetchBookmarks() {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    const bookmarksResult = document.querySelector('#bookmarks-result');

    // Show output
    bookmarksResult.innerHTML = '';
    const bookmarksLen = bookmarks.length;
    for (let i = 0; i < bookmarksLen; i++) {
        const name = bookmarks[i].name;
        const url = bookmarks[i].url;

        bookmarksResult.innerHTML = `<div class="well"> 
                                    <h3> ${name} 
                                    <a href=" ${url} " class="btn btn-default" target="_blank">Visit</a>
                                    <a onclick="deleteBookmark(\ ${url}' \)" href="#" class="btn btn-danger">Delete</a>
                                    </h3> 
                                    </div>`
    }
}

// Validate form
function validateForm(siteName, siteURL) {
    if (!siteName || !siteURL) {
        alert("Please fill in the forms");
        return false;
    }

    // Validate URLs
    const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    const regex = new RegExp(expression);

    if (siteURL.match(regex)) {
        alert("Please type a valid URL");
        return false;
    }
    return true;
}