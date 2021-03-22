const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const db = require('./dbqueries');
mongoose.connect("/mongodb://127.0.0.1:27017/SDC", {useNewUrlParser: true})


let questionCount;
let answerCount;
mongoose.connection
  .on('open', (() => {
    console.log('connected')
    db.getCurrentCount().then((data)=>{
      console.log(data[0].counter);
      questionCount = data[0].counter;
    })
  }))
  .on('error', (error) => {
    console.log(error)
  })

  app.listen(port, ()=>{
    console.log('listening at ' + port);
  })

//Get all questions
app.get('/qa/questions/:productID', (req, res) => {
  let questionsArray;
  let answersArray;
  let clientArray = [];
  let loop = async function(q) {
    let copy = q._doc;
    copy.answers = await db.getAnswers(q.id)
    copy.random = "parker";
    console.log(copy);
    clientArray.push(copy);

  }
  db.getAllQuestions(req.params.productID)
  .then(async (data) => {
    questionsArray = data;
    const queries = [];
    for (let i = 0; i < questionsArray.length; i++) {
      await loop(questionsArray[i]);
      if (i === questionsArray.length - 1) {

      res.send(clientArray);
    }
    }

  })
  .catch((err)=>{
    console.error(err);
  })
})

//get answers
app.get('/qa/questions/:questionid/answers', (req, res) => {
  db.getAnswers(req.params.questionid)
  .then((data)=>{
    res.send(data);
  })

})
//Post Question
app.post('/', (req, res) => {
  console.log('receiving')
  res.send('senderoni')
})
//Post Answer
app.post('/', (req, res) => {
  console.log('receiving')
  res.send('senderoni')
})
//Mark Question Reported
app.put('/qa/questions/:id/report', (req, res) => {
  db.markQuestionReported(req.params.id).then((data)=>{
    res.send(data)});
})
//Mark Question Helpful
app.put('/qa/questions/:id/helpful', (req, res) => {
  db.markQuestionHelpful(req.params.id).then((data)=>{
    res.send(data)
  });
})
//Mark Answer Reported
app.put('/qa/answers/:id/report', (req, res) => {
  db.markAnswerReported(req.params.id).then((data)=>{
    res.send(data);
  })
})
//Mark Answer Helpful
app.put('/qa/answers/:id/helpful', (req, res) => {
  db.markAnswerHelpful(req.params.id).then((data)=>{
    res.send(data);
  })
})


