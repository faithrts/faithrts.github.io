//var fs = require('fs');
//var images = fs.readdirSync('../assets/collage/');

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

let counter = 0;

function placeImage(x, y) {
    const curImage = "../assets/collage/" + collageFiles[counter]

    // create a new image element and set it as the next element from the list
    const img = document.createElement("img")
    img.setAttribute("src", curImage)

    // x and y placement on the site
    img.style.position = "absolute";
    img.style.left = x + "px";
    img.style.top = y + "px";
    img.style.transform = "scale(0.1)";
    img.style.zIndex = "100";

    // add to html
    const hero = document.getElementById("hero")
    hero.appendChild(img)
    //document.body.appendChild(img)

    counter += 1;
    if (counter >= images.length) {
        counter = 0
    }
}

placeImage(-500, -50)