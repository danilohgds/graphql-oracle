const countryQuery = `select * from HR.countries where country_id = 'US'`;
import * as oracleI from 'oracledb';

interface CountryList {
    countryId: number;
    countryName: string;
    regionId: number;
}

export interface countryRow {
    COUNTRY_ID:string;
    COUNTRY_NAME: string;
    REGION_ID: string;
}

export class CountryManager {
    constructor(private oraclePool : oracleI.IConnectionPool, private config: any, private oracledb:any){
        
    }

    getCountries(){
        return this.oracledb.getConnection(this.config).then((connection:any) => {
            connection.clientIdentifier = 'getCountries';
            return connection.execute(countryQuery).then((result: any) =>{
                    console.log(result.rows[0]);
                    let cList:CountryList = {
                            countryId: result.rows[0][0],
                            countryName:  result.rows[0][1],
                            regionId:  result.rows[0][2]
                    }
                    doRelease(connection);
                    return [cList];
                }
            );
        });
    }

    getCountriesPooled(){
        return this.oraclePool.getConnection().then((connection:any) => {
            connection.clientIdentifier = 'getCountriesPooled';
            return connection.execute(countryQuery).then((result: any) =>{
                    console.log(result.rows[0]);
                    let cList:CountryList = {
                            countryId: result.rows[0][0],
                            countryName:  result.rows[0][1],
                            regionId:  result.rows[0][2]
                    }
                    doRelease(connection);
                    return [cList];
                }
            );
        });
    }
}


function doRelease(connection: any)
{
  console.log(`Closing connection identifier: ${connection.clientIdentifier} `);
  connection.close(
    function(err:any) {
      if (err) {
        console.error(err.message);
      }
    });
}