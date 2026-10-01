<?php include 'includes/header.php'; ?>
  <section class="account-header on-dark" data-section data-theme="dark" id="top">
        <div class="media account-bg" data-inner data-speed-inner="0.28">
          <picture>
            <source media="(max-width: 899px)" srcset="assets/account-header-mobile.webp">
            </source><img src="assets/account-header.webp" alt="Desert at sunset" decoding="async" fetchpriority="high" data-menubg>
          </picture>
        </div>
        <div class="overlay"></div>
        <div class="account-title">
          <div class="label">
            <p>/ Your account</p>
            <p class="ar" lang="ar" dir="rtl">حسابك</p>
          </div>
          <h1 class="h1" data-lines data-hero>Order history.</h1>
        </div>
      </section>
      <section class="account-body on-dark" data-section data-theme="dark">
        <nav class="account-sidebar" aria-label="Account"><a href="account.html"><small>/ 01</small>Account details</a><a href="orders.html" aria-current="page"><small>/ 02</small>Order history</a><button data-signout><small>/ 03</small>Sign out</button></nav>
        <div class="account-content">
          <h2 class="h4">All orders</h2>
          <p class="small mute">Every order with its packages and terms. Download the invoice for any order.</p>
<div id="orderHistory"><table class="orders-table"><thead><tr><th scope="col">Order</th><th scope="col">Date</th><th scope="col">Packages</th><th scope="col">Amount</th><th scope="col">Status</th><th scope="col">Invoice</th></tr></thead><tbody><tr><td data-label="Order">KM10482</td><td data-label="Date">27 September 2026</td><td data-label="Packages"><div>SEO, Silver package<small>3 month term</small>PPC, Bronze package<small>1 month term</small></div></td><td data-label="Amount">$1,253.70</td><td data-label="Status" class="active">Active</td><td data-label="Invoice"><button type="button" data-invoice="KM10482">Invoice ↓</button></td></tr><tr><td data-label="Order">KM10317</td><td data-label="Date">20 June 2026</td><td data-label="Packages"><div>SEO, Silver package<small>3 month term</small></div></td><td data-label="Amount">$1,129.00</td><td data-label="Status" class="">Paid</td><td data-label="Invoice"><button type="button" data-invoice="KM10317">Invoice ↓</button></td></tr><tr><td data-label="Order">KM10205</td><td data-label="Date">12 April 2026</td><td data-label="Packages"><div>Email marketing, Bronze package<small>3 month term</small></div></td><td data-label="Amount">$284.00</td><td data-label="Status" class="">Paid</td><td data-label="Invoice"><button type="button" data-invoice="KM10205">Invoice ↓</button></td></tr></tbody></table></div>        </div>
      </section>
<?php include 'includes/footer.php'; ?>