const handleBuyMatch = (req, res, db) =>{   
	const {email, betid, description, expiry, userId, amount} = req.body;  
	 
	db.select('balance')
	.from('users')
	.where('id', '=', userId)
	.then(data => {

		let balance = data[0].balance;
		if(balance >= amount){
			db.select('creator').from('matchingoffers')
			.where('betid', '=', betid)
			.then(user => { 
				db('matchedbets')
				.insert({
					description: description,
					creator: user[0].creator,
					 expires: expiry,
					betid: betid,
					better: userId,
					amount : amount,			 
					
				})
				.then(user => {
					db("matchingoffers")
					.where('betid', '=', betid)
					.del()
					.then(data => {
						db('users')
						.where('id', '=', userId)
						.update({
							balance: (balance - amount)
						})
						.then(data => {
							res.json("Success");
						})
						.catch(err => res.status(400).json('phase 1'))
					})
					.catch(err => res.status(400).json('phase 2'))
				})
				.catch(err => res.status(400).json('phase 3'))	
			})
			.catch(err => res.status(400).json('phase 4'))
		 }
	})


}
module.exports = {
	handleBuyMatch:handleBuyMatch
}