const getAllFlights = async (req, res , next) => {    
    try{
        let flights = await req.app.get('db')['flights'].findAll();
        res.status(200).send({status:true,msg:'SUCCESS',flights}); 
    }catch(error){
        res.status(500);
        next(error)
    }
};

module.exports={
    getAllFlights
}
