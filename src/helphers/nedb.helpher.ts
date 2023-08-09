import { createClient } from "redis";
const Datastore = require('nedb');
const  db = new Datastore({autoload: true});


const client = createClient();

client.on('error', err => console.log('Redis Client Error', err));



export const getToken =async ()=>{
   const promise = new Promise((resolve, reject)=>{
    db.find({ name: 'token' }, (err: any, matchingData: any) => {
        if (err) {
            console.error('Error querying data:', err);
            reject(err);
        } else {
            console.log('Matching data:', matchingData);
            if(matchingData.length == 0){
                resolve('');
            }
            else{
                resolve(matchingData[0].token) ;
            }
           
        }
    });
   });
   return promise;

}

export const setToken =async (token: string)=>{
    const promise = new Promise(async (resolve, reject)=>{
        const tk = await getToken();
        if(tk){
         //update
         db.update({name: 'token'}, {token}, (err: any, insertedData: any) => {
             if (err) {
                 reject(err)
             } else {
                 console.log('Data updated:', insertedData);
                 resolve(insertedData) ;
             }
         });
        }
        else{
         //create
         db.insert({name: 'token', token}, (err: any, insertedData: any) => {
             if (err) {
                 reject(err)
             } else {
                 console.log('Data inserted:', insertedData);
                 resolve(insertedData) ;
             }
         });
        }
    })

    return promise;
   
    }

