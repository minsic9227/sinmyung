// 크롬이 '설치'를 허락하려면 서비스 워커가 있어야 한다. 아무것도 저장하지 않고 그대로 인터넷에서 받아온다
self.addEventListener("install", function () { self.skipWaiting(); });
self.addEventListener("activate", function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener("fetch", function (e) { e.respondWith(fetch(e.request)); });

// 서버(Apps Script)가 Firebase로 보낸 알림을 휴대폰 알림으로 띄운다
self.addEventListener("push", function (e) {
  var p = {};
  try { p = e.data ? e.data.json() : {}; } catch (x) {}
  var d = p.data || p.notification || {};
  e.waitUntil(self.registration.showNotification(d.title || "신명금속 어플", {
    body: d.body || "",
    icon: "icon-192.png",
    badge: "icon-192.png",
    vibrate: [200, 100, 200],
    data: { link: d.link || "./" }
  }));
});

// 알림을 누르면 어플을 연다 (이미 열려 있으면 그 화면으로)
self.addEventListener("notificationclick", function (e) {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (list) {
    for (var i = 0; i < list.length; i++) if ("focus" in list[i]) return list[i].focus();
    return self.clients.openWindow("./");
  }));
});
