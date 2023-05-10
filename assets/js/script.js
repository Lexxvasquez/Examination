let qI = 0;
let time = 60;
const prompt = document.getElementById("alert");

const showQuestions = () => {
  let { Q, A, C } = questions[qI];
  main.innerHTML = `<h2>${Q}</h2><div id='answers'></h2>`;

  A.forEach((ans) => {
    answers.innerHTML += `<button onclick="handleAns('${ans}')">${ans}</button>`;
  });
};

start.onclick = () => {
  let clockId = setInterval(() => {
    time--;

    if (time < 1) {
      clearInterval(clockId);
      time = 0;
    }

    clock.innerText = time;
  }, 1000);

  showQuestions();
};

const handleAns = (answer) => {
  if (answer == questions[qI].C) {
    prompt.innerHTML = `
    <h1 style="color:blue;border-bottom:5px solid blue">
    Correct!!!
    </h1>`;
  } else {
    time = time - 10;
    prompt.innerHTML = `
      <h1 style="color:red;border-bottom:5px solid red">
        Incorrect!!!
      </h1>`;
  }

  setTimeout(() => (prompt.innerHTML = ""), 500);

  qI++;
  if (qI >= questions.length) return endQuiz();

  showQuestions();
};

function endQuiz() {
  main.innerHTML = `
    <h1>All Done!</h1>
    <p>Your final score is ${time}.<br>
      Enter initals: <input id="intials" /> <button onclick="handleInitals()">Submit</button> 
    </p>
  `;
}

async function handleInitals() {
  let store = (await localStorage.initials)
    ? JSON.parse(localStorage.initials)
    : [];
  store.push({ intials: intials.value, score: time });
  localStorage.initials = JSON.stringify(store);
  console.log(store);
}

// var userScores = [{
//   initials: "AL",
//   score: 100
// }, {
//   initials: "Peter",
//   score: 20
// }, {
//   initials: "John",
//   score: 0
// }]
// console.log("before sort", userScores)

// userScores.sort(function (previousEl, nextEl) {
//   if (previousEl.score < nextEl.score) {
//       return -1
//   } else {
//       return 1
//   }
// });

// console.log("after sort", userScores)
