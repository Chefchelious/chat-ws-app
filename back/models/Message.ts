import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  authorUsername: {
    type: String,
    required: true,
  },
  datetime: {
    type: String,
    required: true,
    default: () => new Date().toISOString(),
  },
});

const Message = mongoose.model('Message', MessageSchema);

export default Message;
