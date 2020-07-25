const handleBetAgainst = (req, res, db) =>{   
	const {amount, betid, userId, date} = req.body;
	db.transaction(function(trx) {
	db('users').transacting(trx)
	
	.select('balance').from('users')
	.where('id', '=', userId)
	.then(resp => {
		let have = resp[0].balance; 
		if(have > amount){
			db('users')
			.where('id', '=', userId)
			.update({balance : (have - amount)})
			.then(resp => {
				db('pilestransactions')
				.insert({
					betid: betid,
					userid: userId, 
					side: 'be',
					amount: amount,
					date: date,
				})
				.then(data => {
					db.select('*').from('pileons')
					.where('betid', '=', betid)
					.then(data => {
						db('pileons')
						.where('betid', '=', betid)
						.update({
							currentagainst: (data[0].currentagainst + amount),
							population: (data[0].population + 1),
						})
						.then(data => {
							res.json("Sucess!");
						}).catch(err => res.status(400).json('fail 3'))
					}).catch(err => res.status(400).json('fail 4'))
				}).catch(err => res.status(400).json('fail 5'))
			}).catch(err => res.status(400).json('fail 1'))
		}
		if(have < amount){
			res.json("Do not have enough Bs");
		}

	}).catch(err => res.status(400).json('fail 222'))
		

		
	//})
	.then(trx.commit)
	.catch(trx.rollback);
	})
	.catch(function(err) {
	  console.error(err);
	});
}



module.exports = {
	handleBetAgainst:handleBetAgainst
}

/*
write into a transaction,
update man table,
decrease amount of money
*/