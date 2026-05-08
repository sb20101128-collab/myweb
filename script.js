// 퀴즈 데이터
const quizzes = [
    {
        question: "대한민국 경찰청이 위치한 도시는?",
        options: ["서울", "부산", "대구", "인천"],
        answer: 0
    },
    {
        question: "경찰의 최고 계급은?",
        options: ["경정", "총경", "경찰청장", "경감"],
        answer: 2
    },
    {
        question: "경찰이 범죄 수사 시 필요한 영장을 발부하는 곳은?",
        options: ["검찰청", "법원", "경찰청", "대검찰청"],
        answer: 1
    },
    {
        question: "112는 어떤 신고 번호?",
        options: ["화재", "경찰", "해양사고", "의료"],
        answer: 1
    },
    {
        question: "경찰의 기본 복무 시간은?",
        options: ["6시간", "8시간", "10시간", "12시간"],
        answer: 1
    },
    {
        question: "대한민국 경찰의 역사는 언제부터 시작되었나?",
        options: ["1945년", "1948년", "1950년", "1960년"],
        answer: 1
    },
    {
        question: "경찰공무원이 되기 위한 시험은?",
        options: ["행정고시", "경찰공무원시험", "사법시험", "외교관시험"],
        answer: 1
    },
    {
        question: "경찰의 주요 임무가 아닌 것은?",
        options: ["범죄 수사", "교통 단속", "조세 징수", "질서 유지"],
        answer: 2
    },
    {
        question: "경찰 순경의 월급 수준은?",
        options: ["200만원대", "250만원대", "300만원대", "350만원대"],
        answer: 1
    },
    {
        question: "경찰청 산하의 기관이 아닌 것은?",
        options: ["경찰청", "경무관실", "국방부", "경찰학교"],
        answer: 2
    }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

// 게임 시작
function startGame() {
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;
    showQuizScreen();
    displayQuestion();
}

// 퀴즈 화면 보여주기
function showQuizScreen() {
    document.getElementById('start-screen').classList.remove('active');
    document.getElementById('quiz-screen').classList.add('active');
    document.getElementById('result-screen').classList.remove('active');
}

// 퀴즈 표시
function displayQuestion() {
    const quiz = quizzes[currentQuestion];
    document.getElementById('question-text').textContent = quiz.question;
    document.getElementById('current-question').textContent = currentQuestion + 1;
    document.getElementById('total-questions').textContent = quizzes.length;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    quiz.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.className = 'option';
        button.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(button);
    });
    
    selectedAnswer = null;
    document.getElementById('next-btn').disabled = true;
}

// 답 선택
function selectAnswer(index) {
    selectedAnswer = index;
    
    // 모든 옵션 버튼 업데이트
    const options = document.querySelectorAll('.option');
    options.forEach((option, i) => {
        option.classList.remove('selected', 'correct', 'incorrect');
        
        if (i === index) {
            option.classList.add('selected');
        }
    });
    
    document.getElementById('next-btn').disabled = false;
}

// 다음 문제
function nextQuestion() {
    const quiz = quizzes[currentQuestion];
    
    // 정답 체크
    const options = document.querySelectorAll('.option');
    if (selectedAnswer === quiz.answer) {
        score++;
        options[selectedAnswer].classList.remove('selected');
        options[selectedAnswer].classList.add('correct');
    } else {
        options[selectedAnswer].classList.remove('selected');
        options[selectedAnswer].classList.add('incorrect');
        options[quiz.answer].classList.add('correct');
    }
    
    document.getElementById('next-btn').disabled = true;
    
    // 다음 문제로 이동
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quizzes.length) {
            displayQuestion();
        } else {
            showResults();
        }
    }, 1500);
}

// 결과 화면 표시
function showResults() {
    document.getElementById('quiz-screen').classList.remove('active');
    document.getElementById('result-screen').classList.add('active');
    
    const percentage = Math.round((score / quizzes.length) * 100);
    document.getElementById('score-text').textContent = 
        `당신의 점수: ${score} / ${quizzes.length} (${percentage}%)`;
}

// 게임 다시 시작
function restartGame() {
    document.getElementById('result-screen').classList.remove('active');
    document.getElementById('start-screen').classList.add('active');
}