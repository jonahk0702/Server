const handleChooseMatchWinTaken = (req, resp, db) =>{  
    const {betid, side, sideWon, amount, userId} = req.body;
    let othersId = "";

    if(side == 'creator'){
        db('expiredmatched')
        .where('betid', '=', betid)
        .update({
            creatorside: sideWon
        })
        .then(data => {
            db.select("*").from('expiredmatched')
            .where('betid', '=', betid)
            .then(data => {
                othersId = data[0].better;
                let win = "";   
                if(data[0].betterside == data[0].creatorside){               
                    win = data[0].creatorside;

                }else{
                    win = "no";
                }

                 db('closedbets')
                .insert({
                    better: data[0].better,
                   creator: data[0].creator,
                   amount:data[0].amount,
                   creatorside: data[0].creatorside,
                   betterside: data[0].betterside,
                   betid: data[0].betid,
                   description: data[0].description,
                   expires: data[0].expires,
                    winner: win,
                   
                }).catch(err => resp.status(400).json('phase 3'))
                .then(data => {
                    
                    db('expiredmatched')
                    .where('betid', '=', betid)
                    .del()
                    .then(data => {
                        db.select('*').from('closedbets').
                        where('betid', '=', betid)
                        .then(data => {
                            if(data[0].winner == 'no'){
                                db.select('balance').from('users')
                                .where('id', '=', userId)
                                .then(data => {
                                    db('users').where('id', '=', userId)
                                    .update({
                                        balance: (data[0].balance + amount )
                                    })
                                    .then(data => {
                                        db.select('balance').from('users')
                                .where('id', '=', othersId)
                                .then(data => {
                                    db('users').where('id', '=', othersId)
                                    .update({
                                        balance: (data[0].balance + amount)
                                    })
                                    .then(data => {
                                        resp.json("Sucess")
                                    })
                                })
                                    })
                                })
                            }
                            if(data[0].winner == 'cr' ){
                                
                                db.select('balance').from('users')
                                .where('id', '=', userId)
                                .then(data => {
                                    db('users').where('id', '=', userId)
                                    .update({
                                        balance: (data[0].balance + amount * 2)
                                    })
                                    .then(data => {
                                        resp.json("Sucess")
                                    })
                                })
                            }
                            if(data[0].winner == 'be'){
                                db.select('balance').from('users')
                                .where('id', '=', othersId)
                                .then(data => {
                                    db('users').where('id', '=', othersId)
                                    .update({
                                        balance: (data[0].balance + (amount * 2))
                                    })
                                    .then(data => {
                                        resp.json("Sucess")
                                    })
                                }) 
                            }

//resp.json("Somthing is very wrong")
                        })
                    })
                })
            
            })
        })

        
    }else{
        db('expiredmatched')
        .where('betid', '=', betid)
        .update({
            betterside: sideWon
        })
        .then(data => {
            db.select("*").from('expiredmatched')
            .where('betid', '=', betid)
            .then(data => {
                othersId = data[0].creator;
                let win = "";   
                if(data[0].betterside == data[0].creatorside){               
                    win = data[0].creatorside;

                }else{
                    win = "no";
                }

                 db('closedbets')
                .insert({
                    better: data[0].better,
                   creator: data[0].creator,
                   amount:data[0].amount,
                   creatorside: data[0].creatorside,
                   betterside: data[0].betterside,
                   betid: data[0].betid,
                   description: data[0].description,
                   expires: data[0].expires,
                    winner: win,
                }   
                ).catch(err => resp.status(400).json('phase 3'))
                .then(data => {
                    
                    db('expiredmatched')
                    .where('betid', '=', betid)
                    .del()
                    .then(data => {
                        db.select('*').from('closedbets').
                        where('betid', '=', betid)
                        .then(data => {
                            if(data[0].winner == 'no'){
                                //Shit
                            }
                            if(data[0].winner == 'cr' ){
                                
                                    db.select('balance').from('users')
                                    .where('id', '=', othersId)
                                    .then(data => {
                                        db('users').where('id', '=', othersId)
                                        .update({
                                            balance: (data[0].balance + amount)
                                        })
                                        .then(data => {
                                            resp.json("Sucess")
                                        })
                                    }) 
                            }
                            if(data[0].winner == 'be'){
                                
                                    db.select('balance').from('users')
                                    .where('id', '=', userId)
                                    .then(data => {
                                        db('users').where('id', '=', userId)
                                        .update({
                                            balance: (data[0].balance + amount)
                                        })
                                        .then(data => {
                                            resp.json("Sucess")
                                        })
                                    }) 

                            }

                           // resp.json("Success")
                        })
                    })
                })
            
            })
        })
    }

    
}

module.exports = {
	handleChooseMatchWinTaken:handleChooseMatchWinTaken
} 

/*



db('expiredmatched')
        .where('betid', '=', betid)
        .update({
            creatorside: sideWon
        })
        .then(data => {
            db.select("*").from('expiredmatched')
            .where('betid', '=', betid)

            .then(data => {
                 db('closedbets')
                .insert({
                   better: data[0].better,
                   creator: data[0].creator,
               }).catch(err => resp.status(400).json('phase 3'))
                .then(data => {
                    db('expiredmatched')
                    .where('betid', '=', betid)
                    .del()
                    .then(data => {
                        resp.json("Success")
                    }).catch(err => resp.status(400).json('phase 1'))
                })
            
            })
        })


*/