const handleDisplayBet = (req, res, db) => {
	db.select('email', 'hash').from('login')
	
	.then(data => {
		const isValid = true;
		if(isValid){
			return db('bets').count('*')
			.then(user => {
				res.json(user[0].count)

			})
			.catch(err => res.status(400).json('unable to get user'))
		}else{
			res.status(400).json('wrong credentials');	
		}

	})
	.catch(err => res.status(400).json('wrong'))
}
module.exports = {
	handleDisplayBet:handleDisplayBet
}