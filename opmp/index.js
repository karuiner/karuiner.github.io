const page_el = document.querySelectorAll(".main");
const pages = [];
for (let i of page_el) {
    pages.push(i.classList[0]);
    i.onclick = turn_page;
}

function turn_page(event) {
    let pagenum = event.target.classList[0];
    let i = pages.indexOf(pagenum);
    i = i + 1 > pages.length - 1 ? 0 : i + 1;
    page_el[i].classList.add("active");
    event.target.classList.remove("active");
}
