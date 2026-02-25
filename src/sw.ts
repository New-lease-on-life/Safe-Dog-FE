import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { Serwist } from "serwist";
import { defaultCache } from "@serwist/next/worker";

declare const self: SerwistGlobalConfig & {
  __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addEventListener: (type: string, listener: (event: any) => any) => void;
  registration: {
    showNotification: (
      title: string,
      options?: Record<string, unknown>,
    ) => Promise<void>;
  };
};

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: defaultCache,
});

serwist.addEventListeners();

self.addEventListener("push", (event) => {
  let data: { title?: string; body?: string } = {
    title: "Test",
    body: "Push Test",
  };
  try {
    data = event.data?.json() ?? data;
  } catch {
    data.body = event.data?.text() ?? data.body;
  }
  event.waitUntil(
    self.registration.showNotification(data.title ?? "safedog", {
      body: data.body,
      icon: "/icons/icon-192x192.png",
    }),
  );
});
