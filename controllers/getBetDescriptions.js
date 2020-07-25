const handleGetBetDescriptions = (req, res, db) => {   
	return db.select('id', 'description').from('bets')
	.then(bets => { 
		res.json(bets)
	})
	.catch(err => res.json('Good'))

}
module.exports = {
	handleGetBetDescriptions:handleGetBetDescriptions
} 