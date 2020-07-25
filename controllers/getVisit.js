const handleGetVisit = (req, res, db) => {   

	 db('visit')
	 .increment('v', 1)
	.then(user => { 
		res.json("reject")
	
	})
	.catch(err => res.json('Internet Error'))

}
module.exports = {
	handleGetVisit:handleGetVisit
} 