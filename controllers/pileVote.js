const handlePileVote = (req, res, db) => {
	let dater = new Date();
	let news = 0;
	let { userid,exDate, id, vote, side, amount } = req.body; 
	
	db('pilevotetrans')
	.returning('*')
	.insert({
		userid: userid,
		betid: id, 
		date: exDate,
		vote: vote,
		side: side,
		amount: amount
	})
	.then(data => {
		if(vote ===  'be'){
			vote = 'voteagainst';
		}else{
			vote = 'voteforcr';
		}
		
		db('pilevotesum')
			.where('betid', '=', id)
			.increment('totalvotes',1)
			.then(data => {

				 	db('pilevotesum')
				 		.where('betid', '=', id)
				 		.increment(vote,1)
				
				.then(data => {  
				db('pilevotesum')
					.select('*')
					.where('betid', '=', id) 
					.then(data => {  
						if(data[0].population < ( data[0].totalvotes * 1.35)){
							
							
							if(data[0].voteforcr > data[0].voteagainst){
								res.json("Ocr" + id);	
							}
							if(data[0].voteforcr < data[0].voteagainst){
								res.json("Obe" + id);
							}
							if(data[0].voteforcr === data[0].voteagainst){
								res.json("Odr" + id);
							}


						}else{
							res.json("allclear");
						}
				})
	  		
			})

})

	})
}
module.exports = {
	handlePileVote:handlePileVote
}
