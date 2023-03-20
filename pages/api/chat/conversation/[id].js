import ConnectToDatabase from "../../../../backend/server";
import Conversation from "../../../../models/Conversation";
import nextConnect from "next-connect";

//this api is basically to get a conversation through an id

ConnectToDatabase();
const handler = nextConnect();

//gets messages in a conversation through the conversation Id
handler.get(async (req, res) => {
  const {
    query: { id },
  } = req;

  try {
    const conversation = await Conversation.find({
      members: { $in: [id] },
    }).lean();
    res.status(200).json(conversation); //this returns the messages in a conversation
  } catch (err) {
    res.status(500).json(err);
  }
});


// delete conversation
handler.delete(async (req, res) => {
  const {
    query: { id },
  } = req;

  try {
    const conversation = await Conversation.findByIdAndDelete(id);
    res.status(200).json("already deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

export default handler;
