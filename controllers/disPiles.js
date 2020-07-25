 const handleDisPiles = (req, res, db) => {
	
	let { data } = req.body;
	//who won
	//I need to get all winners and the amount they bet
	//I need to total up all the money
	//I need to credit accounts.
	//I need to move the bet into being done
	let winners = data.substring(1, 3);
	let betId = data.substring(3,9);
	let total = 0;
	let rewrites = [];
	let winArray = [];
	let winId = [];
	let winnngs;
	db('expiredpiletrans')
	.innerJoin('users', 'users.id', 'expiredpiletrans.userid')
	.where('side', '=', winners)
	.andWhere('betid', '=', betId)
	.then(data => {
		winArray = data;
		db('exiredpiles')
		.select('*')
		.where('betid', '=', betId)
		.then(data => {
			total = data[0].currentfor + data[0].currentagainst;
			winnings = (total) / winArray.length;
			
			if(winners === 'cr'){ 
				for (var i = 0; i < winArray.length; i++) {
					let holds = winArray[i].balance + winnings;
					
					rewrites.push({
						name: winArray[i].name,
						surname: winArray[i].surname,
						email: winArray[i].email,
						joined: winArray[i].joined,
						country: winArray[i].country,
						gender: winArray[i].gender,
						idnumber: winArray[i].idnumber,
						birthday:winArray[i].birthday,
						id:winArray[i].id,
						balance:holds

					});	
					winId.push(winArray[i].idnumber);
				}
				db("users")
				.whereIn('id', winId)
				.del()
				.then(data => {
					db('users')
					.insert(rewrites)
				})
				.then(data => {
				res.json("success");

				})
			}
			
		})


		//res.json("marry chismas");
	})

	.catch(err => res.status(400).json('wrong'))
}
module.exports = {
	handleDisPiles:handleDisPiles
}