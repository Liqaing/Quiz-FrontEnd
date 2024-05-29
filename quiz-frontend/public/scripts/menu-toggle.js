
document.addEventListener("DOMContentLoaded", () => {

    document.querySelector("#nav-menu-toggle").addEventListener("click", () => {
        const menu = document.querySelector("#navbar-menu");
    
        if (menu.classList.contains("hidden")) {
            menu.classList.remove("hidden")
            menu.classList.add("block");
        }
        else {
            menu.classList.remove("block")
            menu.classList.add("hidden");
        }
    })

});