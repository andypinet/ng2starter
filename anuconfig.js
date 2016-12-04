exports.globalConfig = {
    buildFolder: "/Users/tongguwei/electronproject/electron-build",
    workFolder: "/Users/tongguwei/frontprojects/ng2-starter/src/assets/",
    destFolder: "/Users/tongguwei/frontprojects/ng2-starter/src/assets/"
};

exports.sassConfig = {
    watchpath: "/sass/**/*.scss",
    srcpath: "/sass/index.scss",
    destfolder: "/css/",
    debug: true,
    postcss: {
        assets: {
            relative: 'css',
            basePath: '/Users/tongguwei/frontprojects/ng2-starter/src/assets/',
            loadPaths: ['images/']
        }
    }
};

exports.es6Config = {
    watchpath: "/engineer/js/**/*.js",
    srcpath: "/engineer/js/controller/",
    destfolder: "/js/controller/",
    debug: true
};
