const login_page = document.querySelector(".login_page");
const main_page = document.querySelector(".main_page");
const login_windows = document.querySelectorAll(".login_window");
const buttons = document.querySelectorAll(".close_button");
const [login_window_main, login_window_resister, login_window_sub] = login_windows;

// 시작부터 정의하는 온클릭
buttons.forEach((x) => (x.onclick = button_active));

// 로그인 페이지내에서 회원가입 창으로
login_window_main.querySelector(".button_l").addEventListener("click", function () {
    login_window_main.classList.replace("visible", "invisible");
    login_window_resister.classList.replace("invisible", "visible");
});
// 로그인 버튼
login_window_main.querySelector(".button_r").addEventListener("click", function () {
    login_page.classList.replace("active", "deactive");
    main_page.classList.replace("deactive", "active");
});

// 회원가입 창에서 로그인 페이지로
login_window_resister.querySelector(".button_l").addEventListener("click", function () {
    login_window_main.classList.replace("invisible", "visible");
    login_window_resister.classList.replace("visible", "invisible");
});

function is_valid_user_data(id, password) {
    // id는 최소 8글자 최대 14글자 영문과 숫자로만 구성
    //영어랑 숫자만 가능
    id = id.toLowerCase();
    function idcheck(str) {
        return /^[A-Za-z][A-Za-z0-9]*$.{8,14}/.test(str);
    }
    function passwordcheck(str) {
        return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,24}$/.test(str);
    }

    if (id !== "guest") {
        return true;
    } else {
        return idcheck(id) && passwordcheck(password);
    }
}

// 메인창에 대한 코드

function button_active(event) {
    let phdr = event.target.parentElement;
    console.log(phdr.style.height);
    setTimeout(
        function move(i) {
            if (i < 450) {
                phdr.style.height = `${5 + i / 10}%`;
            } else {
                phdr.style.height = `${5 + i / 10 > 99.5 ? 99.0 : 5 + i / 10}%`;
                event.target.style.transform = `rotatex(${(90 / 500) * (i - 450)}deg)`;
            }

            if (i < 950) {
                setTimeout(move, 10, i + 1);
            } else {
                fadein(phdr.parentElement);
                console.log(i);
            }
        },
        10,
        0
    );
}

function fadein(pnode) {
    let x = pnode.children[0],
        y = pnode.children[1];
    console.log(x, y);
    y.classList.replace("deactive", "active");
    x.classList.replace("active", "deactive");
    let n = y.childElementCount;
    if (n > 0) {
        for (let i of y.children) {
            i.style.opacity = 0;
        }

        setTimeout(
            function fadeout(i, target, tn) {
                target[tn].style.opacity = i / 1000;
                if (i < 1000) {
                    setTimeout(fadeout, 4, i + 1, target, tn);
                } else {
                    if (tn < n - 1) {
                        setTimeout(fadeout, 4, 0, target, tn + 1);
                    } else {
                        console.log(i);
                    }
                }
            },
            4,
            0,
            y.children,
            0
        );
    }
}

/// 제작하고 긁어온 페이드인과 윈도우 무빙 예제
// function nth(t, h) {
//     let c = h.children,
//         n = 0;
//     for (let i of c) {
//         if (t === i) {
//             break;
//         }
//         n += 1;
//     }
//     return n;
// }
