import App from "./src/App";
import Menu from "./src/Menu";

let IdApp = document.querySelector("#app");
//IdApp.innerHTML=Menu();

window.addEventListener("load", function () {
    $.get( "src/menu.html", function( data ) {
        IdApp.innerHTML=data;
        App();
        console.log( data );
    });
});