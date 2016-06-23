// SystemJS configuration file, see links for more information
// https://github.com/systemjs/systemjs
// https://github.com/systemjs/systemjs/blob/master/docs/config-api.md
/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
var map = {
    'underscore': 'vendor/underscore/underscore.js',
    'angular2-cookie': 'vendor/angular2-cookie',
    'angular2-moment': 'vendor/angular2-moment',
    'moment': 'vendor/moment/min',
    'jquery': 'vendor/jquery'
};
/** User packages configuration. */
var packages = {
    'angular2-cookie': { main: 'core.js', defaultExtension: 'js' },
    'moment': { main: 'moment-with-locales.min.js', defaultExtension: 'js' },
    'rss-feed-emitter': { main: 'rss-feed-emitter.js', defaultExtension: 'js' },
    'angular2-moment': { main: 'index.js', defaultExtension: 'js' },
    'jquery': { main: 'jquery.min.js', defaultExtension: 'js' },
};
////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
var barrels = [
    // Angular specific barrels.
    '@angular/core',
    '@angular/common',
    '@angular/compiler',
    '@angular/http',
    '@angular/router',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    // Thirdparty barrels.
    'rxjs',
    // App specific barrels.
    'app',
    'app/shared',
    'app/google-calendar',
    'app/weather',
    'app/news',
    'app/schedule',
    'app/clock',
    'app/settings',
    'app/dashboard',
    'app/quote',
];
var cliSystemConfigPackages = {};
barrels.forEach(function (barrelName) {
    cliSystemConfigPackages[barrelName] = { main: 'index' };
});
// Apply the CLI SystemJS configuration.
System.config({
    map: {
        '@angular': 'vendor/@angular',
        'rxjs': 'vendor/rxjs',
        'main': 'main.js'
    },
    packages: cliSystemConfigPackages
});
// Apply the user's configuration.
System.config({ map: map, packages: packages });
//# sourceMappingURL=system-config.js.map