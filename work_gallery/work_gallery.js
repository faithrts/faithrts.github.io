document.addEventListener("DOMContentLoaded", initGallery);

const galleryGrid = document.getElementById('gallery-grid')

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

        galleryData = data
        renderGallery(galleryData)
        // setupFiltering();

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
        card.className = 'gallery-item';

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