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

if ("text" in localStorage) {
    let color = localStorage["color"].split(",");
    let texts = localStorage["text"].split(",");
    let l = texts.length;
    console.log(localStorage["text"], l);
    let blank_list;
    for (let i = 0; i < l; i++) {
        blank_list = sample.cloneNode(true);
        lists.append(blank_list);
        blank_list.style.display = "";
        let text = blank_list.children[0],
            fbutton = blank_list.children[2];
        text.textContent = texts[i];
        fbutton.style.backgroundColor = color[i];
        if (color[i] === "red") {
            fbutton.textContent = board.children[1].textContent;
        }
        if (color[i] === "Green") {
            fbutton.textContent = board.children[0].textContent;
        }
        fbutton.onclick = bfunction;
    }
}

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
    console.log(target);
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
        local_add("text", text);
        local_add("color", "silver");
    }
}

function local_add(stname, input) {
    if (stname in localStorage) {
        let nitems = localStorage[stname].split(",").concat(input);
        localStorage[stname] = nitems.join(",");
    } else {
        localStorage[stname] = `${input}`;
    }
}

function local_replace(stname, input, n) {
    let data = localStorage[stname].split(",");
    data[n] = input;
    localStorage[stname] = data.join(",");
}

function local_remove(k) {
    let data = localStorage["text"].split(",");
    data.splice(k, 1);
    localStorage["text"] = data.join(",");
    data = localStorage["color"].split(",");
    data.splice(k, 1);
    localStorage["color"] = data.join(",");
    if (localStorage["color"].length === 0) {
        localStorage.clear();
    }
}

function nth(target) {
    console.log(target);
    let n = lists.childElementCount;
    let childs = lists.children,
        ans = 2;
    console.log(n, childs);
    for (let i = 2; i < n; i++) {
        console.log(i, childs[i] === target);
        if (childs[i] === target) {
            ans = i;
        }
    }
    return ans - 2;
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
    target.textContent = event.target.textContent;
    board.style.display = "none";
    let k = nth(target.parentNode);
    local_replace("color", "Green", k);
}

function fail_function(event) {
    target.style.backgroundColor = "red";
    target.textContent = event.target.textContent;
    board.style.display = "none";
    let k = nth(target.parentNode);
    local_replace("color", "red", k);
}

function remove_function(event) {
    let k = nth(target.parentNode);
    console.log(k);
    local_remove(k);
    target.parentNode.remove();
    board.style.display = "none";
}
