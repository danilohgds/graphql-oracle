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

oraclePool.then((pool:any) => {
    let countryManager: CountryManager = new CountryManager(pool,OracleConfig,oracledb);
    
    const gqlContext : OracleContext = {
        oracleConfig: OracleConfig,
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
    app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })); // if you want GraphiQL enabled
    
    app.listen(PORT, () => {
        console.log(`GraphQL Server running in PORT ${PORT}`);
    });
});