import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';

export default defineConfig({
  server: {
    port: 3001,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Credentials': 'true',
    }
  },
  dev: {
    assetPrefix: 'http://localhost:3001'
  },
  output: {
    assetPrefix: 'http://localhost:3001'
  },
  tools: {
    rspack: (config, { appendPlugins }) => {
      config.output!.uniqueName = 'dashboard2';
      appendPlugins([
        new ModuleFederationPlugin({
          name: 'dashboard2',
          exposes: {
            './dashboard': './src/App.tsx',
          },
          shared: ['react', 'react-dom']
        })
      ])
    }
  },
  plugins: [pluginReact()],
});
