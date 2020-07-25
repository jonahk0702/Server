const handleChooseMatchWin = (req, resp, db) =>{  
    const {betid, userId} = req.body;

    let side = '';

    db.select('*').from('expiredmatched')
   .where('betid', '=', betid)
    .then(data => {

    	if(data[0].creator == userId){
    		side = 'creator';
    		resp.json(data[0].betterside);
    	}else{
    		side = 'better';
    		resp.json(data[0].creatorside)
    	}

//        resp.json(data);
    })

}

module.exports = {
	handleChooseMatchWin:handleChooseMatchWin
} 