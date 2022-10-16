import mongoose, {ObjectId} from "mongoose";

const cartSchema = new mongoose.Schema({
    products:  {
        type: [],
        require: true
    }, 
    userID: {
        type: ObjectId,
        ref: 'User'
    }
})


export default mongoose.model("Carts", cartSchema)