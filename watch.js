#!/usr/bin/env node --harmony
/*jshint esnext:true */

/*
 * @author Bernard Dickens (https://bernard.ergodark.com)
 */

"use strict";

var shush   = require('shush');
var request = require('request');
var tcpp    = require('tcp-ping');

var config  = shush('config.json');

const PHONE      = config.phone;
const FREQUENCY  = config.checkFrequency;
const VERBOSE    = config.verbose;
const TARGETS    = config.targets;
const SCOREBOARD = config.scoreboard;

var printIfDebug = function(...msg)
{
    if(VERBOSE)
        console.log(...msg);
};

var panic = function(msg, fn)
{
    printIfDebug('>> PANIC!');
    printIfDebug(`Sending text "${msg}" to #${PHONE}`);

    request.post('http://textbelt.com/text', { number: PHONE, message: msg }, function(err, response, body)
    {
        printIfDebug('Textbelt send attempt:');
        printIfDebug('Error (nothing is good):', err);
        printIfDebug('HTTP status code:', response.statusCode);
        printIfDebug('Raw response body:', body);

        var bodyJSON = JSON.parse(body);

        printIfDebug('Response JSON:', bodyJSON);

        if(!bodyJSON.success)
            console.log('>> ERROR: Failed to send text via Textbelt!');

        fn();
    });
};

var loop = function(fn)
{
    return function()
    {
        printIfDebug('Next check will occur in about ${FREQUENCY} seconds');
        setTimeout(fn, FREQUENCY);
    };
};

var main = function()
{
    printIfDebug('Performing project 2 check...');
    printIfDebug('Making HTTP GET request to scoreboard @ ${SCOREBOARD}');

    request(SCOREBOARD, function(err, response/*, body*/)
    {
        printIfDebug('Request made');
        printIfDebug('Error: (nothing is good)', err);
        printIfDebug('HTTP status code:', response.statusCode);

        if(!err && response.statusCode == 200)
        {
            printIfDebug('Response from server received successfully! (status code 200)');

            TARGETS.forEach(function(target)
            {
                printIfDebug('Preparing to probe target ${target}');

                var components = target.split(':');
                var host = components[0];
                var port = components[1];

                printIfDebug('Host:', host);
                printIfDebug('Port:', port);

                tcpp.probe(host, port, function(err, available)
                {
                    printIfDebug('Probe complete!');
                    printIfDebug('Error (nothing is good):', err);
                    printIfDebug('Available:', available);

                    if(err || !available)
                        panic(`TARGET FAILURE! Could not access ${host}:${port}!!!`, loop(main));
                });
            });
        }

        else
            panic(`SCOREBOARD FAILURE! Problem accessing scoreboard (HTTP ${response.statusCode})!!!`, loop(main));
    });
};

printIfDebug('CONFIG DUMP:', config);
main();
