
const mongoose=require('mongoose');

const mySchema=new mongoose.Schema({
    name:{type:String,required:true},
    mobile:{type:String,required:true},
    address:{type:String,required:true},
    email:{type:String,required:true},
    createdAt:{
        type:Date,
        default:Date.now,
    },
});

userTable=mongoose.model('users',mySchema);
module.exports={
    createData:(inputData,callback)=>{
        
        userData=new userTable(inputData);
        return callback(userData);
      
    }
}