const handleReturnBets = (req, res, db, amount) => {
	

	db.select('id').from('login')
	
	.then(data => {
		return db.select('*').from('matchingoffers')
		.whereNot('creator', '=', req.body.userId)
		.then(user => {
			res.json(user)
		})
		.catch(err => res.status(400).json('unable to get user'))	
		
					
		

	})	
	.catch(err => res.status(400).json('wrong'))
}
module.exports = {
	handleReturnBets:handleReturnBets
}