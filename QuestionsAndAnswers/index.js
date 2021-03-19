const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const db = require('./dbqueries');
mongoose.connect("/mongodb://127.0.0.1:27017/SDC", {useNewUrlParser: true})

mongoose.connection
  .on('open', (() => {console.log('connected')}))
  .on('error', (error) => {
    console.log(error)
  })

//Get all questions
app.get('/qa/questions/:productID', (req, res) => {
  let questionsArray;
  db.getAllQuestions(req.params.productID)
  .then((data)=>{
    questionsArray = data;
  })
  .then(() => {
    for (let i = 0; i < questionsArray.length; i++) {
      db.getAnswers(questionsArray[i]._id).then((data)=>{
        questionsArray[i].answers = data;
      })
    }
  }).then(()=>{
    res.send(questionsArray)
  })
})

//get answers
app.get('/', (req, res) => {
  console.log('receiving')
  res.send('senderoni')
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


app.listen(port, ()=>{
  console.log('listening at ' + port);
})