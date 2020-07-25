 const handleGetMyBets	 = (req, res, db) => {   

 	const { userId, database, expiredBets } = req.body;
 	let expiredRet = [];
 	let role = "";
 	if(expiredBets == 'false'){
		db.select('*').from(database)
		.where('creator', '=', userId)
		.orWhere('better', '=', userId)
		
		.then(data => {
			res.json(data)
	 
		})
		.catch(err => res.status(400).json('wrong'))
	}
	else{


		db.select('*').from(database)
		.where('creator', '=', userId)
		.orWhere('better', '=', userId)
		
		.then(data => {

		 	for(let i = 0; i < data.length; i ++){
				if(data[i].creator == userId){
						if(data[i].creatorside == null){
						expiredRet.push(data[i])	
					}	
				}else{
					if(data[i].betterside == null){
						expiredRet.push(data[i])
					}
				}			
			}
			res.json(expiredRet)


	
		})
		.catch(err => res.status(400).json('wrong'))
	}	
	
}
module.exports = {
	handleGetMyBets:handleGetMyBets
}