import React, { AsyncStorage } from 'react-native';
import DBHelper from '../dao/DBHelper';
import * as AppConstants from '../constants/AppConstants';

class CacheService{
    constructor(){
        this.cache = new Map();
    }

    init(){
        let sqlStmt = "SELECT * from Preferences";
        let that = this;
        let loadPreferencesPromise = DBHelper.executeQuery(AppConstants.CONTACTS_DB, sqlStmt);
        loadPreferencesPromise.then(function(resultSet){
            for(let i in resultSet){
                let row = resultSet[i];
                that.set(row.key, row.value);
            }
        });
        return loadPreferencesPromise;
    }

    set(key, value){
        this.cache.set(key, value);
    }

    get(key){
        return this.cache.get(key);
    }

    async isAppRegistered(){
        let isRegistered = false;
        let sqlStmt = "SELECT value from Preferences where key = 'phoneNumber'";
        try{
            let results = await DBHelper.executeQuery(AppConstants.CONTACTS_DB, sqlStmt);
            if(results && results.length > 0){
                console.log("app is registered"+results);
                isRegistered = true;
            }
        }catch(err){
            //this is required if tables are not created yet.
            console.log("unable to get registration status "+ err);
        }

        return isRegistered;
    }

    setAndPersist(key, value){
        this.set(key, value);
        let sqlStmt = 'INSERT OR REPLACE into Preferences (key, value) values (:key, :value)';
        let params  = {key: key, value: value};
        return DBHelper.executeUpdate(AppConstants.CONTACTS_DB, sqlStmt, params );
    }

}

export default new CacheService();