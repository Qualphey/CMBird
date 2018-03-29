"use strict"

const fs = require('fs-extra');
const path = require('path');

const Manager = require("./manager.js");

module.exports = class Templates extends Manager {
  constructor(router, posts) {
    var pages_dir = global.cmb_config.templates_path;

    if (!fs.existsSync(pages_dir)){
      fs.mkdirSync(pages_dir);
    }

    super(router, pages_dir, {
      path_prefix: '/t',
      command_path: global.cmb_config.admin_path+"/templates.io",
      posts: posts
    });
  }
}
