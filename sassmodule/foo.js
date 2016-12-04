var sassport = require('sassport');
var sass = require('node-sass');
var sassUtils = require("node-sass-utils")(sass);

module.exports = sassport.module('test')
    .functions({
        'greet($val)': function(val) {
            return sass.types.String('Hello, ' + val.getValue());
        },
        'greet-simple($value)': sassport.wrap(function(val) {
            return 'Hey, ' + val;
        }),
        'sl-type-of': sassport.wrap(function (val) {
            return sassUtils.typeOf(val);
        }),
        'zl-strip-unit': sassport.wrap(function (val) {
            sassUtils.assertType(val, "number");
            return parseFloat(val);
        })
    })
    .globals({
        '$a-number': 42,
        '$a-string': 'Sassport rocks',
        '$a-list': [1, 2, 3, 4, 5],
        '$a-map': {a: 1, b: 2, c: 3}
    })
    .exports({
      'default': __dirname + '/main.scss', // @import 'test';
    });
