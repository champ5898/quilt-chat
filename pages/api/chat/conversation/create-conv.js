//backend code to create a conversation

import ConnectToDatabase from "../../../../backend/server"
import Conversation from "../../../../models/Conversation";
import nextConnect from "next-connect"

ConnectToDatabase();
const handler = nextConnect();


handler.post(async(req, res) =>{

    try{

        //finds whether conversation exists (from the sender to the receiver)
        const conversation = await Conversation.find({
            members: [req.body.senderId, req.body.receiverId]
        }).lean();
        
        //also finds whether conversation exists (from the receiver to the sender)
        const conversation2 = await Conversation.find({
            members: [req.body.receiverId, req.body.senderId]
        }).lean();
        
        //if conversation exists i.e the length of the array returned is not equals to 0 , then return the conversation
        if(conversation.length != 0 || conversation2.length != 0){
            res.status(200).json(conversation);
        }
        
        //if conversation does not exists i.e the length of the array returned is equal to 0, then create the conversation
        else if(conversation.length === 0 || conversation2.length === 0){
            try{

                const newConversation = new Conversation({
                    members: [req.body.senderId, req.body.receiverId]
                });
    
                if(newConversation){
                    const savedConversation = await newConversation.save()
                    res.status(200).json(savedConversation)
                }

                else if(!newConversation){
                    res.status(200).json("cannot create conversation")
                }

            }catch(err){
                res.status(500).json("an error occured")
            }
    
        }else{
            res.status(200).json("Something occured")
        }

    }catch(err){
        res.status(500).json("an error occured")
    }
   
   


   
})


export default handler
