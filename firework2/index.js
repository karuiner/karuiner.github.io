let pa = document.querySelector(".page_A");
let canvas = document.querySelector(".canvas");
let present,
    start,
    lastfire,
    lct = 0,
    target_list = [],
    a0 = 4,
    mote_list = [];
color_set = ["red", "green", "yellow", "purple", "blue"];

function mk_ball() {
    let ball = document.createElement("div");
    ball.classList.add("ball");
    ball.style.position = "fixed";
    ball.style.top = "100vh";
    ball.style.left = "0vw";
    ball.style.background = color_pick();
    pa.append(ball);
    return ball;
}
// 기본 자료를 입력 받고 실행함수를 돌려주는 외장함수
function input_fire(target, stime) {
    let vx0 = 300,
        vy0 = -30;

    return function (ptime) {
        let t = (ptime - stime) / 1000,
            nx = vx0 * t,
            ny = vy0 * t + 0.5 * a0 * t ** 2;
        if (t < 3) {
            if (target.style.transition === "") {
                target.style.transition = "All 0.05s";
            }
            target.style.transform = `translate(${nx}px,${ny}vh )`;
        } else {
            target.style.background = "black";
            return make_inner_bomb(target, ptime);
        }
    };
}

function make_inner_bomb(pnode, stime) {
    let bomb_flag = [];

    for (let i = 0; i < 100; i++) {
        let target = mk_mote(pnode),
            func;
        let v = 30,
            theta = Math.PI * Math.random(),
            phi = 2 * Math.PI * Math.random();
        if (i === 0) {
            func = input_motion_in_gravity(target, stime, v, theta, phi, true);
        } else {
            func = input_motion_in_gravity(target, stime, v, theta, phi);
        }
        bomb_flag.push(func);
    }
    return function (ptime) {
        bomb_flag = bomb_flag.filter(function (x) {
            y = x(ptime);
            return y !== "end";
        });
        if (bomb_flag.length === 0) {
            return "end";
        }
    };
}

function color_pick() {
    let z = Math.random() * 5;
    z = z > 4 ? 4 : parseInt(z);
    return color_set[z];
}

function mk_mote(pnode = pa) {
    let mote = document.createElement("div");
    mote.classList.add("mote");
    mote.style.position = "fixed";
    mote.style.background = color_pick();
    pnode.append(mote);
    return mote;
}

function input_motion_in_gravity(target, stime, v, theta, phi, check = false) {
    let vset = toxyz(v, theta, phi);
    return function (time) {
        let t = (time - stime) / 1000,
            x = vset[1] * t,
            y = vset[2] * t + 0.5 * a0 * t ** 2;

        if (t < 4) {
            if (target.style.transition === "") {
                target.style.transition = "All 0.05s";
            }
            target.style.opacity = 0.2 + Math.random() * 0.7;
            target.style.transform = `translate(${x}px,${y}px )`;
        } else if (t < 12) {
            target.style.opacity = target.style.opacity > 0.2 ? target.style.opacity * 0.7 : 0;
            target.style.transform = `translate(${x}px,${y}px )`;
        } else {
            if (check) {
                target.parentElement.parentElement.removeChild(target.parentElement);
            }
            return "end";
        }
    };
}

function toxyz(r, theta, phi) {
    let x = r * Math.sin(theta) * Math.cos(phi),
        y = r * Math.sin(theta) * Math.sin(phi),
        z = r * Math.cos(theta);
    return [x, y, z];
}

function frame(timestamp) {
    if (start === undefined) start = timestamp;
    present = timestamp;

    // 대포알 발사 예제 1개씩 무한히
    if (pa.childElementCount < 1) {
        let target = mk_ball();
        target_list.push(input_fire(target, present));
    }
    target_list = target_list.map(function (x) {
        y = x(present);
        if (typeof y === "function") {
            return y;
        } else if (y !== "end") {
            return x;
        }
    });
    target_list = target_list.filter((x) => typeof x === "function");

    window.requestAnimationFrame(frame);
}

window.requestAnimationFrame(frame);
