const handleReturnPileBets = (req, res, db, amount) => {
	
	db.select('*').from('pileons')
	.then(user => {
		res.json(user)
	})
	.catch(err => res.status(400).json('unable to get bets'))	

	
}
module.exports = {
	handleReturnPileBets:handleReturnPileBets
}