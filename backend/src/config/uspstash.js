import {Ratelimit} from "@upstash/ratelimit"; 
import {Redis} from "@upstash/redis";
import dotevn from "dotenv";
dotevn.config();

//create a ratelimiter that allows 5 requests per 10 seconds
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(20,"30 s")
})

export default ratelimit;