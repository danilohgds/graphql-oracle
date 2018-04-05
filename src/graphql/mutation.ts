import { GraphQLObjectType, GraphQLObjectTypeConfig, GraphQLFieldConfigMap, GraphQLFieldConfig } from "graphql";
import { addCountryMutation } from "./types/countries.mutation";
import { OracleContext } from "./context/oracleContext";
import { GraphQLString } from "graphql/type/scalars";


const mutationConfigMap :GraphQLFieldConfigMap <null,OracleContext> = {
    addCountryMutation: addCountryMutation
  };

const mutationConfig:  GraphQLObjectTypeConfig<null, OracleContext> = {
    name: 'Mutation',
    fields: mutationConfigMap,
    description: `Root Mutation`
};

export const mutation: GraphQLObjectType = new GraphQLObjectType(mutationConfig);