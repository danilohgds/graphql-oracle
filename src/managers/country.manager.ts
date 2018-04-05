import * as oracleI from 'oracledb';

const countryQuery = 'select * from HR.countries where country_id = :id ';
const allCountriesQuery = 'select * from HR.countries';
const insertCountry = 'insert into HR.countries values(:id,:name)'

interface CountryList {
    countryId: number;
    countryName: string;
    regionId: number;
}

interface countryRow {
    COUNTRY_ID:string;
    COUNTRY_NAME: string;
    REGION_ID: string;
}

export class CountryManager {
    constructor(private oraclePool : oracleI.IConnectionPool, private config: any, private oracledb:any){
        
    }

    getAllCountries(){
        return this.oracledb.getConnection(this.config).then((connection:any) => {
            connection.clientIdentifier = 'getAllCountries';
            return connection.execute(allCountriesQuery).then((result: any) =>{                    
                    let cList:CountryList[] = Array<CountryList>();                    
                    result.rows.forEach((dbRow:any) => {
                        cList.push({
                            countryId : dbRow[0],countryName : dbRow[1],regionId:dbRow[2]                            
                        })
                    });
                    doRelease(connection);
                    return cList;
                }
            );
        });
    }

    getAllCountriesPooled(){
        return this.oraclePool.getConnection().then((connection:any) => {
            connection.clientIdentifier = 'getAllCountriesPooled';
            return connection.execute(allCountriesQuery).then((result: any) =>{
                    let cList:CountryList[] = Array<CountryList>();                    
                    result.rows.forEach((dbRow:any) => {
                        cList.push({
                            countryId : dbRow[0],countryName : dbRow[1],regionId:dbRow[2]                            
                        })
                    });
                    doRelease(connection);
                    return cList;
                }
            );
        });
    }

    getCountries(countryName:string){
        return this.oracledb.getConnection(this.config).then((connection:any) => {
            connection.clientIdentifier = 'getCountries';
            const params = {
                id: { type: oracleI.STRING, dir: oracleI.BIND_IN, val: countryName }
            };
            return connection.execute(countryQuery, params).then((result: any) =>{
                    console.log(result.rows[0]);
                    let cList:CountryList = {
                            countryId: result.rows[0][0],
                            countryName:  result.rows[0][1],
                            regionId:  result.rows[0][2]
                    }
                    doRelease(connection);
                    return cList;
                }
            );
        });
    }

    getCountriesPooled(countryName:string){
        return this.oraclePool.getConnection().then((connection:any) => {
            connection.clientIdentifier = 'getCountriesPooled';
            const params = {
                id: { type: oracleI.STRING, dir: oracleI.BIND_IN, val: countryName }
            };
            return connection.execute(countryQuery,params).then((result: any) =>{
                    console.log(result.rows[0]);
                    let cList:CountryList = {
                            countryId: result.rows[0][0],
                            countryName:  result.rows[0][1],
                            regionId:  result.rows[0][2]
                    }
                    doRelease(connection);
                    return cList;
                }
            );
        });
    }

    addCountry(countryId: string, countryName: string){
        return this.oraclePool.getConnection().then((connection:any) => {
            connection.clientIdentifier = 'addCountry';
            const params = {
                id: { type: oracleI.STRING, dir: oracleI.BIND_IN, val: countryId },
                name: { type: oracleI.STRING, dir: oracleI.BIND_IN, val: countryName }
            };
            return connection.execute(countryQuery,params).then((result: any) =>{
                    console.log(result.rows[0]);
                    let cList:CountryList = {
                            countryId: result.rows[0][0],
                            countryName:  result.rows[0][1],
                            regionId:  result.rows[0][2]
                    }
                    doRelease(connection);
                    return cList;
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