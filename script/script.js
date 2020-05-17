'use strict';

//обработчик событий, который отслеживает загрузку контента
document.addEventListener('DOMContentLoaded', function () {

  const greeting__button = document.querySelector('.greeting__button');
  const modal = document.querySelector('.modal');
  const modalWrapper = document.querySelector('.modal__wrapper');
  const closeModal = document.querySelector('#closeModal');
  const questionsTitle = document.querySelector('#question');
  const formAnswers = document.querySelector('#formAnswers');
  const burgerBtn = document.querySelector('.burger-button');
  const btnPrev = document.getElementById('prev');
  const btnNext = document.getElementById('next');
  const btnSend = document.getElementById('send');

  //объект, который содержит вопрросы и ответы
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

  let count = -100;
  let interval;

  modalWrapper.style.top = `${count}%`;

  const animationModal = () => {
    modalWrapper.style.top = `${count}%`;
    count += 3;
    interval = requestAnimationFrame(animationModal);
    if (count >= 0) {
      cancelAnimationFrame(interval);
      count = -100;
    }
  };

  //начальное значение для бургер-меню (меняется при событии resize у объекта window)
  if (clientWidth < 768) {
    burgerBtn.classList.remove('visually-hidden');
  } else {
    burgerBtn.classList.add('visually-hidden');
  }

  //аналог медиа-заппроса, обработка события изменения размера окна браузера
  window.addEventListener('resize', function () {
    clientWidth = document.documentElement.clientWidth;
    if (clientWidth < 768) {
      burgerBtn.classList.remove('visually-hidden');
    } else {
      burgerBtn.classList.add('visually-hidden');
    }
  });

  //обработка клика на кнопку меню-бургер - открытие модального окна
  burgerBtn.addEventListener('click', function () {
    burgerBtn.classList.add('burger-button--active');
    modal.classList.add('modal--active');
    playTest();
  });

  //обработка клика на кнопку "Пройти тест и получить результат" - открытие модального окна
  greeting__button.addEventListener('click', () => {
    interval = requestAnimationFrame(animationModal, 5);
    modal.classList.add('modal--active');
    playTest();
  });

  //обработка клика на кнопку закрытия
  closeModal.addEventListener('click', () => {
    modal.classList.remove('modal--active');
    burgerBtn.classList.remove('burger-button--active');
  });


  //делигирование: вешаем на родителя и определяем поведение дочерних элементов
  modal.addEventListener('click', function (event) {
    if (!event.target.closest('.modal__wrapper')) {
      modal.classList.remove('modal--active');
      burgerBtn.classList.remove('burger-button--active');
    }
  });

  //вопросы квиза - функция запуска тестирования
  const playTest = () => {

    const finalAnswers = [];
    //переменная с номером вопроса
    let numberQuestion = 0;

    //рендер вариантов ответа
    const renderAnswers = (index) => {
      questions[index].answers.forEach(answer => {
          const answerItem = document.createElement('div');
          answerItem.classList.add('modal__answer-item');
          answerItem.insertAdjacentHTML('beforeend', `
            <input type="${questions[index].type}" id="${answer.title}" name="answer" class="modal__radio" value="${answerItem.title}">
            <label for="${answer.title}" class="modal__answer-title">
                <img class="modal__answer-image" src="${answer.url}" alt="burger">
                <span>${answer.title}</span>
            </label>
        `);
          formAnswers.appendChild(answerItem);
        }
      );

    };

    //рендер вопроса с вариантами ответа
    const renderQuestion = (indexQuestions) => {
      //очищает варианты ответа
      formAnswers.innerHTML = '';
      switch(numberQuestion){
        case 0:
          btnPrev.classList.add('visually-hidden');
          btnNext.classList.remove('visually-hidden');
          btnSend.classList.add('visually-hidden');
          questionsTitle.textContent = `${questions[indexQuestions].question}`;
          renderAnswers(indexQuestions);
          break;
        case questions.length:
          btnNext.classList.add('visually-hidden');
          btnPrev.classList.add('visually-hidden');
          btnSend.classList.remove('visually-hidden');
          questionsTitle.textContent = '';
          formAnswers.insertAdjacentHTML('beforeend', `
          <div class="modal__form-group">
            <label for="modal__phone">Введите ваш номер телефона:</label>
            <input type="phone" id="modal__phone" class="modal__phone">
          </div>
        `);
          break;
        case questions.length+1:
          formAnswers.textContent = 'Спасибо за пройденный тест!';
          setTimeout(() => {
            burgerBtn.classList.remove('burger-button--active');
            modal.classList.remove('modal--active')
          }, 2000);
          break;
        default:
          questionsTitle.textContent = `${questions[indexQuestions].question}`;
          renderAnswers(indexQuestions);
          btnPrev.classList.remove('visually-hidden');
          btnNext.classList.remove('visually-hidden');
          btnSend.classList.add('visually-hidden');

      }

      /* todo: вроде этот вариант более лаконичный
      questionsTitle.textContent = `${questions[indexQuestions].question}`;
      renderAnswers(indexQuestions);
      //блокиррование кнопок
      btnPrev.disabled = numberQuestion <= 0;
      btnNext.disabled = numberQuestion >= questions.length - 1;
      */
    };

    renderQuestion(numberQuestion);

    const checkAnswer = () => {
      const userValue = {};
      const inputs = [...formAnswers.elements].filter(input => input.checked || input.id === 'modal__phone');
      inputs.forEach((input, index) => {
        if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
          userValue[`${index}_${questions[numberQuestion].question}`] = input.value;
        }
        if (numberQuestion === questions.length) {
          userValue['Номер телефона'] = input.value;
        }
      });
      finalAnswers.push(userValue);
    };

    //обработчики на кнопки вперед и назад
    btnNext.onclick = () => {
      checkAnswer();
      numberQuestion++;
      renderQuestion(numberQuestion);
    };

    btnPrev.onclick = () => {
      numberQuestion--;
      renderQuestion(numberQuestion);
    };

    btnSend.onclick = () => {
      checkAnswer();
      numberQuestion++;
      renderQuestion(numberQuestion);
    }
  }


})
;

