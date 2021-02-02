const lists = document.querySelector(".main__lists");
const sample = document.querySelector(".main__lists--list-sample");
const add_button = document.querySelector(".main__add_button");
const board = document.querySelector(".selection_board");

let function_buttons = document.querySelectorAll(".main__lists--list--function_button");
let checker = true,
    text = "",
    target,
    max_list = false;

board.children[0].onclick = success_function;
board.children[1].onclick = fail_function;
board.children[2].onclick = remove_function;

add_button.addEventListener("click", function (event) {
    let check = "";
    let blank_list = sample.cloneNode(true);
    //    blank_list.children[0].textContent = "";
    if (checker && !max_list) {
        blank_list.style = "z-index: 1;";
        lists.append(blank_list);
        let [text, tinput, fbutton, tbutton] = (target = blank_list.children);
        text.style = "display:none;";
        tinput.style = "";
        fbutton.style = "display:none;";
        tbutton.style = "";
        // fbutton.style.backgroundColor = "yellow";
        // fbutton.setAttribute("onclick", "get_text();");
        checker = false;
    }
});

function get_text() {
    text = target[1].value;
    if (text.length > 0) {
        target[0].style = "";
        target[0].textContent = text;
        target[1].style = "display:none;";
        target[2].style = "";
        target[3].style = "display:none;";
        // target[2].style.backgroundColor = "grey";
        // target[2].removeAttribute("onclick", "get_text();");
        checker = true;
        if (lists.childElementCount - 2 >= 11) {
            max_list = true;
            add_button.style.backgroundColor = "red";
        }
        function_buttons = document.querySelectorAll(".main__lists--list--function_button");
        console.log(function_buttons);
        function_buttons[function_buttons.length - 1].onclick = bfunction;
    }
}

function bfunction(event) {
    target = event.target;
    let x = event.x,
        y = event.y;
    board.style.top = `${y - 25}px`;
    console.log(target, x, y);
    board.style.display = "";
}

function success_function(event) {
    target.style.backgroundColor = "Green";
    console.log(event, target);
    board.style.display = "none";
}

function fail_function(event) {
    target.style.backgroundColor = "red";
    console.log(event, target);
    board.style.display = "none";
}

function remove_function(event) {
    target.style.backgroundColor = "black";
    console.log(event, target);
    board.style.display = "none";
}
