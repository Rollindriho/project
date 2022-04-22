const quiz = [
    { name: "Yvan",realName: "Beumo" },
    { name: "Alban",realName: "Tedom" },
    { name: "Carine",realName: "Ananga" },
    { name: "Arsene",realName: "Melly" },
    { name: "Adith",realName: "Kameni" },
    { name: "Enice",realName: "Ngammeu" },
  ];
// View Object
const view = {
  score: document.querySelector( '#score strong'),
  question: document.getElementById('question'),
  result: document.getElementById('result'),
  info: document.getElementById('info'),
  start: document.getElementById('start'),
  response: document.querySelector('#response'),
  render(target, content, attributes){
    for( const key in attributes){
      target.setAttribute(key, attributes[key])
    }
    target.innerHTML = content;
  },
  show(element) {
    element.style.display = 'block';
  },
  hide(element) {
    element.style.display = 'none';
  },
  resetForm(){
    this.response.answer.value = '';
    this.response.answer.focus();
  },
  setup(){
    this.show(this.question);
    this.show(this.response);
    this.show(this.result);
    this.hide(this.start);
    this.render(this.score, game.score);
    this.render(this.result, '');
    this.render(this.info, '');
    this.resetForm();
  },
  teardown(){
    this.hide(this.question);
    this.hide(this.response);
    this.show(this.start);
  }
};
const game= {
  start(quiz){
    this.score = 0;
    this.questions = [...quiz];
    view.setup();
    this.ask();
  },
  ask(name){
    if (this.questions.length > 0) {
      this.question = this.questions.pop();
      const question = ` Quel est le vrai nom de ${this.question.name} ?`;
      view.render(view.question, question);
    } else {
      this.gameOver();
    }
  },
  check(e){
    e.preventDefault();
    const response = view.response.answer.value;
    const answer = this.question.realName;
    if (response === answer) {
      console.log('the reult is:');
      view.render(view.result, `Exact!`, {'class': 'correct'});
      this.score++;
      view.render(view.score, this.score);
    } else {
      console.log('the else clause');
      console.log(view.result);
      view.render(view.result, `Faux! la bonne reponse etait ${answer}`, {'class':'wrong'} );

    }
    view.resetForm();
    this.ask();
  },
  gameOver(){
    view.render(view.info, `Game Over, vous avez eu: ${this.score} point${this.score !== 1? 's': ''}`);
    view.teardown();
  }
}

view.start.addEventListener('click', () => game.start(quiz), false );
view.response.addEventListener('submit', (e)=> game.check(e), false);
view.hide(view.response);