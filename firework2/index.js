let pa = document.querySelector(".page_A");
let canvas = document.querySelector(".canvas");
let present,
    start,
    lastfire,
    lct = 0,
    target_list = [],
    a0 = 4,
    mote_list = [];
color_set = ["color1", "color2", "color3", "color4", "color5", "color6", "color7", "color8"];

function mk_ball() {
    let ball = document.createElement("div");
    ball.classList.add("ball", color_pick());
    ball.style.position = "fixed";
    ball.style.top = "100vh";
    ball.style.left = "0vw";
    //    ball.style.background = color_pick();
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
            // if (target.style.transition === "") {
            //     target.style.transition = "All 0.02s";
            // }
            target.style.transform = `translate(${nx}px,${ny}vh )`;
        } else {
            target.style.background = "black";
            return make_inner_bomb(target, ptime);
        }
    };
}

function gaussian(x) {
    return Math.exp(-0.5 * x ** 2) / Math.sqrt(Math.Pi * 2);
}

function gaudiv() {
    let rany = 1,
        x,
        candi = 0;
    while (candi < rany) {
        rany = Math.random() * gaussian(0);
        x = (Math.random() - 0.5) * 6;
        candi = gaussian(x);
    }
    return x;
}

function make_inner_bomb(pnode, stime) {
    let bomb_flag = [];

    for (let i = 0; i < 2000; i++) {
        let target = mk_mote(pnode),
            func;
        let v = 30,
            theta = Math.PI * Math.random(),
            // theta = Math.PI * gaudiv(),
            phi = 2 * Math.PI * (0.5 - Math.random());
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
    mote.classList.add("mote", color_pick());
    mote.style.position = "fixed";
    //    mote.style.background = color_pick();
    pnode.append(mote);
    return mote;
}

function input_motion_in_gravity(target, stime, v, theta, phi, check = false) {
    let vset = toxyz(v, theta, phi),
        opacity = 1;
    return function (time) {
        let t = (time - stime) / 1000,
            x = vset[1] * t,
            y = vset[2] * t + 0.5 * a0 * t ** 2;

        if (Math.random() > 0.5) {
            target.style.opacity = opacity;
        } else {
            target.style.opacity = 0.5 * opacity;
        }
        opacity = opacity * 0.98;
        target.style.transform = `translate(${x}px,${y}px )`;
        if (t > 5) {
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
