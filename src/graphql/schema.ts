import { mutation } from './mutation';
import { GraphQLSchema } from 'graphql';
import { types } from './types';
import { query } from './query';
//import {subscription} from './subscription';

export const appGraphQLSchema: GraphQLSchema = new GraphQLSchema({
    query,
    //mutation,
    //subscription,
    types
});
