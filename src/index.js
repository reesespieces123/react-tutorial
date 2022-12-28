// src/index.js

// 0. Import statements

import React from "react";
import ReactDOM from "react-dom";
import "./style.css";

// 1. Data array

let data = [
  {
    numSlide: 1,
    question: "What is CSS?",
    options: [
      { option: "Controlled Sporadic Spasms" },
      { option: "Critical Stylish Severity" },
      { option: "Cascading Style Sheets" },
    ],
    answer: "Cascading Style Sheets",
  },
  {
    numSlide: 2,
    question: "What is not a front-end  tool?",
    options: [
      { option: "Webpack" },
      { option: "Tortilla" },
      { option: "Gulp" },
    ],
    answer: "Tortilla",
  },
  {
    numSlide: 3,
    question: "What is an HTML tag for an ordered list?",
    options: [{ option: "<ol>" }, { option: "<list>" }, { option: "<ul>" }],
    answer: "<ol>",
  },
];

// 2. JavaScript functions

let correctAnswers = 0;

const showAnswer = (correctAnswer, userAnswer) => {
  let slide = document.querySelector(".slide.visible");
  let answerText = slide.getElementsByClassName("answer")[0];
  answerText.style.display = "none" ? "block" : "none";
  slide.getElementsByClassName("button")[0].style.display = "none"
    ? "block"
    : "none";
  let optionsItems = slide.getElementsByClassName("options-item");
  optionsItems.disabled = true;

  for (var i = 0; i < optionsItems.length; i++) {
    optionsItems[i].classList.add("disabled");
    if (optionsItems[i].innerText === correctAnswer) {
      optionsItems[i].classList.add("green");
    } else {
      optionsItems[i].classList.add("red");
    }
  }

  if (correctAnswer === userAnswer) {
    correctAnswers++;
    answerText.childNodes[0].innerHTML = "Correct,";
    answerText.classList.add("correct");
  } else {
    answerText.childNodes[0].innerHTML = "Incorrect, the correct answer is";
    answerText.classList.add("incorrect");
  }
};

const showNextSlide = (e) => {
  let slides = document.getElementsByClassName("slide");
  let visibleSlide = e.target.parentElement;

  for (var i = 0; i < slides.length; i++) {
    if (visibleSlide.nextSibling) {
      visibleSlide.classList.toggle("visible");
      visibleSlide.classList.add("invisible");
      visibleSlide.nextSibling.classList.remove("invisible");
      visibleSlide.nextSibling.classList.add("visible");
    } else {
      visibleSlide.classList.remove("visible");
      visibleSlide.classList.add("invisible");
      let result = document.getElementById("result");
      result.classList.remove("invisible");
      result.classList.add("visible");
      checkAnswers();
    }
  }
};

const checkAnswers = () => {
  let correctNum = parseInt((correctAnswers / data.length) * 100);
  let tip;
  if (correctNum <= 30) {
    tip = " Don't give up and learn JavaScript!";
  } else if (correctNum <= 50) {
    tip =
      " You can start your Junior Front-End Developer career at Dominos' Pizza!";
  } else if (correctNum <= 90) {
    tip = " Well done! You're better than average!";
  } else {
    tip = " Send your CV to Google right now!";
  }
  let result =
    "You've given <span>" + correctNum + "%</span> of correct answers." + tip;
  document.getElementById("summary").innerHTML = result;
};

// 3. React components

const Quiz = ({ numSlide, question, options, answer }) => (
  <div className={"slide " + (numSlide === 1 ? "visible" : "invisible")}>
    <p>
      Question {numSlide} out of {data.length}
    </p>
    <h2>{question}</h2>
    <ol className="options">
      {options.map((option, i) => (
        <li
          onClick={(e) => showAnswer(answer, option.option, e)}
          className="options-item"
          key={i}
        >
          <a href="#">{option.option}</a>
        </li>
      ))}
    </ol>
    <p className="answer">
      <span></span> {answer}
    </p>
    <button onClick={showNextSlide} className="button">
      Next
    </button>
  </div>
);

const Result = () => (
  <div className="last-slide">
    <h2 className="result-title">Your result:</h2>
    <p id="summary"></p>
  </div>
);

const Playfield = ({ title, quizes }) => (
  <article>
    <header>
      <h1>{title}</h1>
    </header>
    <section className="quizes">
      {quizes.map((quiz, i) => (
        <Quiz key={i} {...quiz} />
      ))}
    </section>
    <section id="result" className="invisible">
      <Result />
    </section>
  </article>
);

// 4. Rendering method

ReactDOM.render(
  <Playfield
    quizes={data}
    title="How good are you at front-end development?"
  />,
  document.getElementById("react-container")
);
