module.exports = {
  type: 'react-app',
  webpack: {
    copy: [
      { from: 'public/' }
    ],
    html: {
      template: 'demo/src/index.html',
      favicon: 'demo/src/favicon.ico'
    }
  }
}
