window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();
//let isRecording = false;

// ----- 현재 브라우저에서 API 사용이 유효한가를 검증
function availabilityFunc() {
    //현재 SpeechRecognition을 지원하는 크롬 버전과 webkit 형태로 제공되는 버전이 있으므로 둘 중 해당하는 생성자를 호출한다.
    recognition = new webkitSpeechRecognition() || new SpeechRecognition();
    recognition.interimResults = true;
    recognition.continuous = true;
    //recognition.maxAlternatives = 10000;
    recognition.lang = "ko"; // 음성인식에 사용되고 반환될 언어를 설정한다.
    //recognition.maxAlternatives = 5; //음성 인식결과를 5개 까지 보여준다.

    if (!recognition) {
        alert("현재 브라우저는 사용이 불가능합니다.");
    }
}

/*let p = document.createElemenet('p');
p.textConent = "테스트";
document.querySelector('.words').appendChild(p);*/


// 음성인식 시작
/*function makeNewTextContent() {
    p = document.createElement('p');
    document.querySelector('.words').appendChild(p);
};*/

function makeNewSquare() {
    div = document.createElement('div');
    div.classList.add('square');
    document.querySelector('.words').appendChild(div);
};

function makeNewCircle() {
    div = document.createElement('div');
    div.classList.add('circle');
    document.querySelector('.words').appendChild(div);
};



let p = null;
let words = document.querySelector('.words');

recognition.start();

recognition.onstart = function () {
    console.log('인식 시작');
}

recognition.onend = function () {
    console.log('인식 종료');
    recognition.start();
}

recognition.onresult = function (e) {
    let texts = Array.from(e.results)
        .map(results => results[0].transcript).join("");
    console.log(texts);

    if (texts == '메모' | texts == '네모') {
        makeNewSquare();
    } else if (texts == '동그라미') {
        makeNewCircle();
    } else if (texts == '길게') {
        var lastchild = words.lastElementChild;
        var _height = lastchild.offsetHeight;
        words.lastElementChild.style.height = _height + 50 + 'px';
    } else if (texts == '좁게') {
        var lastchild = words.lastElementChild;
        var _width = lastchild.offsetWidth;
        words.lastElementChild.style.width = _width - 50 + 'px';
    }

    else {
        texts.replace(/아니|근데|진짜/gi, '🤬');
        p.textContent = texts;
    }
};


/*function start() {
    if (isRecording) {
        console.log("====종료====")
        isRecording = false;
        setTimeout(recognition.stop(), 1000);
        return;
    } else {
        isRecording = true;
        console.log("====시작====");
        recognition.start();
    }
}*/

/*
// --- 음성녹음을 실행하는 함수
function startRecord() {
    console.log("시작");

    // ⏺️클릭 시 음성인식을 시작한다.
    recognition.addEventListener("speechstart", () => {
        console.log("인식");
    });

    //음성인식이 끝까지 이루어지면 중단된다.
    recognition.addEventListener("speechend", () => {
        console.log("인식2");
    });

    //음성인식 결과를 반환
    // SpeechRecognitionResult 에 담겨서 반환된다.
    recognition.addEventListener("result", (e) => {
        searchConsole.value = e.results[0][0].transcript;
    });

    recognition.start();
}
//  🛑 클릭 시 종료(안 눌러도 음성인식은 알아서 종료됨)
function endRecord() {
    console.log("종료");
    recognition.stop(); // 음성인식을 중단하고 중단까지의 결과를 반환
}

window.addEventListener("load", availabilityFunc);
*/