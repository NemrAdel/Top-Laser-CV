const mongoose=require('mongoose')
const Schema=mongoose.Schema

const TestLaser=new Schema(
    {
        Name:String,
    },{timestamps:true}
)
const Test=mongoose.model("LaserTest",TestLaser)


module.exports=Test