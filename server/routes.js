const express = require('express');
const router = express.Router();
const { registerParcel, transferParcel,signUp,login,getUser,logout, reportParcelLost, verifyCheckpoint,getParcelCount, getParcelHistory, getParcelDetails, getNextLocation } = require('./controllers.js');

const  {auth}  = require("./middlewares/auth.js");


router.post('/register', registerParcel);
router.post('/transfer', transferParcel);
router.post('/lost', reportParcelLost);
router.get('/verify', verifyCheckpoint);
router.get('/history', getParcelHistory);
router.get('/details', getParcelDetails);
router.get('/next-location', getNextLocation);
router.get('/get-count', getParcelCount);




router.post("/signup", signUp);

router.post("/login", login);

router.get("/get-user", auth,getUser);


router.get("/logout", auth, logout);


module.exports = router;

