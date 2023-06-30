const mongoose=require("mongoose");
//Lanadev
const postSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
      },
      desc: {
        type: String,
        max: 500,
      },
      img: {
        type:String,
        // data:Buffer,
        // contentType: String,
      },
      likes: {
        type: Array,
        default: [],
      },
      comments:{
        type:Array,
        default:[]
      }
},{timeStamps:true});

module.exports = mongoose.model("post",postSchema);