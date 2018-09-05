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
import {min} from "moment";

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
        { memory: Math.round(os.totalmem()/(1024*1024*1024)) +' GB', hint: apiBase+'/memory' },
        { cpus: os.cpus().length, hint: apiBase+'/cpu' },
        { endian: os.endianness(), hint: apiBase+'/endian'},
        { networkInterfaces: 'see hint', hint: apiBase+'/nic' },
        { user: "see hint", hint: apiBase+'/user'}
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
    let upTime = os.uptime();
    const minutes = 1000 * 60;
    const hours = minutes * 60;
    const days = hours * 24;
    let upTimeStr = Date() + ' up ' + Math.round(upTime/days) + ' days :' +
        Math.round(upTime/hours) + ' hours :' +
        Math.round(upTime/minutes) + ' minutes';
    res.send(upTimeStr);
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
    let endian = os.endianness();
    if(endian==='LE') {
        res.send('Little Endian');
    } else {
        res.send('Big Endian');
    }
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