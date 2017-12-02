export default {
  entry: 'dist/index.js',
  dest: 'dist/bundles/smartsearch.umd.js',
  sourceMap: false,
  format: 'umd',
  moduleName: 'ng.smartsearch',
  globals: {
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
  }
}
