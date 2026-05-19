// 퀴즈 데이터
const quizzes = [
    {
        question: "한국 경찰의 날은?",
        options: ["11월23일", "10월23일", "10월21일", "11월9일"],
        answer: 2
    },
    {
        question: "경찰이 범죄 수사 시 필요한 영장을 발부하는 곳은?",
        options: ["법원", "검찰청", "경찰청", "행정부"],
        answer: 0
    },
    {
        question: "목격자를 통해 범인이나 용의자의생김새를 그려 찾는 수사방식은?",
        options: ["자화상", "몽타주", "캐리커쳐", "프로파일링"],
        answer: 1
    },
    {
        question: "판결을 통해 범죄가 확정될 때까지 범인이라고 단정할 수 없다는 원칙은?",
        options: ["법정주의", "영장주의", "무죄추정의 원칙", "비례원칙"],
        answer: 2
    },
    {
        question: "국제범죄공조를 목적으로 설립된 국제 기구는?",
        options: ["WHO", "IMF", "인터폴(ICPO)", "UN"],
        answer: 2
    },
    {
        question: "음주운전 기준 중 면허정지 수준 혈중알코올 농도는?",
        options: ["0.01%이상", "0.03%이상", "0.08%이상", "0.10%이상"],
        answer: 1
    },
    {
        question: "범죄를 저질러도 형법으로 처벌받지 않는 연령은?",
        options: ["16세미만", "15세미만", "14세미만", "18세미만"],
        answer: 2
    },
    {
        question: "경찰 최고 계급은?",
        options: ["치안감", "치안정감", "경무관", "치안총감"],
        answer: 3
    },
    {
        question: "경찰이 범인을 체포할 떄 반드시 알려줘야 하는 것은?",
        options: ["이름", "미란다 원칙", "소속", "나이"],
        answer: 1
    },
    {
        question: "프로파일러의 역할로 가장 알맞은 것은?",
        options: ["교통신호 관리", "범죄자 처벌", "범죄자의 심리와 행동분석", "사이버 범죄 수사"],
        answer: 2
    },
    {
        question: "다음 중 특수폭행이 성립할 가능성이 가장 높은 상황은?",
        options: ["위험한 물건을 들고 때린 경우", "손으로 밀친 경우", "주먹으로 얼굴을 때린 경우", "머리를 때린 경우"],
        answer: 0
    },
    {
        question: "현재 우리나라 경찰 수는?",
        options: ["16만명", "14만명", "15만명", "13만명"],
        answer: 3
    },
    {
        question: "용인고의 학교전담 경찰관님은?",
        options: ["없다", "강명훈 경위님", "엄구란 경위님", "이상준 경사님"],
        answer: 1
    },
    {
        question: "지문, DNA 혈흔들을 분석하여 수사에 도움을 주는 경찰 조직은?",
        options: ["기동대", "정보경찰", "교통경찰", "과학 수사대"],
        answer: 3
    },
    {
        question: "경찰 조직이 존재하는 가장 큰 목적에 대한 설명으로 가장 적절한 것은?",
        options: ["범죄자 처벌을 위해", "사회질서를 유지하고 시민들의 안전을 보호하기 위해", "법 재정을 위해", "갈등을 강제로 해결하기 위해"],
        answer: 1
    },
        
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