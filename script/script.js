'use strict';

document.addEventListener('DOMContentLoaded', function () {

  const btnOpenModal = document.querySelector('#btnOpenModal');
  const modalBlock = document.querySelector('#modalBlock');
  const closeModal = document.querySelector('#closeModal');
  const questionsTitle = document.querySelector('#question');
  const formAnswers = document.querySelector('#formAnswers');
  const burgerBtn = document.getElementById('burger');
  const modalWrap = document.querySelector('.modal');

  let clientWidth = document.documentElement.clientWidth;

  if (clientWidth < 786) {
    burgerBtn.style.display = 'flex';
  } else {
    burgerBtn.style.display = 'none';
  }

  window.addEventListener('resize', function () {
    clientWidth = document.documentElement.clientWidth;
    if (clientWidth < 768) {
      burgerBtn.style.display = 'flex';
    } else {
      burgerBtn.style.display = 'none';
    }
  });

  burgerBtn.addEventListener('click', function () {

    burgerBtn.classList.add('active');
    modalBlock.classList.add('d-block');
    playTest();
  });

  btnOpenModal.addEventListener('click', () => {
    modalBlock.classList.add('d-block');
    playTest();
  });

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

  const playTest = () => {
    const renderQuestion = () => {
      questionsTitle.textContent = 'Какого цвета бургер вы хотите?';
      const urlImage = "./image/burger.png";
      const urlImage2 = "./image/burgerBlack.png";

      formAnswers.innerHTML = `
             <div class="answers-item d-flex flex-column">
                <input type="radio" id="answerItem1" name="answer" class="d-none">
                <label for="answerItem1" class="d-flex flex-column justify-content-between">
                  <img class="answerImg" src=${urlImage} alt="burger">
                  <span>Стандарт</span>
                </label>
              </div>
              <div class="answers-item d-flex justify-content-center">
                <input type="radio" id="answerItem2" name="answer" class="d-none">
                <label for="answerItem2" class="d-flex flex-column justify-content-between">
                  <img class="answerImg" src=${urlImage2} alt="burger">
                  <span>Черный</span>
                </label>
              </div>
      `;
    };
    renderQuestion();
  }

});

