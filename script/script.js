'use strict';

document.addEventListener('DOMContentLoaded', function () {

  const btnOpenModal = document.querySelector('#btnOpenModal');
  const modalBlock = document.querySelector('#modalBlock');
  const closeModal = document.querySelector('#closeModal');
  const questionsTitle = document.querySelector('#question');
  const formAnswers = document.querySelector('#formAnswers');

  btnOpenModal.addEventListener('click', () => {
    modalBlock.classList.add('d-block');
    playTest();
  });

  closeModal.addEventListener('click', () => {
    modalBlock.classList.remove('d-block');
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

