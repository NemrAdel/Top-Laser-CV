const mongoose=require("mongoose");
const Schema=mongoose.Schema;


const TopLaserLoginSchema=new Schema({
    Date:Date
},{timestamps:true})
const TopLaserLoginModel=mongoose.model("TopLaserLogin",TopLaserLoginSchema)


const TopLaserDataEntrySchema=new Schema({
    Name:String,
    Work:String,
    Price:Number,
    Out:Number,
    Payment:Number,
    Date:Date,
    Note:String,
    OutNew:String
},{timestamps:true})
const TopLaserDataEntryModel=mongoose.model("TopLaserDataEntry",TopLaserDataEntrySchema)



const TopLaserSignUpSchema=new Schema({
    UserName:String,
    Password:String
})
const TopLaserSignUpModel=mongoose.model('TopLaserSignUp',TopLaserSignUpSchema)




module.exports={TopLaserLoginModel,TopLaserDataEntryModel,TopLaserSignUpModel}