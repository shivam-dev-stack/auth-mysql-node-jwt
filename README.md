create a .env file at root folder 
and add 

DB_HOST = localhost\
DB_USER = add your db username\
DB_PASSWORD = add your db password\
DB_DATABASE = add database name \
DB_PORT = add port no. of db \
PORT = add port no. of your server \


create a table for user information in your DB

install following node modules \
"bcryptjs",\
"body-parser",\
"cors"",\
"dotenv",\
"express",\
"jsonwebtoken",\
"mysql",\
"nodemon",\

after installing modules post request on:\

http://localhost:8080/api/v1/user/register/ for sign up\
http://localhost:8080/api/v1/user/login/ for login\
http://localhost:8080/api/v1/user/get-user/ for get user\
