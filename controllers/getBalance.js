const handleGetBalance = (req, res, db) => {   
	const { id } = req.body;
	return db('users')
	.select('balance')
	.where('id', '=', id)
	.then(user => {
		res.json(user[0].balance)
	})	

	.catch(err => res.status(400).json('wrong'))
}
module.exports = {
	handleGetBalance:handleGetBalance
}