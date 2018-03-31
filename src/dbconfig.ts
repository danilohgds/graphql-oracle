export const OracleConfig = {
  user: process.env.oracleUser || 'HR',
  password: process.env.oraclePass || 'ORACLE',
  connectString: process.env.connectString || 'localhost:1521/xe'
};

  