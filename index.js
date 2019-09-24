require('dotenv').config({ path: './.env' });
const PuppetterPack = require('./PuppeteerPack');
const Helpers = require('./Helpers');


// sample use
/* (async() =>{
    let p = new PuppetterPack(process.env.ABONO_NUM);
    await p.init().catch((res) => {
        console.log('Init Fail: ', res);
        process.exit(1);
    });

    let result = await p.getResults().catch((res) => console.log('Result Fail: ' , res));
    console.log(result);

    // console.log(Helpers.getAbonoResultToNotificate(result));

    await p.close();

})() */


module.exports = PuppetterPack