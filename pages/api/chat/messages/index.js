
import ConnectToDatabase from "../../../../backend/server"
import Message from "../../../../models/Message";
import nextConnect from "next-connect"

ConnectToDatabase();
const handler = nextConnect();


// this is basically an api to add messages in a converstaion
handler.post(async(req, res) =>{
    const newMessage = new Message(req.body)

    try{
        const savedMessage = await newMessage.save()
        res.status(200).json(savedMessage)
    }catch(err){
        res.status(500).json(err)
    }
})

export const config = {
    api: {
      bodyParser: {
        sizeLimit: '16mb',
      },
    },
  }
  
export default handler
