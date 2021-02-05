const names = document.querySelectorAll(".name");
const fbutton = document.querySelector("#commentbutton");
const pnode = document.querySelector(".area3");
const input_name = document.querySelector(".input_name");
const input_comment = document.querySelector(".input_comment");
const send_button = document.querySelector("#sendbutton");
const reset = document.querySelector(".logo");
let total_data = [];
let nofilter = false;
send_button.onclick = add_new_tweet;
fbutton.onclick = back_filter;
reset.onclick = function () {
    localStorage.clear();
};
if ("previous_data" in localStorage) {
    total_data = JSON.parse(localStorage["previous_data"]);
    for (let i of total_data) {
        let ncmt = mkncomment(pnode);
        insert_data(ncmt, i);
    }
} else {
    for (let i of DATA) {
        total_data.push(i);
        let ncmt = mkncomment(pnode);
        insert_data(ncmt, i);
    }
    localStorage["previous_data"] = JSON.stringify(total_data);
    console.log("new data create");
}

function timeline(event) {
    let ncomments = document.querySelectorAll(".linecomment");
    let target = event.target,
        uname;
    for (let i of ncomments) {
        uname = i.getElementsByClassName("name")[0].textContent;
        if (uname !== target.textContent) {
            i.style.display = "none";
        }
    }
    nofilter = true;
    document.querySelector("#normal").style.display = "none";
    document.querySelector("#back").style.display = "inline";
}

function back_filter() {
    let ncomments = document.querySelectorAll(".linecomment");
    if (nofilter) {
        for (let i of ncomments) {
            i.style.display = "";
        }
        nofilter = false;
        document.querySelector("#normal").style.display = "inline";
        document.querySelector("#back").style.display = "none";
    } else {
        let ncmt = mkncomment();
        pnode.prepend(ncmt);
        let newdata = generateNewTweet();
        insert_data(ncmt, newdata);
        total_data.unshift(newdata);
        localStorage["previous_data"] = JSON.stringify(total_data);
        timecheck();
    }
}

function make(tag, pnode = undefined, classname = undefined) {
    let ntarget = document.createElement(tag);
    if (classname !== undefined) {
        ntarget.classList.add(classname);
    }
    if (pnode !== undefined) {
        pnode.append(ntarget);
    }
    return ntarget;
}

function mkncomment(pnode = undefined) {
    let box = make("div", pnode, "linecomment");
    let c1 = make("div", box, "nametime");
    let cn1 = make("span", c1, "name");
    cn1.onclick = timeline;
    let cn2 = make("span", c1, "time");
    let cn3 = make("span", c1, "dummy_time");
    cn3.style.display = "none";
    make("div", box, "comment");
    let c3 = make("div", box, "etc");
    let e1 = make("span", c3, "etc_count");
    make("button", e1, "reply");
    let e2 = make("span", c3, "etc_count");
    make("button", e2, "retweet");
    let e3 = make("span", c3, "etc_count");
    make("button", e3, "heart");
    make("span", c3, "etc_count");
    return box;
}

function timecheck() {
    let l = pnode.childElementCount;
    let times = pnode.getElementsByClassName("time");
    let d_times = pnode.getElementsByClassName("dummy_time");
    for (let i = 0; i < l; i++) {
        time = d_times[i].textContent;
        [nt, tu] = get_time_laps(time);
        times[i].textContent = `${nt} ${tu} 전`;
    }
}

function add_new_tweet(event) {
    let usr = input_name.value;
    let cmt = input_comment.value;

    if (usr.length > 0 && cmt.length > 0) {
        let nline = mkncomment();
        let time = new Date();
        let ndata = { user: usr, message: cmt, created_at: time };
        insert_data(nline, ndata);
        pnode.prepend(nline);
        // 시간 갱신
        timecheck();
        total_data.unshift(ndata);
        localStorage["previous_data"] = JSON.stringify(total_data);
    }
}

function insert_data(target, obj) {
    let user = obj.user,
        msg = obj.message,
        time = obj.created_at;
    target.getElementsByClassName("name")[0].textContent = user;
    target.getElementsByClassName("comment")[0].textContent = msg;
    let [nt, tu] = get_time_laps(time);
    target.getElementsByClassName("time")[0].textContent = `${nt} ${tu} 전`;
    target.getElementsByClassName("dummy_time")[0].textContent = time;
    let z = target.getElementsByClassName("etc_count");
    z[0].append("0");
    z[1].append("0");
    z[2].append("0");
}
function get_time_laps(time) {
    time = new Date(time);
    let time2 = new Date();
    let ts = ["ms", "s", "m", "h", "d", "mt", "yr"];
    let tn = { ms: 1000, s: 60, m: 60, h: 24, d: 30, mt: 12, yr: 10000 };
    let convert_words = { ms: "밀리초", s: "초", m: "분", h: "시간", d: "일", mt: "달", yr: "년" };
    let dt = time2 - time,
        k = 0;

    while (dt >= tn[ts[k]]) {
        dt /= tn[ts[k]];
        k += 1;
    }
    if (k === 0) {
        return [0, "초"];
    } else {
        return [parseInt(dt), convert_words[ts[k]]];
    }
}
