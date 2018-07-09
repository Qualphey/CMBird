

(async () => {
  try {
    const XHR = require('globals/utils/xhr_async.js');
    const Image = require('./image.js');

    require('./style.less');

    var GridUI = require('globals/grid.ui/index.js');

    var grid_ui = new GridUI(6, window.innerWidth, 10, 300);
    document.body.appendChild(grid_ui.element);

    window.addEventListener('resize', function() {
      grid_ui.resize(window.innerWidth);
    });

    var srcs = await XHR.get('/content-manager/gallery', {
      command: "all"
    });

    var images = [];

    for (var i = 0; i < srcs.length; i++) {
      var src = srcs[i];
      var image = await Image.init(src, grid_ui);
      if (image) {
        images.push(image);
        grid_ui.add(image.element);
      }
    }
 
    grid_ui.resize(window.innerWidth);

    var add_temp_btn = document.createElement("div");
    add_temp_btn.classList.add("gallery_ui_item");
    add_temp_btn.classList.add("gallery_ui_add");
    add_temp_btn.addEventListener("click", upload_image);
    grid_ui.add(add_temp_btn);

    var text = document.createElement("h3");
    text.innerHTML = "++";
    add_temp_btn.appendChild(text);

    function upload_image() {
      var form = document.createElement('form');
      form.enctype = "multipart/form-data";
      document.body.appendChild(form);

      var upload_input = document.createElement("input");
      upload_input.type = "file";
      upload_input.name = "filei";
      upload_input.multiple = "multiple";
      upload_input.style.display = "none";
      form.appendChild(upload_input);

      upload_input.addEventListener("change", async function(e) {
        var files = this.files;

        var formData = new FormData(form);

        var nsrcs = await XHR.post(
          '/content-manager/gallery-upload',
          { formData: formData },
          'access_token'
        );

        grid_ui.remove(add_temp_btn);

        for (var i = 0; i < nsrcs.length; i++) {
          var src = nsrcs[i];
          var existing = undefined;
          images.forEach(image => {
            if (image.src === src) {
              existing = image;
            }
          });


          if (existing) {
            grid_ui.remove(existing.element);
          }
          var image = await Image.init(src, grid_ui);
          if (image) {
            grid_ui.add(image.element);
          }
        }
        grid_ui.add(add_temp_btn);
      }, false);
      upload_input.click();
    }
  } catch (e) {
    console.error(e);
  }
})();


