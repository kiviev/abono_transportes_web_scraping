# abono_transportes_web_scraping

#### sample to use
```javascript
 (async() =>{
    let p = new PuppetterPack('001 0123456789');
    await p.init().catch((res) => {
        console.log('Init Fail: ', res);
        process.exit(1);
    });

    let result = await p.getResults().catch((res) => console.log('Result Fail: ' , res));

    await p.close();

})()
```