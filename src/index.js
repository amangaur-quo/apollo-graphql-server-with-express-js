import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import * as AppModels from './models';
import { PORT, DB_URI } from './config';
import { typeDefs, resolvers } from './graphql';
import AuthMiddleware from './middlewares/auth';
import { join } from 'path';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { authDirectiveTransformer } from './graphql/directives';

// Initialize the Express Application
const app = express();
app.use(AuthMiddleware);
app.use(express.static(join(__dirname, './uploads')));

const startApp = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log('Mongoose Client has been connected successfully.');

    let schema = makeExecutableSchema({
      typeDefs,
      resolvers,
    });
    schema = authDirectiveTransformer(schema, 'isAuth');

    const apolloServer = new ApolloServer({ schema });
    await apolloServer.start();

    app.use(
      cors(),
      json(),
      expressMiddleware(apolloServer, {
        context: async ({ req }) => {
          let { isAuth, user } = req;
          return {
            req,
            isAuth,
            user,
            ...AppModels,
          };
        },
      })
    );

    app.listen(PORT, () => {
      console.log(`Server started on PORT ${PORT}`);
    });
  } catch (error) {
    console.log({ message: error.message });
  }
};

startApp();
