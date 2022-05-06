const option1 = document.querySelector('.option1'),
      option2 = document.querySelector('.option2'),
      option3 = document.querySelector('.option3'),
      option4 = document.querySelector('.option4');

const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question');
const numberOfQuestion = document.getElementById('number-of-question'),
      numberOfAllQuestion = document.getElementById('number-of-all-questions');

let indexOfQuestion,
    indexOfPage = 0; 

const answersTracker = document.getElementById('answers-tracker');
const btnNext = document.getElementById('btn-next');

let score = 0; // итоговый результат викторины

const coreAnswer = document.getElementById('correct-answer'),
      numberOfAllQuestion2 = document.getElementById('number-of-all-questions-2'),
      btnTryAgain = document.getElementById('btn-try-again');

const questions = [
    {
        question: 'Сколько в JavaScript способов создания переменных?',
        options: [
            '4',
            '3',
            '5',
            '2',
        ],
        rightAnswer: 1
    },
    {
        question: 'Чем в JavaScript является функция?',
        options: [
            'Объектом',
            'Последовательностью',
            'Строкой',
            'Массивом',
        ],
        rightAnswer: 0
    },
    {
        question: 'К какому типу относится значение null?',
        options: [
            'К символьному',
            'К строковому',
            'К логическому',
            'Ни к одному из перечисленных',
        ],
        rightAnswer: 3
    },
    {
        question: 'Что вернет код приведённый ниже? (typeof alert)',
        options: [
            'function',
            'object',
            'undefined',
            'number',
        ],
        rightAnswer: 0
    },
    {
        question: 'Как в JavaScript вычислить процент от числа?',
        options: [
            'Так в JavaScript нельзя делать',
            'Оператор : %',
            'Умножить на кол-во процентов и разделить на 100',
            'Вызвать метод findPrecent()',
        ],
        rightAnswer: 2
    },
    {
        question: 'К какому типу относится значение NaN? ',
        options: [
            'К числовому',
            'К строковому',
            'К логическому',
            'К целочисленному',
        ],
        rightAnswer: 0
    },
];

numberOfAllQuestion.innerHTML = questions.length; // выводим кол-во вопросов

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question;

    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1; // установка номера текущей страницы
    indexOfPage++;
};

let completedAnswers = []; // массив для уже заданных вопросов

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false; // якорь для проверки одинаковых вопросов

    if(indexOfPage == questions.length) {
        quizOver();
    } else {
        if(completedAnswers.length > 0) {
            completedAnswers.forEach(item => {
                if(item == randomNumber) {
                    hitDuplicate = true;
                }
            });
            if(hitDuplicate) {
                randomQuestion();
            } else {
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if(completedAnswers.length == 0) {
            indexOfQuestion = randomNumber;
            load();
        }
    }
    completedAnswers.push(indexOfQuestion);
};
const checkAnswer = el => {
    if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
        el.target.classList.add('correct');
        updateAnswertracker('correct');
        score++;
    } else {
        el.target.classList.add('wrong');
        updateAnswertracker('wrong');
    }
    disabledOptions();
};

const disabledOptions = () => {
    optionElements.forEach( item => {
        item.classList.add('disabled');
        if(item.dataset.id == questions[indexOfQuestion].rightAnswer) {
            item.classList.add('correct');
        }
    });
};

for(var option of optionElements) {
    option.addEventListener('click' , e => checkAnswer(e));
}

const enabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong');
    });
};

const answertracker = () => {
    questions.forEach(() => {
        const div =document.createElement('div');
        answersTracker.appendChild(div);
    });
};

const updateAnswertracker = status => {
      answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
};

const validate = () => {
    if(!optionElements[0].classList.contains('disabled')) {
        alert('Вам нужно выбрать один из вариантов ответов!');
    } else {
        randomQuestion();
        enabledOptions();
    }
};

const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    coreAnswer.innerHTML = score;
    numberOfAllQuestion2.innerHTML = questions.length;
};

const tryAgain = () => {
    window.location.reload();
};

btnTryAgain.addEventListener('click', () => {
    tryAgain();
});

btnNext.addEventListener('click', () => {
    validate();
});

window.addEventListener('load', () => {
    randomQuestion();
    answertracker();
});