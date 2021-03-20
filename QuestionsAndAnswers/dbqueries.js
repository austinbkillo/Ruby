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
const counterSchema = new Schema({
  counter: Number
})

const Question = mongoose.model('Question', questionSchema);
const Answer = mongoose.model('Answer', answerSchema);
const Count = mongoose.model('Count', counterSchema, 'count')

//count all questions
const getCurrentCount = () => {
  let query = Count.find();
  return query;
}
//Get all Questions
const getAllQuestions = (productID) => {
  let query = Question.find({"product_id": productID});
  return query;
}
const getAnswers = (questionID) => {
  let query = Answer.find({question_id: questionID});
  return query;
}

//Mark Question as reported
const markQuestionReported = (questionID) => {
  const filter = {id: questionID};
  const update = {reported: 1}
  let query = Question.findOneAndUpdate(filter, update);
  return query;
}

const markQuestionHelpful = (questionID) => {
  const filter = {id: questionID};
  const update = {$inc: {helpful: 1}};
  let query = Question.findOneAndUpdate(filter, update)
  // let query = Question.updateOne(filter, update);
  return query;
}

const markAnswerReported = (answerID) => {
  const update = {reported: 1}
  const filter = {id: answerID}
  let query = Answer.findOneAndUpdate(filter, update);
  return query;
}

const markAnswerHelpful = (answerID) => {
  const update = {$inc: {helpful: 1}};
  const filter = {id: answerID}
  let query = Answer.findOneAndUpdate(filter, update);
  return query;
}

module.exports = {
  getCurrentCount: getCurrentCount,
  getAllQuestions: getAllQuestions,
  getAnswers: getAnswers,
  markQuestionReported: markQuestionReported,
  markQuestionHelpful: markQuestionHelpful,
  markAnswerReported: markAnswerReported,
  markAnswerHelpful: markAnswerHelpful
}