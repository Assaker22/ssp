const { ObjectType, Field, ID } = require('@nestjs/graphql');

@ObjectType()
class Module {
  @Field(() => ID)
  id;

  @Field(() => String)
  project;

  @Field(() => [String])
  resources;

  @Field(() => [String])
  tasks;

  @Field(() => String, { nullable: true })
  evidenceText;

  @Field(() => [String], { nullable: true })
  mediaUrls;
}

module.exports = { Module };
