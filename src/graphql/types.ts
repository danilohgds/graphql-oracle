import { GraphQLNamedType } from "graphql";
import { countryType } from "./types/countries.query";

export const types: GraphQLNamedType[] = [
    countryType
];