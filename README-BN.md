# JSF FASHION — নতুন Firebase-সংযুক্ত ওয়েবসাইট

এই সংস্করণে আপনার দেওয়া Firebase Web App Config ব্যবহার করা হয়েছে। পুরোনো Firebase Project ID `mr-game-shop-9f914` অপরিবর্তিত।

## গুরুত্বপূর্ণ
- এই প্রজেক্টটি Realtime Database ব্যবহার করে (Firestore নয়)।
- Firebase Config-এ থাকা Web API key সাধারণত ওয়েব অ্যাপের public config; কিন্তু password, service-account private key বা admin secret কখনো frontend-এ দেবেন না।
- Storage Rules-এ আপাতত authenticated user upload করতে পারে। Admin-only upload করতে চাইলে Custom Claims/নিরাপদ backend দিয়ে নিয়ম আরও শক্ত করতে হবে।
- Orders-এ client-side total পাঠানো হচ্ছে; production-এ server-side price validation, spam protection এবং transaction verification যোগ করা আবশ্যক।
- Firebase Rules প্রকাশের আগে নিজের ডেটা ব্যাকআপ নিন।

## 1. Hosting
GitHub Pages-এ সব ফাইল upload করুন। ES modules চালানোর জন্য HTTPS hosting দরকার।

## 2. Authentication
Firebase Console → Authentication → Sign-in method → Email/Password enable করুন।
Users থেকে Admin-এর Email/Password account তৈরি করুন।
Public sign-up page এই starter-এ নেই।

## 3. Admin অনুমোদন
Realtime Database → Data-তে `admins` node তৈরি করুন। এর ভেতরে Admin-এর Firebase Authentication UID-কে key এবং boolean `true` value দিন। উদাহরণ:
`admins / YOUR_ADMIN_UID : true`
UID পাবেন Authentication → Users থেকে।
এই admins node-টি শুধু Console থেকে তৈরি করুন; ওয়েবসাইটে এটি পরিবর্তন করা যাবে না।

## 4. Realtime Database Rules
Realtime Database → Rules-এ `firebase/database.rules.json` ফাইলের নিয়ম কপি করে Publish করুন।
অর্ডার create rule প্রাথমিক validation করে মাত্র; এটি production-grade anti-spam বা price validation নয়। চালুর আগে টেস্ট করুন।

## 5. Storage
Firebase Console → Storage → Get started। এরপর Storage → Rules-এ `firebase/storage.rules` প্রকাশ করুন।
এই starter-এ signed-in user image upload করতে পারে। যেহেতু public sign-up বন্ধ রাখা উচিত, শুধু Admin account রাখুন। আরও শক্ত নিরাপত্তার জন্য custom claims/backend ব্যবহার করুন।

## 6. Admin ব্যবহার
`/admin/login.html` খুলে Admin email/password দিয়ে লগইন করুন। Admin UID database-এর `admins` node-এ অনুমোদিত থাকলে Dashboard খুলবে।

## 7. দোকানের ফিচার
- পণ্য যোগ/সম্পাদনা/মুছুন
- ফোনের গ্যালারি থেকে ছবি আপলোড
- দোকানের নাম, লোগো, bKash ও Nagad নম্বর পরিবর্তন
- অর্ডার দেখা ও status পরিবর্তন
- Storefront-এ realtime product/settings update

## 8. Payment
bKash/Nagad নম্বর শুধু দেখানোর সেটিং। এখানে কোনো automatic payment gateway যুক্ত নেই। Payment verify ম্যানুয়ালি করতে হবে।
