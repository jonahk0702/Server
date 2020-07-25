const handleMakeGroup = (req, res, db) => {
	
	const {id, name, subject, userid} = req.body;
		db('groups').returning('*').insert({
			id: id,
			name: name,
			subject: subject,
			size: 1
		})
		.then(data => {
			db('groupseps').returning('*').insert({
				groupid: id,
				userid: userid
				})
			.then(data => {
				res.json("Success")
			})	
		})
}

 

module.exports = {
	handleMakeGroup:handleMakeGroup
}
