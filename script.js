// دالة لخلط الإجابات عشوائيًا
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// قراءة الأسئلة من ملف JSON
fetch("questions.json")
  .then((response) => response.json())
  .then((questions) => renderQuiz(questions));

// دالة لعرض الأسئلة
function renderQuiz(questions) {
  const quizContainer = document.getElementById("quiz-container");
  quizContainer.innerHTML = "";

  questions.forEach((q, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question-container");

    const questionText = document.createElement("p");
    questionText.classList.add("question");
    questionText.innerText = q.question;
    questionDiv.appendChild(questionText);

    // خلط الخيارات عشوائيًا
    const shuffledOptions = [...q.options];
    shuffleArray(shuffledOptions);

    shuffledOptions.forEach((option) => {
      const answerDiv = document.createElement("div");
      answerDiv.classList.add("answer");
      answerDiv.innerText = option;
      answerDiv.onclick = () => selectAnswer(answerDiv, q.answer, option);
      questionDiv.appendChild(answerDiv);
    });

    quizContainer.appendChild(questionDiv);
  });
}

function selectAnswer(answerDiv, correctAnswer, selectedAnswer) {
  // تعطيل النقر على الإجابات بعد اختيار أحدها
  const allAnswers = answerDiv.parentElement.querySelectorAll(".answer");
  allAnswers.forEach((ans) => {
    ans.style.pointerEvents = "none"; // تعطيل النقر
  });

  // تحديد ما إذا كانت الإجابة صحيحة أو خطأ بناءً على اللون
  if (selectedAnswer === correctAnswer) {
    answerDiv.classList.add("correct");
  } else {
    answerDiv.classList.add("incorrect");
  }
}
