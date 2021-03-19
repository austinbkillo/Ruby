const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  id: Number,
  product_id: Number,
  body: String,
  date_written: Date,
  asker_name: String,
  asker_email: String,
  helpful: Number,
  reported: Number,
});

const answerSchema = new Schema({
  id: Number,
  question_id: Number,
  body: String,
  date_written: Date,
  answerer_name: String,
  answerer_email: String,
  reported: Number,
  helpful: Number
})

const Question = mongoose.model('Question', questionSchema);
const Answer = mongoose.model('Answer', answerSchema);

//Get all Questions
const getAllQuestions = (productID) => {
  Question.find({"product_id": productID})
}

//Mark Question as reported
const markQuestionReported = (questionID) => {
  // const filter = {_id: ObjectId(questionID)};
  const update = {reported: 1}
  let query = Question.findByIdAndUpdate(questionID, update).then();
  return query;
}

const markQuestionHelpful = (questionID) => {
  // const filter = {_id: `ObjectId(${questionID})`};
  const update = {$inc: {helpful: 1}};
  let query = Question.findByIdAndUpdate(questionID, update)
  // let query = Question.updateOne(filter, update);
  return query;
}

const markAnswerReported = (answerID) => {
  const update = {reported: 1}
  let query = Answer.findByIdAndUpdate(answerID, update);
  return query;
}

const markAnswerHelpful = (answerID) => {
  const update = {$inc: {helpful: 1}};
  let query = Answer.findByIdAndUpdate(answerID, update);
  return query;
}

module.exports = {
  markQuestionReported: markQuestionReported,
  markQuestionHelpful: markQuestionHelpful,
  markAnswerReported: markAnswerReported,
  markAnswerHelpful: markAnswerHelpful
}