/**
 * Generate HTML Plugins
 */

const path = require('path');
const fs = require('fs');
const NunjucksWebpackPlugin = require('nunjucks-webpack-plugin');

const directories = []
function walkDir(dir, parrent = '') {
    var files = fs.readdirSync(dir)
    for (var x in files) {
        var next = path.join(dir, files[x]);
        if (fs.lstatSync(next).isDirectory() == true) {
            walkDir(next, parrent + '/' + files[x]);
        } else {
            directories.push([path.parse(files[x]).name, (parrent + '/').slice(1)])
        }
    }
    return directories
}

const helper = {
    getPages: (path) => {
        return walkDir(path).map(
            name =>
                new NunjucksWebpackPlugin({
                    templates: [{
                        from: `${path}/${name[1]}${name[0]}.njk`,
                        to: `${name[1]}${name[0]}.html`
                    }]
                }),
        );
    },
    getEntries: (dir) => {
        let entry = {}
        fs.readdirSync(dir)
            .forEach(file => {
                const name = file.split('.js')[0]
                entry[name] = `${dir}/${name}.js`
            })
        return entry
    }
};

module.exports = helper