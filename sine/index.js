const main = document.querySelector(".image_area");

let start,
    check = 0,
    target_list = [],
    lastcreate = 0;
zorder = -1;

function get_rgb_random_color() {
    return Math.floor(Math.random() * 16777215).toString(16);
}
function mk_cicle(timestamp) {
    if (lastcreate === 0 || timestamp - lastcreate > 500) {
        let target = document.createElement("div");
        target.classList.add("circle");
        target.style.borderColor = "#" + get_rgb_random_color();
        // 랜덤 반경 추가
        maxr = 10 + Math.random() * 60;
        extra = (2 - Math.random()) * 15;
        target.style.height = "0px";
        target.style.width = "0px";
        target.style.position = "fixed";
        // target.style.zIndex = zorder;
        // zorder -= 1;
        main.append(target);
        target_list.push([target, timestamp, extra, maxr]);
        lastcreate = timestamp;
    }
}

function mvsine(timestamp) {
    for (let i of target_list) {
        [target, birthtime, extra, maxr] = i;
        x = ((timestamp - (birthtime - start)) % 20000) / 20000;
        y = 70 + 20 * Math.sin(2 * Math.PI * x) - extra - 10 + 10 * x;
        if (x <= 0.1 || x >= 0.9) {
            cr = x <= 0.1 ? x * 10 : (1.0 - x) * 10;
            cr = cr >= 0 ? cr : 0;

            if (x <= 0.1) {
                target.style.opacity = cr;
            } else {
                target.style.opacity = cr;
            }
            target.style.height = `${cr * maxr}px`;
            target.style.width = `${cr * maxr}px`;
        } else {
            target.style.height = `${maxr}px`;
            target.style.width = `${maxr}px`;
        }

        if (x > 0.05 && target.style.diplay === "none") {
            target.style.diplay = "";
        } else if (x > 0.95 && target.style.diplay === "") {
            target.style.diplay = "none";
        }

        if (x >= 0.05 || x <= 0.95) {
            target.style.setProperty("transform", "translate(" + x * 100 + "vw," + y + "vh)");
        }
    }
}

function frame(timestamp) {
    if (start === undefined) start = timestamp;
    let l = main.childElementCount;
    if (l < 50) {
        mk_cicle(timestamp);
    }
    mvsine(timestamp);

    // if (timestamp - start > check) {
    //     console.log((timestamp - start) / 1000, timestamp, lastcreate);
    //     check += 10000;
    // }

    window.requestAnimationFrame(frame);
}

window.requestAnimationFrame(frame);
