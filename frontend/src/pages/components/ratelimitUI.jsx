import { ZapIcon } from "lucide-react"

function ratelimit () {
  return (
    <div className="max-h-20 max-w-3xl mx-auto px-8 py-4">
      <div className="bg-primary/10 border border-primary/30 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row items-center p-2 gap-2">
          <div className="size-14 flex-shrink-0 bg-primary/15 p-2 rounded-full">
            <ZapIcon className="size-10"/>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-l font-bold mb-1 pl-3">Rate Limit Reached !</h3>
            <p className="text-sm text-base-content pl-3 mb-0 ">
              You've made too many requests ... please wait for some time 
            </p>
            <p className="text-sm text-base-content/70 pl-3">
              Try again in a few seconds for best experience
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ratelimit
