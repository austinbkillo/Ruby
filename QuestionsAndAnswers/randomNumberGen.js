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

scp -i Instance1.pem loaderio-8d89c7477dfe251c55b003a80091f817.txt ec2-18-144-69-36.us-west-1.compute.amazonaws.com:/home/ubuntu

// mongodump --archive=SDC.archive --db=SDC


//run this from your ubuntu instance
// mongorestore --archive=SDC.archive --host=localhost --port=27017 --db=SDC --collection=answer_photos --drop