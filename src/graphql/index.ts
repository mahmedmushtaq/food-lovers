import { NonEmptyArray, buildSchema } from "type-graphql";
import { GraphQLSchema } from "graphql";
import { UserResolver } from "./resolvers/UserResolver";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { Express } from "express";
import { authorization } from "./middleware/authorization";
import { RestaurantResolver } from "./resolvers/RestaurantResolver";

class GraphQl {
  private _schema: GraphQLSchema;

  private resolvers(): NonEmptyArray<Function> | NonEmptyArray<string> {
    return [UserResolver, RestaurantResolver];
  }

  async buildGraphQLSchema() {
    this._schema = await buildSchema({
      resolvers: this.resolvers(),
      validate: { forbidUnknownValues: false },
      nullableByDefault: false,
      authChecker: authorization,
    });
  }

  async startApolloServer(app: Express) {
    await this.buildGraphQLSchema();
    const apolloServer = new ApolloServer({
      schema: graphQl.schema,
      context: ({ req }) => {
        return {
          req,
        };
      },
      //  plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
  }

  get schema() {
    return this._schema!;
  }
}

const graphQl = new GraphQl();

export default graphQl;
