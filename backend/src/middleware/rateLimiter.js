import ratelimit from "../config/uspstash.js"

const rateLimiter = async(req,res,next)=>{
    try {
        const {success} = await ratelimit.limit("my-limit-key")
        
        if(!success){
            return res.status(429).json({message:"too many request, Please Try again later"})
        }

        next()
    } 
    catch (error) {
        console.log("rate limit error ")
        next(error)
    }
}

export default rateLimiter