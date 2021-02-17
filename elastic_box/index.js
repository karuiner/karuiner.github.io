const ball = document.querySelector(".ball");
const box = document.querySelector(".box");
let deg,
    power,
    sp = [0, 0],
    ep = [0, 0],
    start,
    present;
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
        sp = [event.clientX, event.clientY];
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
