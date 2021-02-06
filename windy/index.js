const login_page = document.querySelector(".login_page");
const login_windows = document.querySelectorAll(".login_window");
const [login_window_main, login_window_resister, login_window_sub] = login_windows;

login_window_main.querySelector(".button_l").addEventListener("click", function () {
    login_window_main.classList.replace("visible", "invisible");
    login_window_resister.classList.replace("invisible", "visible");
});

login_window_resister.querySelector(".button_l").addEventListener("click", function () {
    login_window_main.classList.replace("invisible", "visible");
    login_window_resister.classList.replace("visible", "invisible");
});
