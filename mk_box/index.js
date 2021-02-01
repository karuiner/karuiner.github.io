const create = document.querySelector("#create");
const remove = document.querySelector("#remove");
const container = document.querySelector(".container");

create.addEventListener("click", function (event) {
    const box = document.createElement("span");
    box.classList.add("box");
    container.appendChild(box);
});

remove.addEventListener("click", function (event) {
    if (container.children.length > 1) {
        container.removeChild(container.lastChild);
    }
});
