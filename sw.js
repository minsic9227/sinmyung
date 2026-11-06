// 크롬이 '설치'를 허락하려면 서비스 워커가 있어야 한다. 아무것도 저장하지 않고 그대로 인터넷에서 받아온다
self.addEventListener("install", function () { self.skipWaiting(); });
self.addEventListener("activate", function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener("fetch", function (e) { e.respondWith(fetch(e.request)); });
