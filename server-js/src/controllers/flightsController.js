const getAllFlights = async (req, res , next) => {    
    try{
        let flights = await req.app.get('db')['flights'].findAll({include:['trail']});
        res.status(200).send({status:true,msg:'SUCCESS',flights}); 
    }catch(error){
        res.status(500);
        next(error)
    }
};

const deleteFlightById = async (req, res , next) => {    
    try{
        let flight = await req.app.get('db')['flights'].findByPk(req.params.id);
        if(flight){
            await flight.destroy();
            res.status(200).send({status:true,msg:'SUCCESS'}); 
        }else{
            res.status(404);
            next(new Error(`flight with the id ${req.params.id} does not exist` ));
        }
    }catch(error){
        res.status(500);
        next(error)
    }
};

const editFlightById = async (req, res , next) => {    
    try{
        let flight = await req.app.get('db')['flights'].findByPk(req.params.id);
        if(flight){
            await flight.update(req.body);
            res.status(200).send({status:true,msg:'SUCCESS',flight}); 
        }else{
            res.status(404);
            next(new Error(`flight with the id ${req.params.id} does not exist` ));
        }
    }catch(error){
        res.status(500);
        next(error)
    }
};

const postFlight = async (req, res , next) => {    
    try{
        let flight = await req.app.get('db')['flights'].create(req.body);
        res.status(201).send({status:true,msg:'SUCCESS',flight}); 
    }catch(error){
        res.status(500);
        next(error)
    }
};


module.exports={
    getAllFlights,
    deleteFlightById,
    editFlightById,
    postFlight
}
