const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
  id: Number,
  product_id: Number,
  body: String,
  date_written: Date,
  asker_name: String,
  asker_email: String,
  helpful: Number,
  reported: Number,
});

// const answerSchema = new Schema({
//   id: ObjectId,
//   question_id: ObjectId,
//   body: String,
//   date_written: Date,
//   answerer_name: String,
//   answerer_email: String,
//   reported: Boolean,
//   helpfulness: Number
// })

const Question = mongoose.model('Question', questionSchema);

//Get all Questions
const getAllQuestions = (productID) => {
  Question.find({"product_id": productID})
}

//Mark Question as reported
const markQuestionReported = (questionID) => {
  const filter = {id: questionID};
  const update = {reported: 1}
  let query = Question.updateOne(filter, update).then();
  return query;
}

const markQuestionHelpful = (questionID) => {
  const filter = {id: questionID};
  const update = {$inc: {helpful: 1}}
  let query = Question.updateOne(filter, update);
  return query;
}

module.exports = {
  markQuestionReported: markQuestionReported,
  markQuestionHelpful: markQuestionHelpful
}