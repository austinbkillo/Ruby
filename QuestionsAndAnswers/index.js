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

//Get questions
app.get('/', (req, res) => {
  console.log('receiving')
  res.send('senderoni')
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
app.put('/questions/report/:id', (req, res) => {
  console.log(req.params.id)
  const result = db.markQuestionReported(req.params.id).then((data)=>{
    console.log(data);
    res.send(data)});
})
//Mark Answer Helpful
app.put('/', (req, res) => {
  console.log('receiving')
  res.send('senderoni')
})
//Mark Question Reported
app.put('/questions/reported', (req, res) => {
  console.log('receiving')
  res.send('senderoni')
})
//Mark Answer Reported
app.put('/', (req, res) => {
  console.log('receiving')
  res.send('senderoni')
})


app.listen(port, ()=>{
  console.log('listening at ' + port);
})