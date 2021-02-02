const lists = document.querySelector(".main__lists");
const sample = document.querySelector(".main__lists--list-sample");
const add_button = document.querySelector(".main__add_button");
let checker = true,
    text = "",
    target;

add_button.addEventListener("click", function (event) {
    let check = "";
    let blank_list = sample.cloneNode(true);
    //    blank_list.children[0].textContent = "";
    if (checker) {
        blank_list.style = "z-index: 1;";
        lists.append(blank_list);
        let [text, tinput, fbutton] = (target = blank_list.children);
        text.style = "display:none;";
        tinput.style = "";
        fbutton.style.backgroundColor = "yellow";
        fbutton.setAttribute("onclick", "get_text();");
        checker = false;
    }
});

function get_text() {
    text = target[1].value;
    if (text.length > 0) {
        target[0].style = "";
        target[0].textContent = text;
        target[1].style = "display:none;";
        target[2].style.backgroundColor = "grey";
        target[2].removeAttribute("onclick", "get_text();");
        checker = true;
    }
}
