// MindHub service worker — jen pro upozornění (nic neukládá do cache)
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const target = (e.notification.data && e.notification.data.view) || '';
  e.waitUntil((async () => {
    const all = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const c of all) { try { await c.focus(); c.postMessage({ type: 'mh-open', view: target }); return; } catch (x) {} }
    await self.clients.openWindow('./' + (target ? '#' + target : ''));
  })());
});
