const pkg = require('./package.json')
const name = pkg.name

module.exports = {
  apps: [
    {
      name,
      script: 'npm',
      args: 'run production',
      min_uptime: '5s',
      max_restarts: 5,
    },
  ],
}
