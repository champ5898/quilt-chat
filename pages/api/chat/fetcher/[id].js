import ConnectToDatabase from "../../../../backend/server"
import Conversation from "../../../../models/Conversation";
import nextConnect from "next-connect"

//this api is basically to get a conversation through an id

ConnectToDatabase();
const handler = nextConnect();

handler.get(async(req, res)=>{
    
    //gets and return a conversation through an Id
    try{
        const conversation = await Conversation.find({
            members: { $in: [id] },
        }).lean();
        
        res.status(200).json(conversation);
    }catch(err){
        return err
    }

})




  
export default handler;