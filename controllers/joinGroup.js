const handleJoinGroup = (req, res, db) => {   
	
	const {userid, code, email } = req.body; 
	db.transaction(function(trx) {
	db('users').transacting(trx)
	db('groupseps')
	.insert({
		userid: userid,
		groupid: code
	})	
	.then(data => {
		db.select('size').from('groups')
		.where('id', '=', code)
		.then(data => {
			db('groups')
			.where('id', '=', code)
			.update({
				size: data[0].size + 1 
			})
			.then(data => {
				res.json("Success");
				
			}) 
		})
	})
	.then(trx.commit) 
 	.catch(trx.rollback)

})
	.catch(err => res.status(400).json("Unable to register"))
}

module.exports = {
	handleJoinGroup:handleJoinGroup
} 