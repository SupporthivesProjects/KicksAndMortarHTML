<?php include 'includes/header.php'; ?>
<section class="purchase result roomy on-light" data-section data-theme="light" id="top">
  <div class="result-grid">
    <div class="label">
      <p>/ Payment error</p>
      <p class="ar" lang="ar" dir="rtl">خطأ في الدفع</p>
    </div>
    <div class="result-copy">
      <div class="result-mark error "><img src="./img/result-cross.svg" alt=""></div>
      <h1 class="h2" data-lines data-hero>Payment did not go through.</h1>
      <p class="body mute payment_text" id="resultCopy">Nothing has been charged. Check your card details on the payment page, or try another card. Your order is saved.</p>
      <div class="actions action_error "> <a href="account.html" class="btn btn-p button_black"><span>Try again 
      </span><svg
            xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
            <path d="M1 8H15M9 14L15 8L9 2" stroke="#E0CCBB" stroke-width="1.5" />
          </svg></a>
        <button type="button" class="btn btn-s" data-invoice="last"><span>Contact us</span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"
            fill="none">
            <path d="M1 8H15M9 14L15 8L9 2" stroke="#15120E" stroke-width="1.5" />
          </svg></p>
      </div>
     
    </div>
     <div class="order-summary order_success">

        <!-- HEADING -->
        <h2 class="order-summary__title">
Order KM10482 <span class="timee">27 September 2026</span>

        </h2>


        <!-- ORDER ITEMS -->
        <div class="order-summary__items">

          <!-- ITEM 1 -->
          <div class="order-summary__item">
            <div class="order-summary__item-info">
              <div class="order-summary__item-name">
                SEO, Silver package
              </div>

              <div class="order-summary__item-term">
                3 month term
              </div>
            </div>

            <div class="order-summary__item-price">
              $1,129.00
            </div>
          </div>


          <!-- ITEM 2 -->
          <div class="order-summary__item">
            <div class="order-summary__item-info">
              <div class="order-summary__item-name">
                PPC, Bronze package
              </div>

              <div class="order-summary__item-term">
                1 month term
              </div>
            </div>

            <div class="order-summary__item-price">
              $264.00
            </div>
          </div>

        </div>
     


        <!-- SUMMARY -->
        <div class="order-summary__totals">

          <div class="order-summary__total-row">
            <span>Subtotal</span>
            <span>$1,393.00</span>
          </div>

          <div class="order-summary__total-row">
            <span>Discount, KLICK10 (10%)</span>
            <span>$139.30 off</span>
          </div>

        </div>


        <!-- TOTAL TODAY -->
        <div class="order-summary__today">

          <span class="order-summary__today-label">
            Total today
          </span>

          <span class="order-summary__today-price">
            $1,253.70
          </span>

        </div>



      </div>
</section>
<?php include 'includes/footer.php'; ?>