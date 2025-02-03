document.addEventListener("DOMContentLoaded", function () {
  const page = document.body.id;

  // ----- Page: index (Login) -----
  if (page === "page-index") {
    const loginForm = document.getElementById("login-form");
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();
      if (username === "Tancy" && password === "05072022") {
        window.location.href = "welcome.html";
      } else {
        alert("Incorrect credentials. Please try again.");
      }
    });
  }

  // ----- Page: welcome -----
  else if (page === "page-welcome") {
    document
      .getElementById("to-questions")
      .addEventListener("click", function () {
        window.location.href = "questions.html";
      });
  }

  // ----- Page: questions -----
  else if (page === "page-questions") {
    // Questions data: each question’s letter will eventually spell "WILLYOUBEMYVALENTINES"
    const questionsData = [
      { letter: "W", question: "What is one quality you love most in me?" },
      { letter: "I", question: "In what moment did you feel our love begin?" },
      { letter: "L", question: "List a memory that makes you smile when you think of us." },
      { letter: "L", question: "Love can be simple—what does love mean to you?" },
      { letter: "Y", question: "Why do you think we are meant for each other?" },
      { letter: "O", question: "Once upon a time, how did you first notice me?" },
      { letter: "U", question: "Under the stars, what dream do you cherish most?" },
      { letter: "B", question: "Believe in magic—what magical moment have we shared?" },
      { letter: "E", question: "Every heartbeat tells a story; what does mine say to you?" },
      { letter: "M", question: "Make a wish—what do you hope for our future?" },
      { letter: "Y", question: "Yearn for adventure—where would you like us to travel?" },
      { letter: "V", question: "Value our moments—what is your favorite time together?" },
      { letter: "A", question: "After every storm, what brings you comfort?" },
      { letter: "L", question: "Let’s dream—what is your wildest wish for us?" },
      { letter: "E", question: "Embrace the little things—what small act of love means a lot to you?" },
      { letter: "N", question: "Never give up—what keeps you going in tough times?" },
      { letter: "T", question: "Trust in us—how do you feel when we’re apart?" },
      { letter: "I", question: "Illuminate my world—what moment made you realize our bond?" },
      { letter: "N", question: "Nestle in my heart—what makes our connection unique?" },
      { letter: "E", question: "Eternity feels short with you—what do you dream our life to be?" },
      { letter: "S", question: "Sing to me—what song best describes our love?" },
    ];
    let currentQuestionIndex = 0;
    const container = document.getElementById("questions-container");
    const lettersDisplay = document.getElementById("letters-display");
    const finalPrompt = document.getElementById("final-prompt");

    function loadNextQuestion() {
      if (currentQuestionIndex < questionsData.length) {
        container.innerHTML = "";
        const qData = questionsData[currentQuestionIndex];
        const questionDiv = document.createElement("div");
        questionDiv.className = "question-block";
        const p = document.createElement("p");
        p.textContent = qData.question;
        questionDiv.appendChild(p);

        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Your answer...";
        questionDiv.appendChild(input);

        const btn = document.createElement("button");
        btn.textContent = "Next";
        questionDiv.appendChild(btn);

        container.appendChild(questionDiv);

        btn.addEventListener("click", function () {
          if (input.value.trim() === "") {
            alert("Please provide an answer.");
            return;
          }
          animateLetter(qData.letter);
          currentQuestionIndex++;
          setTimeout(loadNextQuestion, 600);
        });
      } else {
        container.innerHTML = "<p>All done!</p>";
        finalPrompt.classList.remove("hidden");
      }
    }
    loadNextQuestion();

    // Animate and append the letter for each answered question
    function animateLetter(letter) {
      const span = document.createElement("span");
      span.textContent = letter;
      span.classList.add("floating-letter");
      lettersDisplay.appendChild(span);
    }

    document.getElementById("yes-button").addEventListener("click", function () {
      window.location.href = "yes.html";
    });
    document.getElementById("no-button").addEventListener("click", function () {
      window.location.href = "no.html";
    });
  }

  // ----- Page: yes -----
  else if (page === "page-yes") {
    // Play "Adorn" audio and trigger confetti and heart animations.
    const audio = document.getElementById("adorn-audio");
    audio.play().catch((err) => console.log("Audio play error:", err));
    triggerConfetti();
  }

  // ----- Page: no -----
  else if (page === "page-no") {
    // When the user clicks "Yes" on the convince page, go to yes.html.
    document.getElementById("convince-yes").addEventListener("click", function () {
      window.location.href = "yes.html";
    });
    // When the user clicks "No", change to the final (sad) state.
    document.getElementById("convince-no").addEventListener("click", function () {
      document.getElementById("no-content").classList.add("hidden");
      const sadContent = document.getElementById("sad-content");
      sadContent.classList.remove("hidden");
      const audio = document.getElementById("johnredcorn-audio");
      audio.play().catch((err) => console.log("Audio play error:", err));
    });
  }

  // ----- Confetti & Heart Animations (used in page-yes) -----
  function triggerConfetti() {
    // Run confetti for 5 seconds.
    const duration = 5 * 1000;
    const end = Date.now() + duration;
    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
    triggerHearts();
  }

  function triggerHearts() {
    let count = 0;
    const heartInterval = setInterval(() => {
      createHeart();
      count++;
      if (count >= 6) clearInterval(heartInterval);
    }, 500);
  }

  function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = "-50px";
    heart.style.opacity = 1;
    document.body.appendChild(heart);
    setTimeout(() => {
      heart.remove();
    }, 4000);
  }
});
