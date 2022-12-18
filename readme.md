## Project Setup
1. ``` npm i ```
2. PostgreSql Db docker instance ``` docker run --name postgresql-container -p 5432:5432 -e POSTGRES_PASSWORD=somePassword -e POSTGRES_DB=test -e POSTGRES_DEFAULT_EMAIL=user@gmail.com  -d postgres ```
3. PostgreSql admin4 docker instance ``` docker run -d -p 5050:5050 --name pgadmin  thajeztah/pgadmin4 ```