//var fs = require('fs');
//var images = fs.readdirSync('../assets/collage/');

// hardcoding as js running in browser cant run the above
// to fetch filenames from folder
const collageFiles = [
  "053_arts_technology.png",
  "abstract_bark.png",
  "aluminum.png",
  "atrium.png",
  "b&w.png",
  "blue_drops.png",
  "blue_tiles.png",
  "body.png",
  "book_hole_2.png",
  "book_hole.png",
  "bookmark_chatracter.png",
  "bookmark_landscape.png",
  "cafeteria.png",
  "city_lights.png",
  "contents.png",
  "cubes_room.png",
  "cubic.png",
  "dream_learn_draw_think.png",
  "fne.png",
  "fuzz.png",
  "glass_wall.png",
  "gold_discs.png",
  "gold_network_chip.png",
  "green_globe.png",
  "horse.png",
  "ipod.png",
  "lillies.png",
  "lips.png",
  "mosaic.png",
  "network_sphere.png",
  "opus.png",
  "owl.png",
  "pearls_girls.png",
  "pharaoh.png",
  "polaroid.png",
  "rose.png",
  "sense.png",
  "silver_ball.png",
  "silver_chair.png",
  "snake.png",
  "stamps.png",
  "surface.png",
  "tiger.png",
  "vases.png"
];

/////// click + create image

// global variables
let enableClickAdd = true;  //
let counter = 0;            // iterate through images in collageFiles
const hero = document.getElementById("hero")
let heroStartMouseX;       
let heroStartMouseY;

// using mousedown + mouseup instead of click so we can
// differentiate between clicks and drags
hero.addEventListener("mousedown", function (event) {
    heroStartMouseX = event.clientX;
    heroStartMouseY = event.clientY;
})
hero.addEventListener("mouseup", function(event) {
    let newMouseX = event.clientX;
    let newMouseY = event.clientY;

    // if this is a click
    if (
        enableClickAdd && 
        heroStartMouseX == newMouseX && 
        heroStartMouseY == newMouseY
    ) {
        // gets the bounding rectangle of hero div relative to viewport
        const rect = event.currentTarget.getBoundingClientRect();

        // if user scrolls, (x,y) will stay relative to hero, not viewport
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;

        placeImage(x, y);
    }
});

function placeImage(x, y) {
    let img = instantiateCollageItem(x, y);

    counter += 1;
    if (counter >= collageFiles.length) {
        counter = 0
    }

    img.addEventListener("dragstart", (e) => e.preventDefault());
    img.addEventListener("mousedown", selectCollageItem);
}

// if we ever want to start with collage items on the page
/*
const collage_items_list = document.querySelectorAll('.collage_image')
collage_items_list.forEach(function(cur_img) {
   cur_img.addEventListener("")
});
*/

function instantiateCollageItem(x, y) {
    let png = "../assets/collage/" + collageFiles[counter]
    let img = document.createElement("img")
    img.setAttribute("src", png)
    img.setAttribute("class", "collage_image")

    // x and y placement on the site
    img.style.left = x + "px";
    img.style.top = y + "px";

    img.style.transformOrigin = "top left";
    let rotate_val = Math.random() * 180 - 90; 
    img.style.transform = "scale(0.1) rotate(" + rotate_val + "deg) translate(-50%, -50%) ";

    // add to hero div
    hero.appendChild(img);

    return img
}

/////// drag + drop image

// global variables
let cur_item;
let collageMouseX;
let collageMouseY;

function selectCollageItem(event) {
    cur_item = event.currentTarget;

    if (cur_item.classList.contains("collage_image")) {
        // stop click functionality once drag image initiated
        enableClickAdd = false;

        // where the mouse is, not necessarily where the image is
        collageMouseX = event.clientX;
        collageMouseY = event.clientY;

        startMouseX = event.clientX;
        startMouseY = event.clientY;

        document.addEventListener("mousemove", dragCollageItem);
        document.addEventListener("mouseup", dropCollageItem);
    }
}

function dragCollageItem(event) {
    if (cur_item.classList.contains("collage_image")){
        let diffX = collageMouseX - event.clientX;
        let diffY = collageMouseY - event.clientY;

        collageMouseX = event.clientX;
        collageMouseY = event.clientY;

        // the below results in always dragging + placing from middle of image
        // newX = event.clientX + "px";
        // newY = event.clientY + "px";
        newX = cur_item.offsetLeft - diffX;
        newY = cur_item.offsetTop - diffY;

        cur_item.style.left = newX + "px";
        cur_item.style.top = newY + "px";
    }
}

function dropCollageItem(event) {
    let newMouseX = event.clientX;
    let newMouseY = event.clientY;

    // this is a drag, not a simple click
    if (
        startMouseX != newMouseX && 
        startMouseY != newMouseY
    ) {
        // resume click to create img functionality
        enableClickAdd = true;

        // stop drag
        document.removeEventListener('mousemove', dragCollageItem)
    }
}