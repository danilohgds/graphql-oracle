import {Request, Response, NextFunction } from 'express';
import { GraphQLSchema } from 'graphql';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import * as bodyParser from 'body-parser';
import { appGraphQLSchema } from './graphql/schema';
import { OracleContext } from './graphql/context/oracleContext';
import { CountryManager } from './managers/country.manager';
import {OracleConfig } from './dbconfig'

const express=require('express');
const app = express();
const PORT = 3000;
var oracledb = require('oracledb');

process.env.UV_THREADPOOL_SIZE = '30';

//create the oracle pool object.
var oraclePool = oracledb.createPool({
    user: 'HR',
    password: 'ORACLE',
    connectString: 'localhost:1521/xe',
    poolMax: 30, 
    poolMin: 0, 
    poolPingInterval: 20,
    poolAlias: 'hrpool',
    _enableStats  : true
});


//pool is asynchronous, so you have to resolve the promise to obtain the real pool object.
oraclePool.then((pool:any) => {

    //managers will contain functions that access data, modify data, etc. This is only one of the available patterns in software development. Also note the injections being done.
    let countryManager: CountryManager = new CountryManager(pool,OracleConfig,oracledb);
    

    //context that will pass on all managers to the graphQL classes.
    const gqlContext : OracleContext = {
        managers: {
            countryManager
        }
    };
    
    app.get('/', (req: Request, res: Response) => {
        return res.send('Express Root Response');
    });
    
    
    app.use('/graphql', 
            bodyParser.json(), 
            graphqlExpress(
            {   schema: appGraphQLSchema,
                context: gqlContext,
            }
        )
    );

    //USE GRAPHIQL to perform tests.
    app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })); // This will allow you to send json requests to GRAPHQL. Else you may need a frontend app.
    
    app.listen(PORT, () => {
        console.log(`GraphQL Server running in PORT ${PORT}`);
    });
});