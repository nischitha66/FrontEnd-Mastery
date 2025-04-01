const questions = [
  {
    question: "What is the largest animal on the planet?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Blue Whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Giraffe", correct: false },
    ],
  },
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Paris", correct: true },
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "What is the largest planet in our solar system?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Jupiter", correct: true },
      { text: "Mars", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "Who is the founder of Microsoft?",
    answers: [
      { text: "Steve Jobs", correct: false },
      { text: "Bill Gates", correct: true },
      { text: "Elon Musk", correct: false },
      { text: "Mark Zuckerberg", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerElement = document.getElementById("answer-buttons");
const NextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  NextButton.innerHTML = "Next";
  showQustion();
}

function showQustion() {
  resetState();

  // Display question
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  // Display answers and options
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerElement.appendChild(button);
    button.dataset.correct = answer.correct; // Set the correct answer flag
    button.addEventListener("click", selectAnswer); // Add click event listener
  });
}

function resetState() {
  NextButton.style.display = "none";

  while (answerElement.firstChild) {
    answerElement.removeChild(answerElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  // Add the appropriate class based on whether the answer is correct or not
  if (isCorrect) {
    selectedButton.classList.add("correct"); // Add green styling for correct answers
    score++;
  } else {
    selectedButton.classList.add("incorrect"); // Add red styling for incorrect answers
  }

  // Disable all buttons after an answer is selected
  Array.from(answerElement.children).forEach((button) => {
    button.disabled = true; // Disable all buttons to prevent further clicks
    if (button.dataset.correct === "true") {
      button.classList.add("correct"); // Highlight the correct answer
    }
  });

  // Show the "Next" button to proceed to the next question
  NextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQustion();
  } else {
    showScore();
  }
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
  NextButton.innerHTML = "Play Again!";
  NextButton.style.display = "block";
}

NextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

// Start the quiz
startQuiz();
