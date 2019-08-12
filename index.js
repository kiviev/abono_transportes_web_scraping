require('dotenv').config({ path: './.env' });
const Pupp = require('./PuppeteerPack');
const Helpers = require('./Helpers');



(async() =>{
    let p = new Pupp(process.env.ABONO_URL);
    await p.init().catch((res) => {
        console.log('Init Fail: ', res);
        process.exit(1);
    });

    let result = await p.getResults().catch((res) => console.log('Result Fail: ' , res));
    console.log(result);
    
    console.log(Helpers.getAbonoResultToNotificate(result));

    await p.close();

})()