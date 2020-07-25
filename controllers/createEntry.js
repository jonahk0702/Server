const handleCreateEntry = (req, res, db) => {
	
	let { data } = req.body;
	let sets = [];
	let length = data.length;

	let allIds = [];
	for (var i = 0; i < length; i++) {
		allIds.push(data[i].betid);
	}

	db('exiredpiles')
	.select('*')
	.whereIn('betid', allIds)
	.then(data => {
		for (var i = 0; i < length; i++) {
			sets.push({
				betid:data[i].betid,
				population:data[i].population,
				totalvotes:0,
				voteforcr:0,
				voteagainst:0
			});
		}

		db('pilevotesum')
		.insert(sets)
		.then(data => {
			res.json('finished');
		})
	})

	.catch(err => res.status(400).json('wrong'))
}
module.exports = {
	handleCreateEntry:handleCreateEntry
}