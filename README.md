# Substrate-ETL

Long living script that reads from an archive node and loads select information to a Postgresql DB, a.k.a ETL.

The script itself lives in `nodeWatcher.ts`, and anyone can write their own `tasks` suited to their needs as long as they conform to the `Task` interface. It is agnostic of what server or db one decides to use.

### Instructions to run locally:
1. Push up the Postgresql and Prisma images: `docker-compose up -d`
2. Run the script which populates the database: `yarn start`
