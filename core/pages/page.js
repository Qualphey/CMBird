
const nunjucks = require('nunjucks');

const fs = require("fs");
const path = require('path');

const webpack = require('webpack');
const jsonlint = require("jsonlint");

module.exports = class {
  constructor(cfg, cmbird, pages) {
    let app = cmbird.app;

    this.full_path = cfg.full_path || path.resolve(cfg.dir_path, cfg.name);
    this.http_path = cfg.custom_path || cfg.request_path || path.resolve(cfg.prefix, encodeURIComponent(cfg.name));

    this.name = cfg.name;

    let index_path = this.index_path = path.resolve(this.full_path, "index.html");
    let context_path = this.context_path = path.resolve(this.full_path, "context.json");
    let global_context_path = this.global_context_path = path.resolve(cmbird.globals_path, "context.json");
    this.update();

    if (!cfg.name) {
      cfg.name = cfg.full_path.split('/').pop();
    }

    this.path_prefix = cfg.prefix;

    if (!this.path_prefix) this.path_prefix = "";

    this.custom_paths = cfg.custom_paths;

    cfg.dir_path = cfg.dir_path || cfg.full_path;

    this.auth_func = cfg.auth_func;

    if (this.context) {
      if (this.context.required_rights) {
        this.auth_func = cfg.auth.orize_gen(this.context.required_rights);
      }
    }

    this.pages = pages;
    this.posts = pages.posts;

    if (cfg.custom_path) {
      app.get("/"+cfg.name, function(req, res) {
        res.redirect(cfg.custom_path);
      });
    }

    this.nunjucks_env = new nunjucks.Environment(new nunjucks.FileSystemLoader([
      cfg.dir_path,
      cmbird.globals_path
    ], {
      autoescape: true,
    //      watch: true,
      noCache: true
    }));

    this.compiler = webpack({
        watch: true,
        watchOptions: {
          aggregateTimeout: 300,
          poll: 1000
        },
        mode: 'development',
        entry: {
          './main': path.resolve(this.full_path, 'src/index.js'),
        },
        output: {
          path: this.full_path,
          filename: '[name].js'
        },
        resolve: {
          modules: [
            path.resolve(__dirname, '../../node_modules')
          ],
          alias: {
            globals: path.resolve(cmbird.globals_path, 'modules')
          }
        },
        module: {
            rules: [
              {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                  presets: ['es2017']
                }
              },
              {
                test: /\.json$/,
                loader: 'json-loader'
              },
              {
                test: /\.css$/,
                use: [ 'style-loader', {
                  loader: 'css-loader',
                  options: {
                    url: false
                  }
                }]
              },
              {
                test: /\.less$/,
                use: [{
                  loader: "style-loader"
                }, {
                  loader: "css-loader"
                }, {
                  loader: "less-loader" // compiles Less to CSS
                }]
              },
              {
                test: /\.(html)$/,
                use: {
                  loader: 'html-loader',
                  options: {
                    attrs: [':data-src']
                  }
                }
              }
            ]
        },
        stats: {
          colors: true
        },
        devtool: 'source-map'
    });

    var this_class = this;

    function obj_to_qstr(obj, prefix) {
      var str = [],
        p;
      for (p in obj) {
        if (obj.hasOwnProperty(p)) {
          var k = prefix ? prefix + "[" + p + "]" : p,
            v = obj[p];
          str.push((v !== null && typeof v === "object") ?
            serialize(v, k) : k + "=" + v);
        }
      }
      return str.join("&");
    }

    if (this.auth_func) {
      app.get(this.http_path, this.auth_func, async function(req, res) {
        try {
          this_class.update();
          this_class.context = await this_class.compile_context(this_class.context);
          this_class.context.sessions = [];
          if (req.query.access_token) {
            this_class.context.access_token = req.query.access_token;
          }

          if (req.customer_id) {
            this_class.context.customer_id = req.customer_id;
          }

          for (var sess_key in req.access_tokens) {
            this_class.context.sessions.push(sess_key);
          }

          if (this_class.context.accept_arguments) {
            this_class.context.args = req.query;
          }

          const req_path = req.path;
          if (req_path.slice(-1) != "/") {
            var repath = req_path+"/";
            if (Object.keys(req.query).length != 0 && req.query.constructor === Object) {
              repath += "?"+obj_to_qstr(req.query);
            }
            res.redirect(repath);
          } else {
            var result = await this_class.render_page(this_class.full_path);
            if (result.err) {
              console.error(result.err);
            } else {
              res.send(result.html);
            }
          }
        } catch (e) {
          console.error(e.stack)
        }
      });
      serve_dir(this.http_path, this.full_path, this.auth_func);
    } else {
      app.get(this.http_path, async function(req, res) {
        try {
          this_class.update();
          this_class.context = await this_class.compile_context(this_class.context);
          this_class.context.sessions = [];


          for (var sess_key in req.access_tokens) {
            this_class.context.sessions.push(sess_key);
          }

          if (this_class.context.accept_arguments) {
            this_class.context.args = req.query;
          }

          const req_path = req.path;
          if (req_path.slice(-1) != "/") {
            var repath = req_path+"/";
            if (Object.keys(req.query).length != 0 && req.query.constructor === Object) {
              repath += "?"+obj_to_qstr(req.query);
            }
            res.redirect(repath);
          } else {
            var result = await this_class.render_page(this_class.full_path);
      //      console.log("RESULT", result);
            if (result.err) {
              console.error(result.err);
            } else {
              res.send(result.html);
            }
          }
        } catch (e) {
          console.error(e.stack)
        }
      });
      serve_dir(this.http_path, this.full_path);
    }

    function serve_dir(dir_path, dir_file_path, auth) {
      if (fs.existsSync(dir_file_path)) {
        if (fs.lstatSync(dir_file_path).isDirectory()) {
          fs.readdirSync(dir_file_path).forEach(function(file) {
            const sub_path = path.resolve(dir_path, file);
            const sub_file = path.resolve(dir_file_path, file);
            if (fs.lstatSync(sub_file).isDirectory()) {
              serve_dir(sub_path, sub_file, auth);
            } else {
              if (auth) {
                app.get(sub_path, auth, function(req, res) {
                  res.sendFile(sub_file);
                });
              } else {
                app.get(sub_path, function(req, res) {
                  res.sendFile(sub_file);
                });
              }
            }
          });
        }
      }
    }
  }

  async render_page(page_dir_path) {
    try {

      var result = {};

      if (this.index_html) {
        if (this.context) {
          var rendered_html = this.nunjucks_env.render(this.index_path, this.context);
          result.html = rendered_html;
        } else {
          result.html = fs.readFileSync(this.index_path, "UTF-8");
        }
      } else {
        result.err = "No HTML!";
      }

      if (result.err) {
        var style = "font-family: monospace;";
        result.err = "<div style='"+style+"'>"+result.err.replace(/(?:\r\n|\r|\n)/g, '<br />')+"</div>"
      }

      return result;
    } catch (e) {
      console.error(e.stack)
    }
  }

  update() {
    if (fs.existsSync(this.index_path)) {
      try {
        this.index_html = fs.readFileSync(this.index_path, 'utf8');
      } catch (e) {
        console.error(e);
      }
    }
    this.context = false;
    if (fs.existsSync(this.context_path)) {
      try {
        this.context = JSON.parse(fs.readFileSync(this.context_path, 'utf8'));
      } catch (e) {
        this.context = {};
        console.error(e);
      }
    } else {
      this.context = {};
    }

    this.context.page_name = this.name;

    if (fs.existsSync(this.global_context_path)) {
      try {
         var global_context = JSON.parse(fs.readFileSync(this.global_context_path, 'utf8'));
        this.context = Object.assign(this.context, global_context);
      } catch (e) {
        console.error(e);
      }
    }
  }

  async compile_context(context) {
    try {
      if (context.posts && this.posts) {
        var tags = context.posts.split(" ");
        var result = await this.posts.select_by_tags(tags);

        context.posts = result;
      }

      if (context.lang) {
        const lang_json = fs.readFileSync(
          path.resolve(this.full_path, "lang", context.lang+".json")
        );
        context.lang = JSON.parse(lang_json);
      }

      if (context.menu) {
        var names = context.menu;
        context.menu = [];
        var page_list = this.pages.all();

        for (var n = 0; n < names.length; n++) {
          for (var p = 0; p < page_list.length; p++) {
            if (page_list[p].file == names[n]) {
              var path_prefix = this.path_prefix;
              while (path_prefix.slice(-1) === "/") {
                path_prefix = path_prefix.slice(0, -1);
              }
              var item = { name: names[n], path: path_prefix + "/" + names[n] };
              if (this.custom_paths) {
                this.custom_paths.forEach(function(cpath) {
                  const cpath_name = Object.keys(cpath)[0];
                  if (item.name == cpath_name) {
                    item.path = cpath[cpath_name];
                  }

                });
              }
              context.menu.push(item);
            }
          }
        }
      }

      return context;
    } catch (e) {
      console.error(e.stack)
    }
  }
}
