import {db} from "./firebase.js";
import {ref,push,set,serverTimestamp} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";
import {getCart,saveCart,money} from "./common.js";
const form=document.querySelector("#checkoutForm"),msg=document.querySelector("#message");
form.onsubmit=async e=>{e.preventDefault();const cart=getCart();if(!cart.length){msg.textContent="আপনার কার্ট খালি।";return;}const f=new FormData(form);const order={customer:{name:f.get("name"),phone:f.get("phone"),address:f.get("address")},payment:f.get("payment"),transactionId:f.get("transactionId"),items:cart,total:cart.reduce((s,p)=>s+p.price*p.qty,0),status:"pending",createdAt:Date.now()};try{const r=push(ref(db,"orders"));await set(r,order);saveCart([]);form.reset();msg.textContent="অর্ডার গ্রহণ করা হয়েছে। অর্ডার আইডি: "+r.key;}catch(err){msg.textContent="অর্ডার পাঠানো যায়নি: "+err.message;}};
