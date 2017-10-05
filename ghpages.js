/* global rm, cp, ls*/
require('shelljs/global');
//var fs = require('fs');

var matches = ls('../d3-react');
if (!(matches && matches.length)) {
  throw new Error('Expected to find "../d3-react/"');
}

console.log('Cleaning contents of directory "../d3-react/"...');
rm('-rf', '../d3-react/*');

console.log('Copying "dist/" to "../d3-react/"...');
cp('-rf', 'dist/*', '../d3-react/');

console.log('Finished updating gh-pages folder. Remember to `git push`.');
