const calculator = document.querySelector(".calculator");
const display = document.querySelector(".lower_moniter");
const display2 = document.querySelector(".upper_moniter");
const operator = document.querySelector(".operator");
const buttons = calculator.querySelector(".buttons");
const ac = document.querySelector(".clear");
const Rad_Button = document.querySelector("#Rad");
const Deg_Button = document.querySelector("#Deg");
let firstNum, num1, num2;
let intermediateOperator,
    previousKey,
    previousNum,
    input = [],
    save,
    pinput = [],
    acon = false,
    inv = false,
    answer = "0",
    isRadian = true,
    lastInput,
    isInvOff = true,
    displayOff = "display:none;";
const db = { operator: ["+", "-", "/", "X"], angle_function: ["sin", "cos", "tan", "asin", "acos", "atan"], angle: ["Rad", "Deg"], log_function: ["log", "ln", "inv_log", "inv_ln"] };
const inv_element = { on: ["#sin", "#cos", "#tan", "#log", "#ln", "#sqrt", "#Ans", "#power"], off: ["#asin", "#acos", "#atan", "#inv_log", "#inv_ln", "#inv_sqrt", "#Rnd", "#inv_power"] };
function get_em(x) {
    return document.querySelector(x);
}

function calculate(n1, operator, n2) {
    let result = 0,
        fn1 = parseFloat(n1),
        fn2 = parseFloat(n2);
    // TODO : n1과 n2를 operator에 따라 계산하는 함수를 만드세요.
    // ex) 입력값이 n1 : '1', operator : '+', n2 : '2' 인 경우, 3이 리턴됩니다.
    result = operator === "+" ? fn1 + fn2 : result;
    result = operator === "-" ? fn1 - fn2 : result;
    result = operator === "X" ? fn1 * fn2 : result;
    result = operator === "/" ? fn1 / fn2 : result;
    return String(result);
}
function cal_power(n1, operator, n2) {
    let result = 0,
        fn1 = parseFloat(n1),
        fn2 = parseFloat(n2);
    result = operator === "E" ? fn1 * Math.pow(10, fn2) : result;
    result = operator === "^" ? Math.pow(fn1, fn2) : result;

    return String(result);
}
function cal_percent(n1) {
    let fn1 = parseFloat(n1);
    return String(0.01 * fn1);
}

function qgauss(func, a, b) {
    const w = [0.2955242247, 0.2692667193, 0.2190863625, 0.1494513491, 0.0666713443];
    const x = [0.1488743389, 0.4333953941, 0.6794095682, 0.8650633666, 0.9739065285];
    let xm = 0.5 * (b + a);
    let xr = 0.5 * (b - a),
        ss = 0,
        dx = 0;
    for (let i = 0; i < x.length; i++) {
        dx = xr * x[i];
        ss += w[i] * (func(xm + dx) + func(xm - dx));
    }
    return xr * ss;
}

function gamma(z) {
    function inner_gamma(x) {
        const a = ((1 - x) / x) ** (z - 1);
        const b = Math.exp(-(1 - x) / x);
        const c = x ** 2;
        return (a * b) / c;
    }
    return qgauss(inner_gamma, 0, 1);
}

function simple_facto(x) {
    return x > 1 ? x * simple_facto(x - 1) : 1;
}

function factorial(x) {
    if (parseInt(x) === Number(x)) {
        return simple_facto(Number(x));
    } else {
        return gamma(Number(x) + 1);
    }
}

function new_Calculate(inp) {
    // 사칙 연산 우선 순위대로 계산하는 코드작성
    // 입력 inp는 arr을 가정
    //교환시 splice 활용
    let pI,
        mI,
        tI,
        dI,
        cI,
        cc = 0,
        cm = inp.length; // pulse index, minus index, times index, divide index
    if (inp.length === 1) {
        return inp;
    }

    while (inp.length > 1 && cc < cm) {
        pI = inp.indexOf("+");
        mI = inp.indexOf("-");
        tI = inp.indexOf("X");
        dI = inp.indexOf("/");
        eI = inp.indexOf("E");
        oI = inp.indexOf("^");
        pcI = inp.indexOf("%");
        fcI = inp.indexOf("!");
        if (pcI >= 0 || fcI >= 0) {
            cI = pcI < fcI ? (pcI >= 0 ? pcI : fcI) : fcI >= 0 ? fcI : pcI;
            num1 = inp[cI - 1];
            num2 = cI === pcI ? cal_percent(num1) : factorial(num1);
            inp.splice(cI - 1, 2, num2);
        } else if (eI >= 0 || oI >= 0) {
            cI = eI < oI ? (eI >= 0 ? eI : oI) : oI >= 0 ? oI : eI;
            [num1, intermediateOperator, num2] = inp.slice(cI - 1, cI + 2);
            inp.splice(cI - 1, 3, cal_power(num1, intermediateOperator, num2));
        } else if (tI >= 0 || dI >= 0) {
            cI = tI < dI ? (tI >= 0 ? tI : dI) : dI >= 0 ? dI : tI;
            [num1, intermediateOperator, num2] = inp.slice(cI - 1, cI + 2);
            inp.splice(cI - 1, 3, calculate(num1, intermediateOperator, num2));
        } else {
            cI = mI < pI ? (mI >= 0 ? mI : pI) : pI >= 0 ? pI : mI;
            [num1, intermediateOperator, num2] = inp.slice(cI - 1, cI + 2);
            inp.splice(cI - 1, 3, calculate(num1, intermediateOperator, num2));
        }
        cc++;
    }

    return cc < cm ? parseFloat(inp) : "error";
}

function angle_function(arr) {
    let identifier = arr[0].slice(0, arr[0].length - 1),
        in_Arr = arr.slice(1, arr.length - 1),
        ans;
    let angle_obj = { sin: Math.sin, cos: Math.cos, tan: Math.cos, asin: Math.asin, acos: Math.acos, atan: Math.acos };
    let toDeg = isRadian ? 1 : Math.PI / 180;
    ans = angle_obj[identifier](new_Calculate(in_Arr) * toDeg);
    return ans;
}
function tenpower(x) {
    return Math.pow(10, x);
}

function log_function(arr) {
    let identifier = arr[0].slice(0, arr[0].length - 1),
        in_Arr = arr.slice(1, arr.length - 1);
    let log_obj = { log: Math.log10, ln: Math.log, inv_log: tenpower, inv_ln: Math.exp };
    return log_obj[identifier](new_Calculate(in_Arr));
}

function sqrt_function(arr) {
    let identifier = arr[0].slice(0, arr[0].length - 1),
        in_Arr = arr.slice(1, arr.length - 1);
    return Math.sqrt(new_Calculate(in_Arr));
}

function main_Calculation(arr) {
    let ans = 0;
    let isString = arr[0].indexOf("(") >= 0,
        isParen = arr[0] === "(";

    if (isString && !isParen) {
        if (arr[0].indexOf("log") >= 0 || arr[0].indexOf("ln") >= 0) {
            ans = log_function(arr);
        } else if (arr[0].indexOf("sqrt") >= 0) {
            ans = sqrt_function(arr);
        } else {
            ans = angle_function(arr);
        }
    } else if (isParen) {
        in_Arr = arr.slice(1, arr.length - 1);
        ans = new_Calculate(in_Arr);
    } else {
        ans = new_Calculate(arr);
    }

    return String(ans);
}

function mk_Lmap(s) {
    let l = 0,
        lmap = [],
        ml = 0;
    for (let j of s) {
        if (j.indexOf("(") >= 0) {
            l += 1;
            lmap.push(l);
            ml = l > ml ? l : ml;
        } else if (j.indexOf(")") >= 0) {
            lmap.push(l);
            l -= 1;
        } else {
            lmap.push(l);
        }
    }
    return lmap;
}

function get_Level(arr, lmap, ml) {
    let i, j, k, v;
    for (let comb of lmap.entries()) {
        [k, v] = comb;
        if (v === ml) {
            i = i === undefined ? k : i;
            j = j === undefined ? k : k - j === 1 ? k : j;
        }
    }
    return [arr.slice(i, j + 1), [i, j]];
}

function put_Level(arr, lmap, index, v) {
    let [i, j] = index;
    arr.splice(i, j - i + 1, v);
    lmap.splice(i, j - i + 1, lmap[i] - 1);
    return [arr, lmap];
}

function string_Caculation_f(str_Arr) {
    let lmap = mk_Lmap(str_Arr); // 주어진 수식의 레벨 맵을 작성
    let ml = lmap.reduce((x, y) => (x > y ? x : y));
    let ps_Area, ps_Index, ps_Value; // ps: present_stage 현재 단계를 표현하기위한 약어
    while (ml >= 0) {
        [ps_Area, ps_Index] = get_Level(str_Arr, lmap, ml);
        console.log(ps_Area);
        ps_Value = main_Calculation(ps_Area);
        [str_Arr, lmap] = put_Level(str_Arr, lmap, ps_Index, ps_Value);
        ml = lmap.reduce((x, y) => (x > y ? x : y));
        console.log(ps_Area, ps_Value, str_Arr, ml);
    }

    return ps_Value;
}
function number_check(inp) {
    let l = inp.length;
    console.log(l, inp);
    if (l > 12) {
        let n = parseFloat(inp);
        if (Math.abs(n) > 1e12) {
            let order = -12;
            while (Math.abs(n * 10 ** order) >= 1) {
                order -= 1;
                console.log(order, Math.abs(n * 10 ** order));
            }
            order -= 1;
            n = n * 10 ** order;
            let a = n - (n % 1),
                b = n % 1,
                li = 7;
            ck = 0;
            b = b.toFixed(8);
            inp = `${a + parseFloat(b)}e${-order}`;
        } else if (Math.abs(n) < 1e-12) {
            let order = 12;
            while (Math.abs(n * 10 ** order) >= 1) {
                order += 1;
            }
            n = n * 10 ** (order - 1);
            inp = `${n.toFixed(8)}e-${order - 1}`;
        } else {
            let a = inp.indexOf(".") >= 0 ? inp.indexOf(".") : 0; // 소수 점 앞의 길이
            inp = parseFloat(inp).toFixed(12 - a);
        }
    }
    console.log(inp);
    return inp;
}

function total_Calculate(inp) {
    let rc = 0,
        lc = 0;
    let sinp = inp.join("");
    if (sinp.indexOf("(") >= 0) {
        rc = sinp.match(/[)]/gi) !== null ? sinp.match(/[)]/gi).length : 0;
        lc = sinp.match(/[(]/gi).length;
        if (rc < lc) {
            for (let k = 0; k < lc - rc; k++) {
                inp = inp.concat([")"]);
            }
        }
    }
    for (let i = 0; i < inp.length; i++) {
        if (inp[i].indexOf("(") >= 0 || inp[i].indexOf("Ans") >= 0) {
            if (!isNaN(inp[i - 1]) || inp[i - 1] === ")") {
                inp[i - 1] = `${inp[i - 1]} X`;
            }
        }
        if (inp.indexOf("PI") >= 0) {
            let i = inp.indexOf("PI");
            if (i < inp.length - 1) {
                if (!isNaN(inp[i + 1]) || inp[i + 1] === "e" || inp[i + 1] === "Ans" || inp[i + 1].indexOf("(") >= 0) {
                    inp[i] = `${Math.PI} X`;
                } else {
                    inp[i] = `${Math.PI}`;
                }
            } else {
                inp[i] = `${Math.PI}`;
            }
        }

        if (inp.indexOf("e") >= 0) {
            let i = inp.indexOf("e");
            if (i < inp.length - 1) {
                console.log(!isNaN(inp[i + 1]), inp[i + 1] === "Ans", inp[i + 1] === "e", inp[i + 1].indexOf("(") >= 0);
                if (!isNaN(inp[i + 1]) || inp[i + 1] === "Ans" || inp[i + 1] === "e" || inp[i + 1].indexOf("(") >= 0) {
                    inp[i] = `${Math.E} X`;
                } else {
                    inp[i] = `${Math.E}`;
                }
            } else {
                inp[i] = `${Math.E}`;
            }
            console.log(inp);
        }

        if (inp.indexOf("Ans") >= 0) {
            let i = inp.indexOf("Ans");
            if (i < inp.length - 1) {
                if (!isNaN(inp[i + 1]) || inp[i + 1] === "Ans" || inp[i + 1].indexOf("(") >= 0) {
                    inp[i] = `${Math.E} X`;
                } else {
                    inp[i] = `${Math.E}`;
                }
            } else {
                inp[i] = `${Math.E}`;
            }
        }
    }
    inp = [...inp.join(" ").split(" ")];
    for (let i = 0; i < inp.length - 1; i++) {
        if (!isNaN(inp[i]) && !isNaN(inp[i + 1])) {
            inp[i] += " X";
        }
    }
    inp = [...inp.join(" ").split(" ")];

    console.log(inp);
    inp = string_Caculation_f(inp);
    console.log(inp, isNaN(inp));
    if (isNaN(inp)) {
        inp = "Error";
    } else {
        inp = number_check(inp);
    }
    console.log(inp);
    return [inp];
}
function Inv_On() {
    for (let i of inv_element["on"]) {
        get_em(i).style = displayOff;
    }
    for (let i of inv_element["off"]) {
        get_em(i).style = "";
    }
    isInvOff = false;
}

function Inv_Off() {
    for (let i of inv_element["on"]) {
        get_em(i).style = "";
    }
    for (let i of inv_element["off"]) {
        get_em(i).style = displayOff;
    }
    isInvOff = true;
}
document.addEventListener("keydown", DoEvent);
buttons.addEventListener("click", DoEvent);
function DoEvent(event) {
    const type = event.type;
    const target = event.target; // 클릭된 HTML 엘리먼트의 정보가 저장되어 있습니다.
    const action = target.classList[0]; // 클릭된 HTML 엘리먼트에 클레스 정보를 가져옵니다.
    const id = target.id;
    const buttonContent = type === "click" ? target.textContent : event.key; // 클
    const db_id = { times: "X", minus: "-", plus: "+", divide: "/" };
    let lastIndex = input.length - 1 >= 0 ? input.length - 1 : 0;
    let isLogf = db["log_function"].includes(id);
    let isAnglef = db["angle_function"].includes(id);
    console.log(type, buttonContent, action);
    console.log(target.matches("button"));
    if (target.matches("button")) {
        if (action === "number" || !isNaN(buttonContent)) {
            if (input === [] || previousKey === "Enter") {
                input = [buttonContent];
            } else if ((!isNaN(input[lastIndex]) || input[lastIndex] === ".") && parseFloat(input[lastIndex]) !== 0) {
                input[lastIndex] += buttonContent;
            } else if (isNaN(input[lastIndex])) {
                // 이전에 입력 한 키에 따라 다른 결과를 나타내야한다.
                // Ans 값이 입력시 이후 숫자는 그것과 곱셉연산이 가능 해야한다.
                input = input.concat([buttonContent]);
            }
        }
        console.log(["+", "*", "/", "-", "X"].includes(buttonContent));
        if (action === "operator" || ["+", "*", "/", "-", "X"].includes(buttonContent)) {
            //연산자는 무엇으로 구분하는가. 이전 키를 키이름으로 입력을 받는다면 어떻게 처리할 것인가..

            if (input.length < 1) {
                input = [...["0", `${db_id[id]}`]];
            } else if (db["operator"].indexOf(db_id[id]) >= 0 && db["operator"].indexOf(input[lastIndex]) < 0 && input[lastIndex].indexOf("(") < 0) {
                input.push(db_id[id]);
            }
        }

        if (action === "fbutton" || buttonContent === "Enter") {
            if (isAnglef) {
                if (previousKey !== "Enter") {
                    input.push(`${id}(`);
                } else {
                    pinput = [...input];
                    input = [`${id}(`];
                }
                if (inv_element["off"].includes(`#${id}`)) {
                    Inv_Off();
                }
            }

            if (isLogf) {
                if (inv_element["off"].includes(`#${id}`)) {
                    if (previousKey !== "Enter") {
                        input = `#${id}` === "#inv_log" ? input.concat(["10", "^", "("]) : input.concat(["e", "^", "("]);
                    } else {
                        pinput = [...input];
                        input = `#${id}` === "#inv_log" ? ["10", "^", "("] : ["e", "^", "("];
                    }
                } else {
                    if (previousKey !== "Enter") {
                        input.push(`${id}(`);
                    } else {
                        pinput = [...input];
                        input = [`${id}(`];
                    }
                }
            }

            if (id.includes("sqrt")) {
                if (inv_element["off"].includes(`#${id}`)) {
                    if (input.length === 0) {
                        input = input.concat(["0", "^", "2"]);
                    } else {
                        input = input.concat(["^", "2"]);
                    }
                } else {
                    if (previousKey !== "Enter") {
                        input.push(`${id}(`);
                    } else {
                        pinput = [...input];
                        input = [`${id}(`];
                    }
                }
                if (inv_element["off"].includes(`#${id}`)) {
                    Inv_Off();
                }
            }

            if (db["angle"].includes(buttonContent)) {
                if (buttonContent === "Rad") {
                    isRadian = true;
                    Rad_Button.style.opacity = 1;
                    Deg_Button.style.opacity = 0.3;
                } else {
                    isRadian = false;
                    Rad_Button.style.opacity = 0.3;
                    Deg_Button.style.opacity = 1;
                }
            }
            if (buttonContent === "x!") {
                if (input.length > 0) {
                    input.push(`!`);
                }
            }
            if (buttonContent === "%") {
                if (input.length > 0) {
                    input.push(`${buttonContent}`);
                }
            }

            if (id === "pi") {
                input = input.length < 1 || previousKey === "Enter" ? input.concat("PI") : input.concat("PI");
            }

            if (buttonContent === "e") {
                input = input.length < 1 || previousKey === "Enter" ? input.concat("e") : input.concat("e");
            }

            if (buttonContent === "(") {
                input = input.length < 1 || previousKey === "Enter" ? input.concat(buttonContent) : input.concat("(");
            }

            if (buttonContent === "Inv") {
                if (isInvOff) {
                    Inv_On();
                } else {
                    Inv_Off();
                }
            }

            if (id === "Rnd") {
                if (input.length > 0) {
                    input.push(`${Math.random}`);
                } else {
                    input = input.concat(Math.random().toFixed(8));
                }
                Inv_Off();
            }

            if (buttonContent === ")") {
                let sinp = input.join("");
                let rc = sinp.match(/[)]/gi) !== null ? sinp.match(/[)]/gi).length : 0;
                let lc = sinp.match(/[(]/gi).length;
                if (rc < lc && !isNaN(input[lastIndex])) {
                    input.push(")");
                }
            }

            if (id === "power") {
                if (input.length === 0) {
                    input = input.concat(["0", "^", "("]);
                } else {
                    input = input.concat(["^", "("]);
                }
            }

            if (buttonContent === "EXP") {
                if (input.length > 0 && input[lastIndex] !== "0" && input.indexOf("E") < 0) {
                    input.push(`E`);
                }
            }

            // 개개 기능에 따라 가능한 동작을 정의해야한다.
        }

        if (action === "decimal") {
            // 점은 숫자와만 엮인다.
            if (input === []) {
                input[lastIndex] = buttonContent;
            } else if (input[lastIndex].indexOf(buttonContent) === -1 && !isNaN(input[lastIndex])) {
                input[lastIndex] += buttonContent;
            } else if (isNaN(input[lastIndex])) {
                input = input.concat([buttonContent]);
            }
        }
        if (action === "clear") {
            // 상황에 따라  다른 작동을 구현한다..
            if (acon) {
                pinput = [...input];
                input = [];
                ac.textContent = "CE";
                acon = false;
            } else {
                save = [...input];
                if (!isNaN(save[lastIndex]) && save[lastIndex].length > 1) {
                    save[lastIndex] = save[lastIndex].slice(0, -1);
                } else {
                    save = save.slice(0, -1);
                }
                input = save.length > 0 ? [...save] : [];
            }
        }

        if (action === "Enter") {
            pinput = [...input];
            answer = [...total_Calculate(input)];
            input = [...answer];
            console.log(pinput, answer, input);
            ac.textContent = "AC";
            acon = true;
        }
    }

    previousKey = id !== "" ? id : action;
    display2.textContent = pinput.join("");
    display.textContent = input.length < 1 ? "0" : input.join("");

    console.log(`End\n button : ${buttonContent}, First Num : ${firstNum},
     Operator : ${intermediateOperator}, Previous Num : ${previousNum}, 
     Previous Key : ${previousKey}, Display : ${display.textContent}, action : ${action}\n
     input : ${input}, pinput : ${pinput}`);
}
