import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack";
import { GenerateSW } from "@aaroon/workbox-rspack-plugin";

export default defineConfig({
  server: {
    port: 3002,
  },
  dev: {
    assetPrefix: "http://localhost:3002",
  },
  html: {
    tags: [{ tag: "link", attrs: { rel: "manifest", href: "manifest.json" } }],
  },
  tools: {
    rspack: (config, { appendPlugins }) => {
      config.output!.uniqueName = "root";
      appendPlugins([
        new ModuleFederationPlugin({
          name: "root",
          remotes: {
            dashboard1: "dashboard1@http://localhost:3000/mf-manifest.json",
            dashboard2: "dashboard2@http://localhost:3001/mf-manifest.json",
          },
          shared: ["react", "react-dom"],
        }),
        new GenerateSW({
          runtimeCaching: [
            {
              urlPattern: ({
                url: { origin, pathname },
                request: { destination },
              }) => {
                return (
                  origin === "http://localhost:3000" &&
                  pathname.indexOf("mf-manifest.json") === -1 &&
                  destination !== "style"
                );
              },
              handler: async ({ event, request, url }) => {
                const checkIsAsync = (path: string) => {
                  return path.indexOf("/async/") > -1;
                };

                const getFileName = (url: string) => {
                  const isAsync = checkIsAsync(url);
                  let fileNameWithHash = "";

                  if (isAsync) {
                    fileNameWithHash = url.split("/static/js/async/")[1];
                  } else {
                    fileNameWithHash = url.split("/static/js/")[1];
                  }
                  const fileNameOld = fileNameWithHash.split(".")[0];

                  return fileNameOld;
                };

                console.log("cache handler starterd");
                const cache = await caches.open("first-module");
                const keys = await cache.keys();
                const isElementCached = keys.find(
                  (elem) => elem.url === url.href
                );

                console.log(isElementCached, "isElementCached");

                if (isElementCached) {
                  const response = await cache.match(request);
                  console.log(response, "response");
                  return response as Response;
                } else {
                  const newElementFileName = getFileName(url.pathname);
                  const oldFileVersionUrl = keys.find((elem) => {
                    const oldElementFileName = getFileName(elem.url);
                    return oldElementFileName === newElementFileName;
                  });
                  console.log(newElementFileName, "newElementFileName");
                  console.log(oldFileVersionUrl, "oldFileVersionUrl");
                  if (oldFileVersionUrl) {
                    await cache.delete(oldFileVersionUrl.url);
                  }
                  const response = await fetch(request);
                  const responseClone = response.clone();

                  await event.waitUntil(cache.put(request, responseClone));

                  return response;
                }
              },
              options: {
                cacheName: "first-module",
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: ({
                url: { origin, pathname },
                request: { destination },
              }) => {
                return (
                  origin === "http://localhost:3001" &&
                  pathname.indexOf("mf-manifest.json") === -1 &&
                  destination !== "style"
                );
              },
              handler: async ({ event, request, url }) => {
                const checkIsAsync = (path: string) => {
                  return path.indexOf("/async/") > -1;
                };

                const getFileName = (url: string) => {
                  const isAsync = checkIsAsync(url);
                  let fileNameWithHash = "";

                  if (isAsync) {
                    fileNameWithHash = url.split("/static/js/async/")[1];
                  } else {
                    fileNameWithHash = url.split("/static/js/")[1];
                  }
                  const fileNameOld = fileNameWithHash.split(".")[0];

                  return fileNameOld;
                };

                console.log("cache handler starterd");
                const cache = await caches.open("second-module");
                const keys = await cache.keys();
                const isElementCached = keys.find(
                  (elem) => elem.url === url.href
                );

                console.log(isElementCached, "isElementCached");

                if (isElementCached) {
                  const response = await cache.match(request);
                  console.log(response, "response");
                  return response as Response;
                } else {
                  const newElementFileName = getFileName(url.pathname);
                  const oldFileVersionUrl = keys.find((elem) => {
                    const oldElementFileName = getFileName(elem.url);
                    return oldElementFileName === newElementFileName;
                  });
                  console.log(newElementFileName, "newElementFileName");
                  console.log(oldFileVersionUrl, "oldFileVersionUrl");
                  if (oldFileVersionUrl) {
                    await cache.delete(oldFileVersionUrl.url);
                  }
                  const response = await fetch(request);
                  const responseClone = response.clone();

                  await event.waitUntil(cache.put(request, responseClone));

                  return response;
                }
              },
              options: {
                cacheName: "second-module",
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        }),
      ]);
    },
  },
  plugins: [pluginReact()],
});
