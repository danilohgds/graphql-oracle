import { GraphQLFieldConfig, GraphQLNonNull, GraphQLString } from 'graphql';
import { OracleContext } from '../context/oracleContext';

export const helloQuery: GraphQLFieldConfig<null,OracleContext> = {
    description: 'Hello Query',
    type: new GraphQLNonNull(GraphQLString),
    resolve: (obj: any, args: {}, context: OracleContext) => {
        return 'Hello GQL';
    }
};
