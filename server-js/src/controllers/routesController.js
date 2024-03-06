const getRoutesList = async (req, res , next) => {    
    try{
        let routes = await req.app.get('db')['routes'].findAll();
        res.status(200).send({status:true,msg:'SUCCESS',routes}); 
    }catch(error){
        res.status(500);
        next(error)
    }
};

module.exports={
    getRoutesList
}
