import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';
import { GenerateSW } from '@aaroon/workbox-rspack-plugin'

export default defineConfig({
  server: {
    port: 3002,
  },
  dev: {
    assetPrefix: 'http://localhost:3002'
  },
  html: {
    tags: [
      { tag: 'link', attrs: { rel: 'manifest', href: './manifest.json' } }
    ]
  },
  tools: {
    rspack: (config, { appendPlugins }) => {
      config.output!.uniqueName = 'root';
      appendPlugins([
        new ModuleFederationPlugin({
          name: 'root',
          remotes: {
            dashboard1: 'dashboard1@http://localhost:3000/mf-manifest.json',
            dashboard2: 'dashboard2@http://localhost:3001/mf-manifest.json',
          },
          shared: ['react', 'react-dom']
        }),
        new GenerateSW(),
      ])
    }
  },
  plugins: [pluginReact()],
});
