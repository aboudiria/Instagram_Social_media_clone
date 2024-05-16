const signupUser= async (req,res)=>{
    try {
        
    } catch (err) {
        res.status(500).json({message:err.message});
        console.log("error in signupUser:",err.message)
    }
}
export {signupUser};