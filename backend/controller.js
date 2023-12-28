
const model=require('./model');
const db=require('./db');
const { ObjectId } = require('mongodb');

const collection=db.collection('People');

module.exports={
    createData:(req,res)=>{
        let payload=req.body;
        let id=payload['_id'];
        let name=payload['name'];
        let address=payload['address'];
        let email=payload['email'];
        let mobile=payload['mobile'];
      
        if(name!='' && address!='' && email!='' && mobile!=''){
          if(id==''){
              model.createData(payload,(datam)=>{
            const result=collection.insertOne(datam,(err,datares)=>{
                if(datares.acknowledged==true){
                    res.send({
                        status:1,
                        message:"Inserted Successfully."
                    });
                }else{
                    res.send({
                        status:3,
                        message:err
                    })
                }
            });
          })
        }else{
         const u_id=new ObjectId(id)
          collection.updateOne({'_id':u_id},{$set:{name,address,mobile,email}},(err,data)=>{
            if(data.acknowledged==true){
              res.send({
                status:1,
                message:"Updated Successfully."
            });
            }else{
              res.send({
                status:3,
                message:err
            })
            }
          });
        }
          }else{
            res.send({
              status:3,
              message:'Data Not Found'
            })
            }
        
        
    },

    getData:(req,res)=>{
      const coll=db.collection('People');
     coll.find({}).toArray().then((data)=>{
      res.send({data});
     }).catch((err)=>{
      res.send(err);
     })  
    },
    getDatabyid:(req,res)=>{
      const coll=db.collection('People');
      const id=req.body;
      f_id=new ObjectId(id);
      coll.find({_id:f_id}).toArray().then((result)=>{
        res.send({result});
      }).catch((err)=>{
        res.send(err);
      })
    },
   
    deleteDatabyid:(req,res)=>{
      const coll=db.collection('People');
      const id=req.body;
      d_id=new ObjectId(id);
      coll.deleteOne({_id:d_id}).then((result)=>{
        if(result.acknowledged==true){
          res.send({
            status:1,
            message:"Deleted Successfully."
        });
        }else{
          res.send({
            status:3,
            message:err
        })
        }
      });
    }
}
    

  