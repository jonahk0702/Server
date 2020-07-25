 const handleGetMyBetVotes	 = (req, res, db) => {   

// Get all the votes from the different bets
 	const { userId } = req.body;
 	let voted = [];
 	let role = "";
 	db.select('*')
 	.from('mathced')
		.where('creator', '=', userId)
		.orWhere('better', '=', userId)
		
		.then(data => {
			res.json(data)
	 
		})
	
	
	
		.catch(err => res.status(400).json('wrong'))

	
}
module.exports = {
	handleGetMyBetVotes:handleGetMyBetVotes
}