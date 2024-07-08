module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk',
      },
    ],
    [
      'import',
      {
        libraryName: 'element-ui',
        libraryDirectory: 'lib',
        style: true, // 导入组件的 CSS
      },
    ],
  ],
};
