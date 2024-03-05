const getMapSpecsById = async (req, res , next) => {    
    try{
        let mapSpecs = await req.app.get('db')['map_specs'].findByPk(req.params.id);
        res.status(200).send({msg:'',mapSpecs}); 
    }catch(error){
        res.status(500);
        next(error)
    }
};

module.exports={
    getMapSpecsById
}
