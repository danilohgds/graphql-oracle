import { GraphQLFieldConfig, GraphQLNonNull, GraphQLString, GraphQLObjectType, GraphQLList, GraphQLID } from "graphql";
import { OracleContext } from "../context/oracleContext";
var oracledb = require('oracledb');
import *  as oracleI from 'oracledb';

export const countryType = new GraphQLObjectType({
    name: 'country',
    description: 'A country from HR table',
    fields: () => ({
        countryId: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The person number for this client',
            resolve: (obj: any) => obj.countryId
        },
        countryName: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The name of the client',
            resolve: (obj: any) => obj.countryName
        },
        regionId: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The person number for this client',
            resolve: (obj: any) => obj.regionId
        }
    }),
});

export const countriesQuery: GraphQLFieldConfig<null, any> = {
    description: 'Countries Query in HR Schema',
    type: new GraphQLList(countryType),
    resolve: (obj: any, args: {}, context: any) => {    
        return Promise.resolve(context.managers.countryManager.getCountriesPooled(context.oracleConfig));
    }
};