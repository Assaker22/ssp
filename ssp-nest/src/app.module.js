const { Module } = require('@nestjs/common');
const { GraphQLModule } = require('@nestjs/graphql');
const { ApolloDriver } = require('@nestjs/apollo');
const { ModuleModule } = require('./module/module.module');

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      typePaths: ['./src/schema.graphql'],
      playground: true,
    }),
    ModuleModule,
  ],
})
class AppModule {}

module.exports = { AppModule };
