const body = document.querySelector(".main_work");

function get_rgb_random_color() {
    return Math.floor(Math.random() * 16777215).toString(16);
}
function mk_dot() {
    let ndot = document.createElement("div");
    ndot.classList.add("dot");
    ndot.style.backgroundColor = "#" + get_rgb_random_color();
    ndot.style.position = "absolute";
    ndot.style.top = "95%";
    ndot.style.borderRadius = "50%";
    ndot.style.left = `${20 + Math.random() * 60}%`;
    ndot.style.animationTimingFunction = "ease-out";
    let t = 3 + Math.random() * 3;
    ndot.style.animation = `move ${t}s ease-out`;
    ndot.style.transition = `top,left, ${t}s`;
    setTimeout(move_and_explosion, 1000, ndot, t);
    body.append(ndot);
}
function move_and_explosion(target, t) {
    k = target.style.left;
    k = k.split("%")[0];
    let x = (1 - 0.5 * Math.random()) * 2000,
        y = 10000 + Math.random() * 4000;

    target.style.transform = `translate(${x}%, ${-y}%)`;

    setTimeout(explosion, t * 1000, target);
}

function mk_fragment(target) {
    let n_frag = document.createElement("div");
    n_frag.classList.add("fragment");
    n_frag.style.background = "#" + get_rgb_random_color();
    n_frag.style.position = "absolute";
    n_frag.style.borderRadius = "50%";
    n_frag.style.animation = `5s ease-out fade`;
    n_frag.style.animationTimingFunction = "ease-out";
    n_frag.style.transition = "5s";
    let r = 100;
    let theta = Math.random() * 2 * Math.PI;
    let x = r * Math.cos(theta),
        y = r * Math.sin(theta);

    target.append(n_frag);
    setTimeout(explosion_move, 100, n_frag, x, y);
}

function explosion_move(target, x, y) {
    target.style.transform = `translate(${x}px, ${y}px)`;
}

function explosion(target) {
    for (let i = 0; i < 20; i++) {
        setTimeout(mk_fragment, 0, target);
    }
    target.style.transition = `0.1s`;
    target.style.backgroundColor = "white";
    setTimeout(dying_light, 5000, target);
}

function dying_light(target) {
    body.removeChild(target);
}

body.addEventListener("click", function (event) {
    setTimeout(mk_dot(), 0);
});
// 연습중

setTimeout(function repeat_work() {
    mk_dot();

    setTimeout(repeat_work, 5000);
}, 5000);
