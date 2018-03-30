import { GraphQLObjectType, GraphQLObjectTypeConfig } from "graphql";

const mutationConfig: GraphQLObjectTypeConfig<null, null> = {
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
    })
};
export const mutation: GraphQLObjectType = new GraphQLObjectType(mutationConfig);