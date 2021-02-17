const ball = document.querySelector(".ball");
const box = document.querySelector(".box");
let deg,
    power,
    sp = [0, 0],
    ep = [0, 0],
    start,
    present,
    mxx = box.offsetLeft,
    my = ball.offsetTop;
// 박스 크기를 실측해야한다.

//공의 위치는 공 박스의 왼쪽 상단이 기준점이다.

ball.addEventListener("drag", function (event) {}, false);

ball.addEventListener(
    "dragstart",
    function (event) {
        // 드래그한 요소에 대한 참조 변수
        console.log("start", event);
        // 요소를 반투명하게 함
        event.target.style.opacity = 0.5;
        sp = [event.target.offsetLeft + 12.5, event.target.offsetTop + 12.5];
        console.log(sp);
    },
    false
);

ball.addEventListener(
    "dragend",
    function (event) {
        // 투명도를 리셋
        console.log("end", event);
        event.target.style.opacity = "";
        ep = [event.clientX, event.clientY];
        [power, deg] = pcal(sp, ep);
        console.log(power, deg);
        move(event.target, power, deg);
    },
    false
);

function pcal(p1, p2) {
    let [px2, py2] = p2,
        [px1, py1] = p1;
    let deg = -180 * (Math.atan2(py2 - py1, px2 - px1) / Math.PI);
    deg = deg < 0 ? 360 + deg : deg;
    return [Math.sqrt((px2 - px1) ** 2 + (py2 - py1) ** 2), deg];
}

function move(target, power, deg) {
    let v = power,
        px,
        py;
    v = v < 0.1 ? 0 : v;
    let total_moving_length = 2 * power;
    total_moving_length = total_moving_length < 10 ? 0 : total_moving_length;
    if (v === 0) {
        return 0;
    } else {
        console.log(total_moving_length, v);
        t = total_moving_length / v;
    }
    let x = total_moving_length * Math.cos(deg * (Math.PI / 180)),
        y = total_moving_length * Math.sin(deg * (Math.PI / 180));
    target.style.transitionDuration = `${t}s`;
    target.style.transitionTimingFunction = "linear";
    let pp = target.style.transform;
    if (pp.length > 0) {
        [px, py] = pp.split("(")[1].split(" ");
        px = parseFloat(px.split("px")[0]);
        py = parseFloat(py.split("px")[0]);
    } else {
        px = 0;
        py = 0;
    }
    console.log(power, deg, px, py, x, y, t);
    x = px - x;
    y = py - y;
    x = x < -250 ? -250 : x;
    x = x > 225 ? 225 : x;
    y = y < -325 ? -325 : y;
    y = y > 350 ? 350 : y;

    target.style.transform = `translate( ${x}px, ${-y}px )`;
    return setTimeout(function () {}, t * 1000);
}
