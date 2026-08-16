document.addEventListener("DOMContentLoaded", initGallery);
const galleryGrid = document.getElementById('work-gallery-grid')

let activeFilters = [];
let galleryData = [];   // raw JSON data

/*
function initGallery() {
    fetch('work_gallery.json')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            galleryData = data;
            renderGallery(galleryData);
            // setupFiltering();
        })
        .catch(function(error) {
            console.error('Error loading gallery data:', error);
        });
}
*/

async function initGallery() {
    try {
        // for ref: the path below is relative to the html file in which this script is called
        const response = await fetch('../work_gallery/work_gallery.json');  // browser connets to json file
        const data = await response.json();                                 // browser parses data in json file

        galleryData = data;
        renderGallery(galleryData);
        setupFiltering();

    }
    catch(error) {
        console.error('Error loading gallery data:', error);
    }
}


function renderGallery(itemsToRender) {
    if (!galleryGrid) return;   // just in case

    galleryGrid.innerHTML = ''; // clear previous items

    itemsToRender.forEach(function(item) {
        // wraper div
        const card = document.createElement('div');

        let tags_string = (item.tags).join(" ")
        card.className = `gallery-item ${tags_string}`;
        card.innerHTML = `
            <img src="../work_gallery/cards/${item.filename}" alt="${item.title}">
            <div class="gallery-item-content">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        `;

        galleryGrid.appendChild(card);
    });
}

// get all filter buttons + gallery items
function setupFiltering() {
    let filter_buttons = document.querySelectorAll(".btn-gallery-filter")
    let gallery_items = document.querySelectorAll(".gallery-item")

    filter_buttons.forEach(button => {
        button.addEventListener("click", () => {
            filter_buttons.forEach(button => {
                button.classList.remove("active")
            })

            button.classList.add("active")
            let cur_filter = button.dataset.filter

            gallery_items.forEach(item => {
                if (cur_filter == "all" || item.classList.contains(cur_filter)) {
                    item.classList.remove("hidden");
                }
                else {
                    item.classList.add("hidden");
                }
            })
        });
    });
}


// add listener -> when button clicked, remove active tags from other buttons and add it to clicked button
// get tag of clicked button
// cycle through all gallery items; if has tag or tag of clicked button == all, remove hidden class; otherwise add