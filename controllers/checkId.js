const handleCheckId = (req, res, db) => {   
	const {table, id} = req.body;
	return db.select('id').from(table)
	.where('id', '=', id)
	.then(user => { 
		if(user[0].id){
			res.json("reject")
		}
	})
	.catch(err => res.json('Good'))

}
module.exports = {
	handleCheckId:handleCheckId
} 