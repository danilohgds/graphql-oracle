import { countryType } from "./countries.query";
import { GraphQLNonNull, GraphQLInputObjectType, GraphQLFieldConfig, GraphQLFieldConfigArgumentMap, GraphQLArgumentConfig, GraphQLObjectType } from "graphql";
import { OracleContext } from "../context/oracleContext";
import { GraphQLString } from "graphql/type/scalars";

export const addCountryInput = new GraphQLInputObjectType({
    name: 'addCountryInput',
    description: 'Type to insert a new document',
    fields: {
        countryId: { type: new GraphQLNonNull(GraphQLString) },
        countryName: { type: new GraphQLNonNull(GraphQLString) }
    }
});

interface IaddCountryInput {
    countryId: string;
    countryName:string;
}
  
const argumentConfig : GraphQLArgumentConfig = {
    type: addCountryInput,    
    description: 'A country Input Argument'
};

const argumentMap :GraphQLFieldConfigArgumentMap = {
    country: argumentConfig
};

export const addCountryMutation: GraphQLFieldConfig<null, OracleContext> = {
    type: GraphQLString,
    args: argumentMap,    
    description: 'a mutation sample',
    resolve: (obj: any, args: any, context: OracleContext) => {
        console.log(args);
        return Promise.resolve(context.managers.countryManager.getCountriesPooled(args.countryName));
    }
};
