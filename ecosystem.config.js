module.exports = {
  apps: [
    {
      name: 'DevMet-backend',
      script: 'dist/main.js',
      exec_mode: 'cluster',
      instances: 'max',
      node_args: '-r ts-node/register', // 수정 필요
      // 또는
      // node_args: '-r <ts-node-path>', // 수정 필요
    },
  ],
};
