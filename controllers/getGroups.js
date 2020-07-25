 const handleGetGroups = (req, res, db) => {
	const {id} = req.body;
	let arra = [];
    db('groupseps')
	.select('groupid')
	.where('userid', '=', id)

	.then(data => {
		for(let x = 0; x < data.length; x ++){
		arra.push(data[x].groupid);
		}
		db('groups').select('*').whereIn('id', arra)
		.then(data =>{
			res.json(data)
		})
		.catch(err => res.status(400).json("really not right"))
	
	}) 	
	.catch(err => res.status(400).json("Please Check Internet Connection."))
}

module.exports = {
	handleGetGroups:handleGetGroups
}