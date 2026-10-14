import mongoose from "mongoose"
const messageSchema=new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:user,
        required:true,
    },
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:user,
        required:true,
    },
    text:{
        type:String,
    },
    img:{
        type:String,
    },
    vid:{
        type:String,
    }

},{timestamps:true})
const Message = mongoose.model("Message",messageSchema)
export default Message;