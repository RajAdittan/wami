/* 
 * api    : wami
 * desc   : A node.js RESTful API for querying classic whatami features
 * author : Rajamohan Adittan
 * email  : rajamohane@gmail.com
 *
 */

import { info } from 'console';
import * as express from 'express';
import * as os from "os";
import { log } from 'util';
import { IConfig } from './config';

const app = express();
const config: IConfig = require('../config.json');
const apiBase = '/'+config.api+'/'+config.version+'/'+config.server;
app.listen(config.port, config.hostname, () => {
  log('wami-server started');
  info('\t\t\thostname:\t' + config.hostname);
  info('\t\t\tport:\t\t' + config.port);
  info('\t\t\tserver:\t\t' + config.server);
  info('\t\t\tapi-endpoint:\t' + apiBase);
});

app.route(apiBase).get((req, res) => {
    log('api endpoint['+ req.url + '] called');
    res.send({
       host: [{ hostname: os.hostname(), hint: apiBase+'/hostname'} ,
        { type: os.type(), hint: apiBase+'/type'},
        { platform: os.platform(), hint: apiBase+'/platform' },
        { arch: os.arch(), hint: apiBase+'/arch' },
        { release: os.release(), hint: apiBase+'/release' },
        { uptime: os.uptime(), hint: apiBase+'/uptime' },
        { memory: '<hint>', hint: apiBase+'/memory' },
        { cpus: '<hint>', hint: apiBase+'/cpu' },
        { networkInterfaces: '<hint>', hint: apiBase+'/nic' }
       ]
    });
});

app.route('/').get((req, res)=> {
   res.redirect(apiBase);
});

app.route(apiBase+'/hostname').get((req, res) => {
    log('api endpoint['+ req.url + '] called');
    res.send(os.hostname());
});

app.route(apiBase+'/type').get((req, res) => {
    log('api endpoint['+ req.url + '] called');
    res.send(os.type());
});

app.route(apiBase+'/platform').get((req, res) => {
    log('api endpoint['+ req.url + '] called');
    res.send(os.platform());
});

app.route(apiBase+'/arch').get((req, res) => {
    log('api endpoint['+ req.url + '] called');
    res.send(os.arch());
});

app.route(apiBase+'/release').get((req, res) => {
    log('api endpoint['+ req.url + '] called');
    res.send(os.release());
});

app.route(apiBase+'/uptime').get((req, res) => {
    log('api endpoint['+ req.url + '] called');
    res.send(''+os.uptime());
});

app.route(apiBase+'/memory').get((req, res) => {
    log('api endpoint['+ req.url + '] called');
    res.send({
        memory: [ {total: os.totalmem()},
        {available: os.freemem()}
    ]});
});

app.route(apiBase+'/available').get((req, res) => {
    log('api endpoint['+ req.url + '] called');
    res.send(''+os.freemem());
});

app.route(apiBase+'/cpu').get((req, res) => {
    log('api endpoint['+ req.url + '] called');
    res.send(os.cpus());
});

app.route(apiBase+'/nic').get((req, res) => {
    log('api endpoint['+ req.url + '] called');
    res.send(os.networkInterfaces());    
});

app.route(apiBase+'/endian').get((req, res) => {
    log('api endpoint['+ req.url + '] called');
    res.send(os.endianness());
});

app.route(apiBase+'/home').get((req, res) => {
    log('api endpoint['+ req.url + '] called');
    res.send(os.homedir());
});

app.route(apiBase+'/tmp').get((req, res) => {
    log('api endpoint['+ req.url + '] called');
    res.send(os.tmpdir());
});

app.route(apiBase+'/user').get((req, res) => {
    log('api endpoint['+ req.url + '] called');
    res.send(os.userInfo());
});