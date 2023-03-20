import ConnectToDatabase from "../../../../backend/server"
import Message from "../../../../models/Message";
import nextConnect from "next-connect"


ConnectToDatabase();
const handler = nextConnect();

//gets messages in a conversation through the conversation Id
handler.get(async(req, res)=>{
    const {
        query:{id}
    }= req

        try{
            const messages = await Message.find({
                conversationId:id,
            }).lean();
            res.status(200).json(messages) //this returns the messages in a conversation
        }catch(err){
            res.status(500).json(err)
        }
})


handler.delete(async(req, res) => {
  const {
    query : {id}
  }= req

  try{
    const message = await Message.findByIdAndDelete(id);
    res.status(200).json("already deleted")
  }catch(error){
    res.status(500).json(error)
  }
})

export const config = {
    api: {
      bodyParser: {
        sizeLimit: '16mb',
      },
    },
  }



  
export default handler;