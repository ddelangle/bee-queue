var Queue = require('../lib/queue');

var rrQueue = new Queue("roundrobin_processing", {roundrobin:"account_id"})
var rrQueue2 = new Queue("roundrobin_processing", {roundrobin:"account_id"})

function sleeper(ms) {
    return new Promise(resolve => setTimeout(() => resolve(), ms));
}


// Nettoyage
// redis-cli --scan --pattern bq:round* | xargs redis-cli del


//On balance 4 jobs par account
// setTimeout(() => {
// for(var i = 0; i<3; i++) {
// 	for(var j = 0; j<4; j++) {
// 		console.log("create job", i, j)
// 		rrQueue.createJob({toto:"toto_" + j, account_id:i}).timeout(2 * 60*1000).retries(1).save()
// 	}
// }
// }, 1000)


rrQueue.on('job succeeded', function(job, result){
  // A job successfully completed with a `result`.
  console.log("succeeded", job)
}).on('job failed', function(job, err){
  // A job failed with reason `err`!
  console.log("failed", job, err)
})

var i = Math.round(Math.random() * 10000)

rrQueue.createJob({toto:"toto_" + i, account_id:i}).timeout(2 * 60*1000).retries(1).save()
//rrQueue.createJob({toto:"toto_" + i, account_id:i}).timeout(2 * 60*1000).retries(1).save()

