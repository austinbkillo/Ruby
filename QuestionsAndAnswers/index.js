const express = require('express');
const app = express();
const port = 3000;
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
app.listen(port, ()=>{
  console.log('listening at ' + port);
})