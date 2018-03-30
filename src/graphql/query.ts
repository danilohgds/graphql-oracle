import { GraphQLObjectType, GraphQLObjectTypeConfig } from 'graphql';
import { helloQuery } from './types/hello.query';
import { countriesQuery } from './types/countries.query';
import { OracleContext } from './context/oracleContext';

const queryConfig: GraphQLObjectTypeConfig<null, OracleContext> = {
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        hello: helloQuery,
        countries: countriesQuery
    })
};

export const query: GraphQLObjectType = new GraphQLObjectType(queryConfig);