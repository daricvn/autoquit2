import { render } from "solid-js/web";

import "./index.css";
import "./transition.css";
import '@fortawesome/fontawesome-free/css/brands.min.css'
import '@fortawesome/fontawesome-free/css/solid.min.css'
import '@fortawesome/fontawesome-free/css/regular.min.css'
import '@fortawesome/fontawesome-free/css/fontawesome.min.css'
import App from "./App";

document.addEventListener('mousemove', (e)=>{
    if (!document.resizeTarget) return;
    // Determine how far the mouse has been moved
    let dx = 0;
    if (document.resizeRightToLeft)
        dx = document.resizeStartX - e.clientX;
    else 
        dx = e.clientX - document.resizeStartX;

    // Update the width of column
    const newWidth = document.resizeStartW + dx;
    document.resizeWidth = newWidth;
    document.resizeTarget.parentElement.style.width = newWidth + "px";
})
document.addEventListener('mouseup', (e)=>{
    if (!!document.resizeIndexCallback && document.resizeTarget && document.resizeWidth)
        document.resizeIndexCallback(document.resizeTarget.parentElement, document.resizeIndex, document.resizeWidth);
    document.resizeTarget = null
})

render(App, document.getElementById("root"));
