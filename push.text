var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BL1xFcXW3nV7tba06VIp_ou_8P7GMmnYRNujZ6qVzAFFmgLodAzIOggeCE5fh9RSZM2VQ_h9q1DtpzSCxsJ_nOo",
   "privateKey": "8l7BSOiL1xUa2Mj89KSu3dxt5VJZmLKP1lUyBPZffh0"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/eLPrG5NSbXo:APA91bGHW8_GFnEO8AOoW76cSCDA0KDmKK_9DibKQp14lRF3f_GXs-X704R1Q2h9R-sxZZUY2wIwQL1AzSNgYT7RjAG0jf3OZpLN8-2C027yEr8f-YoWw8Q31sbP0a6DSmutTn_zHuLp",
   "keys": {
       "p256dh": "BLznG5PXchKCjoRE1p7Lwh6Le1LVavENBKLS3OFs9bZJ8vBGEr7qpFs0rJZ3YjSvCfXCP9YPEqfWPsSNcow79Og=",
       "auth": "DlNL2KmIdLLrhccKLQ0RkA=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '9244255296349',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);