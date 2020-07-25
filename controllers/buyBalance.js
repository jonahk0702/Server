const handleBuyBalance = (req, resp, db) =>{  
    const {email, amount} = req.body;
    db.select('balance').from('users').where('email', '=', email)

    .then(data =>{
        let holder  = 
        db('users').where('email', '=', email)
        .update({
            balance: (data[0].balance + amount)
        })
        .then(data =>{
            resp.json('success')
        })
    })
    }


module.exports = {
	handleBuyBalance:handleBuyBalance
}