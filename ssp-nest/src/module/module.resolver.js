const { Resolver, Query, Mutation } = require('@nestjs/graphql');
const { Injectable } = require('@nestjs/common');
const { Module } = require('./module.entity');

@Injectable()
@Resolver(() => Module)
class ModuleResolver {
  constructor(moduleService) {
    this.moduleService = moduleService;
  }

  @Query(() => [Module])
  findAllModules() {
    return this.moduleService.findAll();
  }

  @Mutation(() => Module)
  createModule(_, args) {
    return this.moduleService.create(args);
  }

  @Mutation(() => Module, { nullable: true })
  deleteModule(_, args) {
    return this.moduleService.delete(args?.id);
  }
}

module.exports = { ModuleResolver };
