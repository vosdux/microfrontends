import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';

export default defineConfig({
  server: {
    port: 3000,
  },
  dev: {
    assetPrefix: 'http://localhost:3000'
  },
  output: {
    assetPrefix: 'http://localhost:3000',
  },
  tools: {
    rspack: (config, { appendPlugins }) => {
      config.output!.uniqueName = 'dashboard1';
      appendPlugins([
        new ModuleFederationPlugin({
          name: 'dashboard1',
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
