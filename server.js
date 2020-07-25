const express = require('express');
const bodyParser = require('body-parser'); 
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')
const schedule = require('node-schedule');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const createBet = require('./controllers/createBet');
const displayBet = require('./controllers/displayBet');
const returnBets = require('./controllers/returnBets');
const returnPileBets = require('./controllers/returnPileBets');
 
const betAgainst = require('./controllers/betAgainst');
const betFor = require('./controllers/betFor');
const buyBalance = require('./controllers/buyBalance');
const getId = require('./controllers/getId');
const getMyBets = require('./controllers/getMyBets');
const checkId = require('./controllers/checkId');
const getBalance = require('./controllers/getBalance');
 const getBetDescriptions = require('./controllers/getBetDescriptions');
const makeGroup = require('./controllers/makeGroup');
const joinGroup = require('./controllers/joinGroup');
const getGroups = require('./controllers/getGroups');
const buyMatch = require('./controllers/buyMatch');
const expireBets = require('./controllers/expireBets');
const getMyBetOffers = require('./controllers/getMyBetOffers');
const chooseMatchWin = require('./controllers/chooseMatchWin');
const chooseMatchWinp2 = require('./controllers/chooseMatchWinp2');
const chooseMatchWinTaken = require('./controllers/chooseMatchWinTaken');
const getPileBets = require('./controllers/getPileBets');
const pileVote = require('./controllers/pileVote');
const createEntry = require('./controllers/createEntry');
const disPiles = require('./controllers/disPiles');

const getMyBetVotes = require('./controllers/getMyBetVotes');

const getVisit = require('./controllers/getVisit');


const db = knex({
	client: 'pg',
	connection : {
		host : '127.0.0.1', //here it is hosted
		user : 'postgres',
		password : 'test',
		database : 'bettingapp'
	}
});

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.get('/', (req, res)=>{
	res.send("Its's working!");
})

app.post('/signin', (req, res) => {
	signin.handleSignin(req, res, db, bcrypt)
})

app.post('/register', (req, res) => {
	register.handleRegister(req, res, db, bcrypt)
})

app.post('/createBet', (req, res) => {
	createBet.handleCreateBet(req, res, db)
})

app.post('/displayBet', (req, res) => {
	displayBet.handleDisplayBet(req, res, db, bcrypt)
})

app.post('/returnBets', (req, res) => {
	returnBets.handleReturnBets(req, res, db)
})

app.post('/returnPileBets', (req, res) => {
	returnPileBets.handleReturnPileBets(req, res, db)
})


app.post('/betAgainst', (req, res) => {
	betAgainst.handleBetAgainst(req, res, db)
})

app.post('/betFor', (req, res) => {
	betFor.handleBetFor(req, res, db)
})

app.post('/buyBalance', (req, res) =>{
	buyBalance.handleBuyBalance(req, res, db)
})

app.post('/getId', (req, res) =>{
	getId.handleGetId(req, res, db)
})

app.post('/getMyBets', (req, res) =>{
	getMyBets.handleGetMyBets(req, res, db)
})

app.post('/checkId', (req, res) =>{
	checkId.handleCheckId(req, res, db)
})
 
app.post('/getBalance', (req, res) =>{
	getBalance.handleGetBalance(req, res, db)
})

app.post('/getBetDescriptions', (req, res) =>{
	getBetDescriptions.handleGetBetDescriptions(req, res, db)
})

app.post('/makeGroup', (req, res) =>{
	makeGroup.handleMakeGroup(req, res, db)
})

app.post('/joinGroup', (req, res) =>{
	joinGroup.handleJoinGroup(req, res, db)
})
app.post('/getGroups', (req, res) =>{
	getGroups.handleGetGroups(req, res, db)
})
app.post('/buyMatch', (req, res) =>{
	buyMatch.handleBuyMatch(req, res, db)
})

app.post('/expireBets', (req, res) =>{
	expireBets.handleExpireBets(req, res, db)
})


app.post('/getMyBetOffers', (req, res) =>{
	getMyBetOffers.handleGetMyBetOffers(req, res, db)
})

app.post('/chooseMatchWin', (req, res) =>{
	chooseMatchWin.handleChooseMatchWin(req, res, db)
})

app.post('/chooseMatchWinp2', (req, res) =>{
	chooseMatchWinp2.handleChooseMatchWinp2(req, res, db)
})

app.post('/chooseMatchWinTaken', (req, res) =>{
	chooseMatchWinTaken.handleChooseMatchWinTaken(req, res, db)
})

app.post('/getPileBets', (req, res) =>{
	getPileBets.handleGetPileBets(req, res, db)
})	

app.post('/pileVote', (req, res) =>{
	pileVote.handlePileVote(req, res, db)
})

app.post('/createEntry', (req, res) =>{
	createEntry.handleCreateEntry(req, res, db)
})

app.post('/disPiles', (req, res) =>{
	disPiles.handleDisPiles(req, res, db)
})

app.post('/getMyBetVotes', (req, res) =>{
	getMyBetVotes.handleGetMyBetVotes(req, res, db)
})


app.post('/getVisit', (req, res) =>{
	getVisit.handleGetVisit(req, res, db)
})

app.listen(process.env.PORT || 3000, () => {
	console.log("app is running on port 3000");
});