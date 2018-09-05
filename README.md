#wami-api
A node.js RESTful API for querying current os, host details;

web-api: following are the list of api's supported by this version
- hostname
- type
- platform
- arch
- release
- uptime
- memory
- cpus
- networkInterfaces

web-api is developed using the following node modules
- @types
- body-parser
- dn
- express
- moment
- prettier
- tslint
- tslint-config-prettier

configure server:
change the default parameters set in the config.json

{
    "hostname": "Titan",
    "port": 9192,
    "api": "api",
    "version": "v1",
    "server": "wami"
}

bootup server:
start the server using the following command:

ts-node src\server.ts

1 Jun 08:09:10 - wami-server started

                        hostname:       Titan
                        port:           9192
                        server:         wami
                        api-endpoint:   /api/v1/wami



