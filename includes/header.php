<?php
  $currentPage = basename($_SERVER['PHP_SELF']);
?>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Klicksandmortar</title>
    <link rel="icon" type="image/png" sizes="16x16" href="./img/tg-icon.svg">
    <link rel="stylesheet" href="css/mainBase.css">
  </head>
  <body data-page="terms">
    <a class="skip-link d-none" href="#top">Skip to content</a>
     <header class="nav" id="nav">
   <a href="index.html" class="logo">klicksandmortar</a>
   <div class="nav-actions">
     <div class="cur" id="cur">
       <button class="cur-btn" aria-haspopup="listbox" aria-expanded="false">
         <span id="curLabel">USD</span>
         <svg viewbox="0 0 12 12" fill="none" aria-hidden="true">
           <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
         </svg>
       </button>
       <div class="cur-list" role="listbox">
         <button role="option" data-cur="USD" aria-current="true">USD</button>
         <button role="option" data-cur="EUR">EUR</button>
         <button role="option" data-cur="GBP">GBP</button>
       </div>
     </div>
     <a href="login.html" class="login ulink">Log in</a>
     <a href="cart.html" class="cart">
       <span class="ulink">Cart</span>
       <sup>0</sup>
     </a>
     <button class="menu-btn" id="menuOpen" aria-label="Open menu" aria-expanded="false" aria-controls="menu">
       <span class="bars" aria-hidden="true">
         <i></i>
         <i></i>
       </span>
     </button>
   </div>
 </header>
 <div class="menu" id="menu" aria-hidden="true">
   <div class="menu-bg">
     <img id="menuBg" alt="">
   </div>
   <div class="nav-inner">
     <a href="index.html" class="logo">klicksandmortar</a>
     <div class="nav-actions">
       <span class="cur-btn">
         <span class="curMirror">USD</span>
         <svg viewbox="0 0 12 12" fill="none" aria-hidden="true">
           <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
         </svg>
       </span>
       <a href="login.html" class="login">Log in</a>
       <a href="cart.html" class="cart">
         <span>Cart</span>
         <sup>0</sup>
       </a>
       <button class="close" id="menuClose" aria-label="Close menu">
         <svg viewbox="0 0 28 28" fill="none" aria-hidden="true">
           <path d="M4 4L24 24M24 4L4 24" stroke="#E0CCBB" stroke-width="1.2"></path>
         </svg>
       </button>
     </div>
   </div>
   <div class="menu-content">
     <div class="label on-dark" data-mfade style="color:var(--sand-70)">
       <p>/ Menu</p>
       <p class="ar" dir="auto" style="color:var(--sand-50)">القائمة</p>
     </div>
     <nav class="menu-links">
       <a href="index.html">
         <span class="line" style="--i:0">
           <span>Home</span>
         </span>
       </a>
       <a href="index.html#services">
         <span class="line" style="--i:1">
           <span>Services</span>
         </span>
         <sup data-mfade>06</sup>
       </a>
       <a href="about.html">
         <span class="line" style="--i:2">
           <span>About</span>
         </span>
       </a>
       <a href="process.html">
         <span class="line" style="--i:3">
           <span>Process</span>
         </span>
       </a>
       <a href="faq.html">
         <span class="line" style="--i:4">
           <span>FAQ</span>
         </span>
       </a>
       <a href="contact.html">
         <span class="line" style="--i:5">
           <span>Contact</span>
         </span>
       </a>
     </nav>
   </div>
   <div class="menu-foot" data-mfade>
     <a href="login.html" class="login mobile-account-link ulink">Log in</a>
     <div class="mobile-currency" role="group" aria-label="Currency">
       <button type="button" data-menu-currency="USD">USD</button>
       <button type="button" data-menu-currency="EUR">EUR</button>
       <button type="button" data-menu-currency="GBP">GBP</button>
     </div>
     <a href="signup.html" class="ulink">Sign up</a>
     <a href="mailto:hello@klicksandmortar.com" class="ulink">hello@klicksandmortar.com</a>
     <a href="terms.html" class="ulink">Terms and Conditions</a>
     <a href="privacy.html" class="ulink">Privacy Policy</a>
   </div>
 </div>
    <main id="smooth">
      