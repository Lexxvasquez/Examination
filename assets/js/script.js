let qI = 0;
let time = 60;
var userScore = 0;
const prompt = document.getElementById("alert");
let store = JSON.parse(localStorage.getItem("initials")) || [];

const showQuestions = () => {
  let { Q, A, C } = questions[qI];
  main.innerHTML = `<h2>${Q}</h2><div id='answers'></h2>`;

  A.forEach((ans) => {
    answers.innerHTML += `<button onclick="handleAns('${ans}','${C}')">${ans}</button>`;
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

const handleAns = (answer, C) => {
  console.log(C);
  if (answer === C) {
    userScore++;
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
    <p>Your final score is ${userScore}.<br>
      Enter initals: <input id="initials" /> <button onclick="handleInitals()">Submit</button> 
    </p>
  `;
}

const showScores = () => {
    main.innerHTML = `
    <h1>High Score</h1>
    <div id="scores"></div>
    <a href="/"><button>Go back</button></a>
    <button onclick="clearStore()">Clear High Score</button>
  `;

  store.forEach(obj => {
    scores.innerHTML+=`<p>${obj.initials} - ${obj.score}`
  });
}

async function handleInitals() {
  store.push({ initials: initials.value, score: userScore });
  localStorage.initials= JSON.stringify(store.sort((a,b)=>b.score-a.score));
  console.log(store);

 showScores();
}

const clearStore = () => {
  localStorage.clear();
  window.location.reload();
}

// async function handleInitals() {
//   console.log("handleInitials");
//   let store = (await localStorage.initials)
//     ? JSON.parse(localStorage.initials)
//     : [];
//   store.push({ initials: initials.value, score: time });
//   localStorage.initials = JSON.stringify(store);
//   console.log("store", store);
//   const savedScoresEl = store.map((score) => {
//     return `<p>Initials: ${score.initials}, Score: ${score.score}</p>`;
//   });
//   main.innerHTML = `
//     <h1>High Scores</h1>
//     ${savedScoresEl.join('')}
//   `;
// }

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
