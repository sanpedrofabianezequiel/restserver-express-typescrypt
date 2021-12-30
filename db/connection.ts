import {Sequelize} from 'sequelize';

 const db =  new Sequelize('rest-server-typescript','root','123456',{
     host:'localhost',
     dialect:'mysql'
 })

 export default db;