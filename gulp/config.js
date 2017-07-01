
var banner = [
  "/* ",
  " * <%= pkg.name %> <%= pkg.version %>",
  " * <%= pkg.description %>",
  " * MIT Licensed",
  " * ",
  " * Copyright (C) 2015 phi, http://phinajs.com",
  " */",
  "",
  "",
  "'use strict';",
  "",
  "",
].join('\n');

var files = [
  "core/object.js",
  "core/number.js",
  "core/string.js",
  "core/array.js",
  "core/date.js",
  "core/math.js",

  "phina.js",
  
  "geom/vector2.js",
  "geom/vector3.js",
  "geom/matrix33.js",
  "geom/rect.js",
  "geom/circle.js",
  "geom/collision.js",

  "util/support.js",
  "util/eventdispatcher.js",
  "util/tween.js",
  "util/ticker.js",
  "util/grid.js",
  "util/changedispatcher.js",
  "util/flow.js",
  "util/color.js",
  "util/random.js",
  "util/querystring.js",
  "util/ajax.js",

  "asset/asset.js",
  "asset/assetmanager.js",
  "asset/assetloader.js",
  "asset/file.js",
  "asset/script.js",
  "asset/texture.js",
  "asset/sound.js",
  "asset/soundmanager.js",
  "asset/spritesheet.js",
  "asset/font.js",

  "input/input.js",
  "input/mouse.js",
  "input/touch.js",
  "input/keyboard.js",
  "input/gamepad.js",
  "input/accelerometer.js",

  "app/updater.js",
  "app/interactive.js",
  "app/baseapp.js",
  "app/element.js",
  "app/object2d.js",
  "app/scene.js",

  "accessory/accessory.js",
  "accessory/tweener.js",
  "accessory/draggable.js",
  "accessory/flickable.js",
  "accessory/frameanimation.js",
  "accessory/physical.js",

  "dom/event.js",

  "graphics/canvas.js",
  "graphics/canvasrecorder.js",

  "display/displayelement.js",
  "display/plainelement.js",
  "display/shape.js",
  "display/sprite.js",
  "display/label.js",
  "display/displayscene.js",
  "display/canvaslayer.js",
  "display/canvasrenderer.js",
  "display/domapp.js",
  "display/canvasapp.js",


  "effect/wave.js",

  "ui/button.js",
  "ui/gauge.js",
  "ui/labelarea.js",

  "game/managerscene.js",
  "game/splashscene.js",
  "game/titlescene.js",
  "game/resultscene.js",
  "game/loadingscene.js",
  "game/countscene.js",
  "game/pausescene.js",
  "game/gameapp.js",

  "social/twitter.js",


  "box2d/box2dlayer.js",
  "box2d/box2dbody.js",

  "dirty.js"
];
files = files.map(function(f) {
  return './src/' + f;
});

module.exports = {
  package: require('../package.json'),

  banner: banner,
  files: files,

  build: {
    target: files,
    output: './build/',
  },

  uglify: {
    target: './build/phina.js',
    output: './build/',
  },

  watch: {
    target: ['build', 'uglify'],
  },
};
