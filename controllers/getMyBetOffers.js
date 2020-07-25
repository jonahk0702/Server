 const handleGetMyBetOffers = (req, res, db) => {   
 	const { userId, database } = req.body;
	db.select('*').from(database)
	.where('creator', '=', userId)
	
	.then(data => {
		res.json(data)
 
	})
	.catch(err => res.status(400).json('wrong'))
}
module.exports = {
	handleGetMyBetOffers:handleGetMyBetOffers
}