import mysql from "mysql2/promise";
import conf from "@/conf/conf";
const db_pool = mysql.createPool({
    host: conf.my_sql_host,
    user: conf.my_sql_user,
    database: conf.my_sql_database,
    password: conf.my_sql_password,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });

export default db_pool

