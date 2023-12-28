// db connection



const moongoose=require('mongoose');
moongoose.connect('mongodb+srv://pranavdeshmukh95:Pranav2495@registration.ldboo8l.mongodb.net/Registration');
const conn=moongoose.connection;
conn.on('connected',()=>{
  console.log('Connected Successfully');
});
conn.on('disconnected',()=>{
  console.log('Disconnected Successfully');
})
conn.on('error',console.error.bind(console,'connection error:'));

module.exports=conn;
// const connectDb=async()=>{
//     try{
//       const conn=await moongoose.connect('mongodb+srv://pranavdeshmukh95:Pranav2495@registration.ldboo8l.mongodb.net/');
//       console.log('connected');
      
//     }catch(error){
//       console.log(error.message);
//     }
//   }

//   module.exports = connectDb;
