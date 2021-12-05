#!/bin/bash


./node_modules/.bin/sequelize model:generate --name AnalyticsAccount --attributes \
perfAnalyticsId:string,\
accountName:string,\
allowedDomains:string



./node_modules/.bin/sequelize model:generate --name AnalyticsEntry --attributes \
analyzeSessionUUID:string,\
analyzeStartTimestamp:decimal,\
ttfb:decimal,\
fcp:decimal,\
requestTime:decimal,\
responseTime:decimal,\
dnsLookUp:decimal,\
connectionTime:decimal,\
tlsTime:decimal,\
domContentLoad:decimal,\
redirectTime:decimal,\
redirectCount:decimal,\
unloadTime:decimal,\
domInteractive:decimal,\
domComplete:decimal

./node_modules/.bin/sequelize model:generate --name ResourceAnalyticsEntry --attributes \
analyzeSessionUUID:string,\
analyzeStartTimestamp:decimal,\
initiatorType:string,\
name:string,\
requestTime:decimal,\
responseTime:decimal,\
fetchTime:decimal,\
redirectTime:decimal