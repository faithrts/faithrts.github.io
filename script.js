function toggleMenu() {
    // document: "to access any element in an HTML page, always start with document"
    // querySelector(): method that returns the first element in the document matching the selector
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");

  
    // Element.classList: returns a live collection of the class attributes
    //      of the elements
    // toggle(): if "open" is set remove it, otherwise add it in style.css
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

// on hover, bullets become pixel flowers
const exp_list_items = document.querySelectorAll('.experience-list-item')

// bullets.forEach((cur_bullet) => cur_bullet.addEventListener('mouseover', e)

exp_list_items.forEach(function(cur_item) {

    let cur_bullet_div = cur_item.querySelector('.fa-bullet');
    let cur_flower = cur_item.querySelector('.pixel-symbol-bullet');

    cur_item.addEventListener('mouseover', (e) => {
        cur_bullet_div.classList.toggle('hide-item');
        cur_flower.classList.toggle('hide-item');
    });

    cur_item.addEventListener('mouseout', (e) => {
        cur_bullet_div.classList.toggle('hide-item');
        cur_flower.classList.toggle('hide-item');
    });
});