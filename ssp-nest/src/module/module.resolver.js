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
    console.log('moduleService is:', this.moduleService);
    return this.moduleService.create(args);
  }
}

module.exports = { ModuleResolver };
