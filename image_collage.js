//var fs = require('fs');
//var images = fs.readdirSync('../assets/collage/');

// need to hardcode list as js running in browser cant run the above
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

/*
const image = "test_image.png"

const test = document.createElement("img");
test.setAttribute("src", image);
test.style.position = "absolute";
test.style.left = "500px";
test.style.top = "40px";
document.body.appendChild(test);
*/

let enableClickAdd = true;
let counter = 0;    // iterate through images in collageFiles
function placeImage(x, y) {
    let img = instantiateCollageItem(x, y);

    counter += 1;
    if (counter >= collageFiles.length) {
        counter = 0
    }

    img.addEventListener("dragstart", (e) => e.preventDefault());
    img.addEventListener("mousedown", selectCollageItem);
}

const hero = document.getElementById("hero")

// so we only add images on clicks, not drags
let heroMouseX;
let heroMouseY;
hero.addEventListener("mousedown", function (event) {
    heroMouseX = event.clientX;
    heroMouseY = event.clientY;
})
hero.addEventListener("mouseup", function(event) {
    let newMouseX = event.clientX;
    let newMouseY = event.clientY;

    //let timeDiff = new Date().getTime() - mousedownTime
    if (enableClickAdd && heroMouseX == newMouseX && heroMouseY == newMouseY) {
        // gets the bounding rectangle of hero div relative to viewport
        const rect = event.currentTarget.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // pageX is the x value of the click; pageY is the y value
        placeImage(x, y);
    }
});

// if we ever want to start with collage items
/*
const collage_items_list = document.querySelectorAll('.collage_image')
collage_items_list.forEach(function(cur_item) {
   pass
});
*/

function instantiateCollageItem(x, y) {
    const curImage = "../assets/collage/" + collageFiles[counter]

    // create a new image element and set it as the next element from the list
    const img = document.createElement("img")
    img.setAttribute("src", curImage)
    img.setAttribute("class", "collage_image")

    // x and y placement on the site
    img.style.left = x + "px";
    img.style.top = y + "px";

    // custom params
    img.startX = x;
    img.startY = y;

    img.style.transformOrigin = "top left";
    let rotate_val = Math.random() * 180 - 90; 
    img.style.transform = "scale(0.1) rotate(" + rotate_val + "deg) translate(-50%, -50%) ";

    // add to hero div
    hero.appendChild(img);

    return img
}

///////

let cur_item;
let collageMouseX;
let collageMouseY;
function selectCollageItem(event) {
    cur_item = event.currentTarget;

    if (cur_item.classList.contains("collage_image")) {
        enableClickAdd = false;

        collageMouseX = event.clientX;
        collageMouseY = event.clientY;

        document.addEventListener("mousemove", dragCollageItem);
        document.addEventListener("mouseup", dropCollageItem);
    }
}

function dragCollageItem(event) {
    if (cur_item.classList.contains("collage_image")){
        // custom params
        cur_item.startX = event.clientX;
        cur_item.startY = event.clientY;

        // placing collage_item
        cur_item.style.left = event.clientX + "px";
        cur_item.style.top = event.clientY + "px";
    }
}

function dropCollageItem(event) {
    let newMouseX = event.clientX;
    let newMouseY = event.clientY;

    // make sure this is a drag + drop, not just a click
    if (collageMouseX != newMouseX && collageMouseY != newMouseY) {
        enableClickAdd = true;
        document.removeEventListener('mousemove', dragCollageItem)
    }
}