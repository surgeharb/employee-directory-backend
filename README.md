<h1>Employee Directory
  <a
    href="http://nestjs.com/"
    target="blank"
  >
    <img
      src="https://nestjs.com/img/logo_text.svg"
      width="65"
      alt="Nest Logo"
    />
  </a>
</h1>

Live on https://api.directory.sergeharb.com/

### Production Build Run

- Create .env file `echo NODE_ENV=production > .env`
- Change the port number in config/env/production.env
- Make Sure you have a running mongod instance using `mongod`
- Install [PM2](http://pm2.keymetrics.io/): `npm install pm2 -g`
- Install dependencies and start server: `npm run create:directory`
- Watch Logs: `pm2 logs directory`

### Production Deployment

- Setup your custom server by following [these instructions](https://medium.com/@sergeharb.175/launching-mean-stack-server-with-nginx-rehl-2d8d584990c3)
- `cd /path/to/project/root` then [Build your Production Code](#production-build-run)
- Deploy your new changes then apply them using `npm restart`
- Your API server will now run like charm!

## Environment Configuration

Integrated Configuration Module so you can just inject `ConfigService`
and read all environment variables using 'getEnv(key)' function from `.env`, `config/env/development.env` or `config/env/production.env`.

## Additional CLI PowerUps
```bash
node ./scripts/generate schema products # generates products mongoose schema
node ./scripts/generate interface products # generates products document interface
node ./scripts/generate schema schedule --module users # add schema to other module
```

## GraphQL proxy resolvers

[GraphQL](https://graphql.org/) is a query language for APIs and a runtime for fulfilling those queries with the existing data.
Check out the docs for more details.
[https://docs.nestjs.com/graphql/quick-start](https://docs.nestjs.com/graphql/quick-start)

## Mongoose ODM integrated

[Mongoose](https://mongoosejs.com/) gives you possibility to use mongoDB.
Check out the docs for more details.
[https://docs.nestjs.com/techniques/mongodb](https://docs.nestjs.com/techniques/mongodb)

## Description

Employee Directory Backend crafted with ❤️ by [Serge Harb](https://sergeharb.com).