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
const photoSchema = new Schema({
  id: Number,
  answer_id: Number,
  url: String
})
const Question = mongoose.model('Question', questionSchema);
const Answer = mongoose.model('Answer', answerSchema);
const Count = mongoose.model('Count', counterSchema, 'count');
const Photo = mongoose.model('Photo', photoSchema, 'photo');

//count all questions
const getCurrentCount = () => {
  let query = Count.find();
  return query;
}
const getAllQuestions = (productID) => {
  let query = Question.find({"product_id": productID});
  return query;
}
const getAnswers = (questionID) => {
  let query = Answer.find({question_id: questionID});
  return query;
}

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

const postQuestion = (question) => {
  let body = question.body;
  let name = question.name;
  let email = question.email;
  let product_id = question.product_id;
  let id = question.id;
  let rn = new Date().toISOString();
  let newQuestion = new Question({
    "product_id": product_id,
    "id": id,
    "body": body,
    "date_written": rn,
    "asker_name": name,
    "asker_email": email,
    "reported": 0,
    "helpful": 0,
    "answers": [],
  })
  return newQuestion.save();
}

const postAnswer = (answer) => {
  let body = answer.body;
  let name = answer.name;
  let email = answer.email;
  let product_id = answer.product_id;
  let rn = new Date().toISOString();
  let newanswer = new Answer({
    "product_id": product_id,
    "id": insertmyid,
    "body": body,
    "date_written": new Date(),
    "asker_name": name,
    "asker_email": email,
    "reported": 0,
    "helpful": 0,
    "answers": [],
  })

}
const getPhotos = (answerID) => {
  let query = Photo.find({'answer_id': answerID});
  return query;
}

module.exports = {
  getPhotos: getPhotos,
  postQuestion: postQuestion,
  postAnswer: postAnswer,
  getCurrentCount: getCurrentCount,
  getAllQuestions: getAllQuestions,
  getAnswers: getAnswers,
  markQuestionReported: markQuestionReported,
  markQuestionHelpful: markQuestionHelpful,
  markAnswerReported: markAnswerReported,
  markAnswerHelpful: markAnswerHelpful
}