import * as oracleI from 'oracledb';
import { CountryManager } from '../../managers/country.manager';

export interface OracleContext {
    oracleConfig : any;
    managers: {
        countryManager: CountryManager;
    };
};