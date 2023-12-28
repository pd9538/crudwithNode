const valueModel=require('./model');

exports.area=function(number){
    return number*number;
}

exports.createValue=async(req,res)=>{

    try{
        const value=req.body;
        const square=area(req.body)
        console.log(value);
        await valueModel.create(value,square).then((createdModel)=>{
            console.log(createdModel);
            if(!createdModel) return res.status(404).json({
                success:false,
                message:'Not Created try again!',
                error:'Unable to create value'
            })
            res.status(201).json({
                success:true,
                createdModel
            })
        }).catch((error)=>{
            res.status(404).json({
                success:false,
                error:error.message
            })
        })
    }catch (error) {
        res.status(500)
          .json({
            success: false,
            message: "Internal server error"
          })
      }

}