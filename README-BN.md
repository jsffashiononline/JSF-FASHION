# JSF FASHION WEAR — Website Source

## এই ZIP-এ কী আছে
- Responsive fashion storefront
- Firebase Realtime Database থেকে live product list
- Admin login (Firebase Authentication)
- Admin থেকে product add / edit / delete
- Cloudinary unsigned image upload
- Cart summary এবং WhatsApp order link
- পরে লোগো যোগ করার upload option (Admin panel)

## প্রথমে যে সেটিংস লাগবে
1. `js/config.js` খুলুন।
2. Firebase Console → Project settings → General → Your apps থেকে Web App config কপি করে `firebaseConfig`-এ বসান।
3. Realtime Database URL ঠিক আছে কি না নিশ্চিত করুন।
4. Firebase Authentication → Sign-in method-এ Email/Password চালু করুন এবং আপনার admin user তৈরি করুন।
5. চাইলে admin user-এর UID `ADMIN_UID`-এ বসান।
6. Cloudinary-তে Upload Presets থেকে **Unsigned** preset তৈরি করুন। `cloudName` ও `uploadPreset` বসান।
7. `PAYMENT_INFO`-এ নিজের WhatsApp নম্বর/পেমেন্ট তথ্য বসান।

## Firebase Database
এই সাইট `products` path ব্যবহার করে। Admin panel এবং public store একই Firebase project/database ব্যবহার করলেই Admin-এ যোগ করা পণ্য storefront-এ দেখা যাবে।
`firebase/database.rules.json` একটি উদাহরণ। Production-এ deploy করার আগে নিজের admin UID অনুযায়ী নিরাপদ rules সেট করুন। Public read এবং authenticated admin write রাখুন; কখনো `.write: true` করে রাখবেন না।

উদাহরণ (নিজের Admin UID বসিয়ে):
```json
{
  "rules": {
    "products": {
      ".read": true,
      ".write": "auth != null && auth.uid === 'YOUR_ADMIN_AUTH_UID'"
    }
  }
}
```
Firebase Console → Realtime Database → Rules-এ যাচাই করে Publish করুন।

## চালানোর নিয়ম
ES module ব্যবহারের কারণে `index.html` সরাসরি `file://` দিয়ে না খুলে GitHub Pages বা অন্য static hosting-এ চালান। পুরো ফোল্ডারের ফাইল GitHub repository-তে আপলোড করুন।

## লোগো
Admin panel → Store Logo → Choose file → Save logo. এই সংস্করণে লোগোটি যে browser/device-এ save করবেন সেখানেই থাকবে। সব visitor-এর জন্য একই লোগো দেখাতে চাইলে পরে Cloudinary/Firebase Storage-এ logo URL সংরক্ষণ করে যুক্ত করতে হবে।

## গুরুত্বপূর্ণ Firebase সীমাবদ্ধতা
ZIP ফাইলে Firebase account, private service-account key, বা আপনার cloud database-এর ভেতরের live data স্বয়ংক্রিয়ভাবে ঢোকানো যায় না। এগুলো Firebase-এ আপনার অ্যাকাউন্টেই থাকে। এই ZIP-এ সংযোগের কোড ও configuration placeholder আছে; `js/config.js`-এ আপনার Web App config না বসানো পর্যন্ত live database সংযুক্ত হবে না। Firebase Admin private key কখনো এই ZIP বা public GitHub repository-তে দেবেন না।
