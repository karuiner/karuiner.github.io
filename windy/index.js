const login_page = document.querySelector(".login_page");
const main_page = document.querySelector(".main_page");
const login_windows = document.querySelectorAll(".login_window");
const [login_window_main, login_window_resister, login_window_sub] = login_windows;

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
