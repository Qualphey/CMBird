

const cookie = require('cookie');

module.exports = class {
  constructor(cfg, cms) {
    let command_path = cfg.command_path;
    let auth = cfg.auth;
    let pages_io = cms.pages;

    let err_response = function(res, text) {
      res.send(JSON.stringify({
        err: text
      }));
    }

      console.log('PAGESIO', command_path);

    cms.app.post(command_path, auth.orize, function(req, res) {
      var data = JSON.parse(req.body.data);
      /*
        {
          command: "add"|"rm",
          name: "string" - needed on `add` and `rm` commands
        }
      */
      switch (data.command) {
        case 'select':
          switch (data.method) {
            case "all":
              res.send(JSON.stringify( pages_io.all() ));
              break;
            case "name":
              if (data.name && data.name != '') {
                res.send(JSON.stringify( pages_io.select(data.name) ));

              } else {
                res.send(JSON.stringify({ err: "Name parameter missing" }));
              }
              break;
            case "all_from_list":
              if (data.list && data.list != '') {
                res.send(JSON.stringify( pages_io.all_from_list(data.list) ));
              } else {
                res.send(JSON.stringify({ err: "List parameter missing" }));
              }
              break;
            case "name_from_list":
              if (data.list && data.list != '' && data.name && data.name != '') {
                res.send(JSON.stringify( pages_io.select_from_list(data.list, data.name) ));
              } else {
                res.send(JSON.stringify({ err: "List/Name parameter missing" }));
              }
              break;
            default:
              res.send(JSON.stringify({ err: "Invalid selection method: "+data.method }));
          }
          break;
        case 'add':
          if (data.name && data.name != '' && data.list && data.list != '') {
            let taget_list = pages_io.select_list_obj(data.list);
            res.send(JSON.stringify( taget_list.add(data.name) ));
          } else {
            res.send(JSON.stringify({ err: "Name/List parameter missing" }));
          }
          break;
        case 'rm':
          console.log("rm", data.list, data.name);
          if (data.name && data.name != '' && data.list && data.list != '') {
            let taget_list = pages_io.select_list_obj(data.list);
            res.send(JSON.stringify( taget_list.remove(data.name) ));
          } else {
            res.send(JSON.stringify({ err: "Name/List parameter missing" }));
          }
          break;/*
        case 'webpack':
          if (data.name) {
            var page = this_class.select_by_name(data.name);
            page.watching = page.compiler.run((err, stats) => {
              if (err) console.error(err);
              // Print watch/build result here...
              res.send(true);
            });
          } else {
            res.send("page name not defined");
          }
          break;*/
        case 'webpack-watch':
          let jwt_token = undefined;
          if (req.headers.cookie) {
            var cookies = cookie.parse(req.headers.cookie);
            if (cookies['access_token']) {
              jwt_token = cookies['access_token'];
            }
          }
          if (data.list && data.name) {
            let page = pages_io.select_obj(data.list, data.name);
            if (!page.watching) {
              page.watching = page.compiler.watch({
                aggregateTimeout: 300,
                poll: 1000
              }, (err, stats) => {
                if (err) console.error(err);
                console.log("clients", cms.router.clients.length);
                cms.router.clients.forEach(client => {
                  if (jwt_token === client.jwt) {
                    console.log("RESPONSE");
                    if (stats.hasErrors()) {
                      client.socket.emit("webpack-err", stats.toString());
                    } else {
                      client.socket.emit("webpack-done", stats.toString());
                    }
                  }
                });
              });
              res.send(true);
            } else if (page.watching) {
              page.watching.close(() => {
                page.watching = undefined;
                res.send(false);
              });
            }
          } else {
            res.send(JSON.stringify({ err: "Page/List name not defined" }));
          }
          break;
        default:
          console.error("PagesIO: unknown command", data.command);
      }
    });
  }
}
