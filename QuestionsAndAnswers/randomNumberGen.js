let results = {};
function getRandomInt(userContext, events, done) {
  let max = 500;
  userContext.vars.integer = Math.floor(Math.random() * Math.floor(max));
  return done();
}

module.exports = {
  getRandomInt,
  results
}

scp -i Instance1.pem SDC.archive ubuntu@ec2-13-56-20-206.us-west-1.compute.amazonaws.com:/home/ubuntu

// mongodump --archive=SDC.archive --db=SDC


//run this from your ubuntu instance
// mongorestore --archive=SDC.archive --host=localhost --port=27017 --drop