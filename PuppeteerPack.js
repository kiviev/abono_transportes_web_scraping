require('dotenv').config({ path: '.env' });
const puppeteer = require('puppeteer');
const Helpers = require('./Helpers');
const isPi = require('detect-rpi');
const config = require('./package.json').config;


class PuppeteerPack {
    constructor(abono_num){
        if(!abono_num){
            console.error("Ningún número de abono");
            process.exit(1);
        }
        this.pup = puppeteer;
        this.browser = null;
        this.page = null;
        this.headless  = process.env.IN_DEVELOPMENT == 'true';
        this.url = config.abono_url || null;
        this.select = config.select_id;
        this.input = config.input_id;
        this.sendButton = config.send_button_id;
        this.resultTable = config.result_table;
        this.numAbono = Helpers.getAbonoNum(abono_num);
        return this;
    }

    async init(){
        return await Promise.all([
            await this.launch(),
            await this.getPage(),
            await this.setLogs(),
            await this.goToUrl(),
            await this.inPage(),
        ]).catch(reason => {
            console.log(reason)
        });
    }

    async run(){

    }

    async launch(){
        let options = {
            headless: true,
            // devtools : false,
            ignoreHTTPSErrors: true,
        };
        if(isPi()){
            options.headless = true;
            options.executablePath = '/usr/bin/chromium-browser';
        }

        this.browser = await this.pup.launch(options);
    }
    async getPage(){
        if(this.browser){
            this.page = await this.browser.newPage();
            await this.page.setViewport({ width: 1350, height: 768 });
            await this.page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
            await this.page.setCacheEnabled(false);
        }else return false;
    }

    async goToUrl(){
        if(this.page && this.url){
           await this.page.goto(this.url, { waitUntil: 'load', timeout: 10000 }).catch((res)=> {
               console.log('goToUrl Fail', (process.env.IN_DEVELOPMENT == 'true' ? res : ('Not loading page ' + this.url)));
               process.exit(1);
        }) ;
        }else return false;
    }
    async setLogs(){
        if(!this.page) return false;
        this.page.on('console', (consoleObj) => {
            if (process.env.IN_DEVELOPMEN6T ==  'true'){
                console.log(consoleObj.text());
            }
        });
    }

    async close(){
        if(this.browser){
            await this.page.waitFor(1000);
            await this.browser.close();
        }else return false;
    }

    async inPage(){
        if(!this.page || !this.numAbono) return false;
        await this.page.select(this.select,this.numAbono.select);
        await this.page.waitFor(1000);
        await this.page.focus(this.input);
        await this.page.waitFor(3000);
        await this.page.keyboard.type(this.numAbono.input);
        await this.page.click(this.sendButton);
        await this.page.waitForNavigation({ waitUntil: 'domcontentloaded' })

    }

    async evaluate(){
        if (!this.page) return false;
        let result = await this.page.evaluate(selector => {
            console.log("dentro del evaluate")
            let data = $(selector);
            let dataFinal = {};
            for(let i in data){
                dataFinal[i] = data[i].innerHTML;
            }
            return dataFinal;

        }, this.resultTable)
        .catch((e) => console.error(e));
        let finalData = Helpers.getAbonoResultData(result)
        return finalData;
    }

    async getResults(){
        return this.evaluate();
    }
}



module.exports = PuppeteerPack

