const handleCreateBet = (req, res, db) => {
	let dater = new Date();
	const { description, total, expiry, userid, bettype, hour, exDate, id } = req.body; 

	db.select('balance')
	.from('users') 
	.where('id', '=', userid)
	.then(date => {
		let balance = date[0].balance; 
		if(balance >= total){
			if(bettype === "match"){
				db('matchingoffers')
				.returning('*') 
				.insert({
					description: description,
					creator: userid,
					amount : total, 
					date: exDate,
					betid: id, 
					expires: expiry+ "/" + hour
				})
				.then(user => {
					db('users')
					.where('id', '=', userid)
					.update({
						balance: (balance - total)
					})
					.then(data => {
						res.json("Success");
					})
				})
				.catch(err => res.status(400).json('Unable to bet here'))
			}

			if(bettype === 'pile'){
				db('pileons')
				.returning('*')
				.insert({
					description: description,
					minimum: total,
					date: exDate,
					betid: id, 
					expires: expiry+ "/" + hour,
					currentfor: total,
					currentagainst: 0,
					population: 1
				})
				.then(data => {
					db('pilestransactions')
					.returning('*')
					.insert({
						betid: id,
						userid: userid,
						side: 'cr',
						amount: total,
					 	date: exDate 
					})
					.then(user => {
						db('users')
						.where('id', '=', userid)
						.update({
							balance: (balance - total)
						})
						.then(data => {
							res.json("Success");
						})
					})
				})

			}
		}

		})
	
}

module.exports = {
	handleCreateBet:handleCreateBet
}