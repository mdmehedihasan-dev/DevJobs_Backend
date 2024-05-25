export const catchAsyncError = (theFuncation)=>{
    return(req,res,next)=>{
        Promise.resolve(theFuncation(req,res,next)).catch(next)
    }
}