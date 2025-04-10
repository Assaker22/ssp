const { Module } = require('@nestjs/common');
const { ModuleResolver } = require('./module.resolver');
const { ModuleService } = require('./module.service');

@Module({
  providers: [
    ModuleService,
    {
      provide: ModuleResolver,
      useFactory: (moduleService) => {
        return new ModuleResolver(moduleService);
      },
      inject: [ModuleService],
    },
  ],
  exports: [],
})
class ModuleModule {}

module.exports = { ModuleModule };
