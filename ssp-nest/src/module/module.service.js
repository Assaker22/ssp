const { v4: uuidv4 } = require('uuid');
const { Injectable } = require('@nestjs/common');
const { default: db } = require('../db');

@Injectable()
class ModuleService {
  create({ project, resources, tasks, evidenceText, mediaUrls }) {
    const module = {
      id: uuidv4(),
      project,
      resources,
      tasks,
      evidenceText,
      mediaUrls,
    };
    db.modules.push(module);
    return module;
  }

  findAll() {
    return db.modules;
  }
}

module.exports = { ModuleService };
