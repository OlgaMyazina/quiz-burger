'use strict';

document.addEventListener('DOMContentLoaded', function () {

  const btnOpenModal = document.querySelector('#btnOpenModal');
  const modalBlock = document.querySelector('#modalBlock');
  const closeModal = document.querySelector('#closeModal');
  const questionsTitle = document.querySelector('#question');
  const formAnswers = document.querySelector('#formAnswers');
  const burgerBtn = document.getElementById('burger');
  const btnPrev = document.getElementById('prev');
  const btnNext = document.getElementById('next');

  const questions = [
    {
      question: "Какого цвета бургер?",
      answers: [
        {
          title: 'Стандарт',
          url: './image/burger.png'
        },
        {
          title: 'Черный',
          url: './image/burgerBlack.png'
        }
      ],
      type: 'radio'
    },
    {
      question: "Из какого мяса котлета?",
      answers: [
        {
          title: 'Курица',
          url: './image/chickenMeat.png'
        },
        {
          title: 'Говядина',
          url: './image/beefMeat.png'
        },
        {
          title: 'Свинина',
          url: './image/porkMeat.png'
        }
      ],
      type: 'radio'
    },
    {
      question: "Дополнительные ингредиенты?",
      answers: [
        {
          title: 'Помидор',
          url: './image/tomato.png'
        },
        {
          title: 'Огурец',
          url: './image/cucumber.png'
        },
        {
          title: 'Салат',
          url: './image/salad.png'
        },
        {
          title: 'Лук',
          url: './image/onion.png'
        }
      ],
      type: 'checkbox'
    },
    {
      question: "Добавить соус?",
      answers: [
        {
          title: 'Чесночный',
          url: './image/sauce1.png'
        },
        {
          title: 'Томатный',
          url: './image/sauce2.png'
        },
        {
          title: 'Горчичный',
          url: './image/sauce3.png'
        }
      ],
      type: 'radio'
    }
  ];

  let clientWidth = document.documentElement.clientWidth;

  //начальное значение для бургер-меню (меняется при событии resize у объекта window)
  if (clientWidth < 786) {
    burgerBtn.style.display = 'flex';
  } else {
    burgerBtn.style.display = 'none';
  }

  //аналог медиа-заппроса, обработка события изменения размера окна браузера
  window.addEventListener('resize', function () {
    clientWidth = document.documentElement.clientWidth;
    if (clientWidth < 768) {
      burgerBtn.style.display = 'flex';
    } else {
      burgerBtn.style.display = 'none';
    }
  });

  //обработка клика на кнопку меню-бургер
  burgerBtn.addEventListener('click', function () {
    burgerBtn.classList.add('active');
    modalBlock.classList.add('d-block');
    playTest();
  });

  //обработка клика на кнопку "Пройти тест и получить результат"
  btnOpenModal.addEventListener('click', () => {
    modalBlock.classList.add('d-block');
    playTest();
  });

  //обработка клика на кнопку закрытия
  closeModal.addEventListener('click', () => {
    modalBlock.classList.remove('d-block');
    burgerBtn.classList.remove('active');
  });


  //делигирование: вешаем на родителя и определяем поведение дочерних элементов
  document.addEventListener('click', function (event) {

    if ((!event.target.closest('.modal-dialog')) &&
      !event.target.closest('.open-modal-btn') &&
      !event.target.closest('.burger')) {
      modalBlock.classList.remove('d-block');
      burgerBtn.classList.remove('active');

    }
  });

  //вопросы квиза
  const playTest = () => {
    let numberQuestion = 0;

    //рендер вариантов ответа
    const renderAnswers = (index) => {
      questions[index].answers.forEach(answer => {
          const answerItem = document.createElement('div');
          answerItem.classList.add('answers-item', 'd-flex', 'flex-column');
          answerItem.insertAdjacentHTML('beforeend', `
            <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none">
            <label for="${answer.title}" class="d-flex flex-column justify-content-between">
                <img class="answerImg" src="${answer.url}" alt="burger">
                <span>${answer.title}</span>
            </label>
        `);
          formAnswers.appendChild(answerItem);
        }
      );

    };

    //рендер вопроса
    const renderQuestion = (indexQuestions) => {
      formAnswers.innerHTML = '';
      questionsTitle.textContent = `${questions[indexQuestions].question}`;
      renderAnswers(indexQuestions);
      //блокиррование кнопок
      btnPrev.disabled = numberQuestion <= 0;
      btnNext.disabled = numberQuestion >= questions.length - 1;
    };

    renderQuestion(numberQuestion);

    //кнопки вперед и назад
    btnNext.onclick = () => {
      numberQuestion++;
      renderQuestion(numberQuestion);
    };

    btnPrev.onclick = () => {
      numberQuestion--;
      renderQuestion(numberQuestion);
    };
  }

})
;

