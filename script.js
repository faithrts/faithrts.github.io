function toggleMenu() {
    // document: "to access any element in an HTML page, always start with document"
    // querySelector(): method that returns the first element in the document matching the selector
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");

  
    // Element.classList: returns a live collection of the class attributes
    //      of the elements
    // toggle(): if "open" is set remove it, otherwise add it
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}