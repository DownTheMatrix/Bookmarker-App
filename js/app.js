// Listen for form submit
const form = document.querySelector('#myForm');

form.addEventListener('submit', saveBookmark);

// Save bookmark
function saveBookmark(evt) {

    // Fetch form values
    const siteName = document.querySelector('#site-name').value;
    const siteURL = document.querySelector('#site-url').value;

    // Create object to submit to local storage
    const bookmark = {
        name: siteName,
        url: siteURL
    }

    /* // Local storage test
    localStorage.setItem("test", "hello world");
    localStorage.getItem("test");
    localStorage.removeItem("test"); */

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
    // Prevent from submitting
    evt.preventDefault();
}

// Delete bookmark
function deleteBookmark(url) {
    // Get bookmarks from local storage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Loop through bookmarks
    for (let i = 0; i < bookmarksLen; i++) {
        if (bookmarks[i].url === url) {
            // Remove from array
            bookmarks.splice(i, 1)
        }
    }
    // Set back to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
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
                                    <a href=" ${url}" class="btn btn-default" target="_blank">Visit</a>
                                    <a onclick="deleteBookmark(\ ${url} \)" href="#" class="btn btn-danger">Delete</a>
                                    </h3> 
                                    </div>`
    }
}

document.addEventListener('DOMContentLoaded', fetchBookmarks);