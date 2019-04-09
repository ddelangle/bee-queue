--[[
key 1 -> bq:name:id (job ID counter)
key 2 -> bq:name:jobs
key 3 -> bq:name:waiting
arg 1 -> job id
arg 2 -> job data
]]

local jobId = ARGV[1]
if jobId == "" then
  jobId = "" .. redis.call("incr", KEYS[1])
end
if redis.call("hexists", KEYS[2], jobId) == 1 then return nil end
redis.call("hset", KEYS[2], jobId, ARGV[2])
if ARGV[3] ~= "" then
	redis.call("sadd", ARGV[5], ARGV[3])
	redis.call("lpush", ARGV[4], jobId)
end
redis.call("lpush", KEYS[3], jobId)


return jobId
