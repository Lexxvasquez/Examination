
start.onclick = () => {

  let qI = 0;
  let time = -3;
  
  let clockId = setInterval(()=> {
    time--;

    if(time<1) {
      clearInterval(clockId);
      time = 0;
    }
    
    clock.innerText = time;
  },1000)

  const handleAns = answer => {
    if(answer!= questions[qI].C) time = time-10;
    qI++;
    showQuestions();
  };

  const showQuestions = () => {

    let {Q,A,C} = questions[qI];
    main.innerHTML = `<h1>${Q}</h1><div id='answers'></>`;
    
    A.forEach(ans => {
      answers.innerHTML += `<button onclick="handleAns('${ans}')">${ans}</button>`;
    });
  };

  showQuestions();

}