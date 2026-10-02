<?php include 'includes/header.php'; ?>
<section class="purchase roomy on-light" data-section id="top">
  <div class="row purchase-heading">
    <div class="label">
      <p>/ Checkout</p>
      <p class="ar" lang="ar" dir="rtl">الدفع</p>
    </div>
    <h1 class="h1 checkout_heading " data-lines data-hero>Checkout</h1>
  </div>
  <div class="purchase-body indent checkout-layout">

  <form id="checkoutForm" >
    <div class="form checkout-fields">
      <div class="checkout-topline"><a href="cart.html" class="small"><svg xmlns="http://www.w3.org/2000/svg" width="16"
            height="16" viewBox="0 0 16 16" fill="none">
            <path d="M15 8L1 8M7 2L1 8L7 14" stroke="#15120E" stroke-width="1.5" />
          </svg> Back to cart</a><span class="small faint" id="checkoutIdentity">Signed in as john.smith@email.com</span></div>
      <h2 class="h4">Personal details</h2>
      <div class="pair">
        <div class="field-wrap"><label for="f-firstName">First name</label>
          <div class="ctl"><input name="firstName" id="f-firstName" required autocomplete="given-name" type="text"
              placeholder="John"></div>
        </div>
        <div class="field-wrap"><label for="f-lastName">Last name</label>
          <div class="ctl"><input name="lastName" id="f-lastName" required autocomplete="family-name" type="text"
              placeholder="Smith"></div>
        </div>
      </div>
      <div class="pair">
        <div class="field-wrap"><label for="f-email">Email address</label>
          <div class="ctl"><input name="email" id="f-email" required autocomplete="email" type="email"
              placeholder="john.smith@email.com"></div>
        </div>
        <div class="field-wrap"><label for="f-phone">Phone number</label>
          <div class="ctl"><input name="phone" id="f-phone" required autocomplete="tel" type="tel"
              placeholder="+44 7700 900123"></div>
        </div>
      </div>
      <h2 class="h4">Billing address</h2>
      <div class="field-wrap"><label for="f-address1">Address line 1</label>
        <div class="ctl"><input name="address1" id="f-address1" required autocomplete="address-line1" type="text"
            placeholder="Street address"></div>
      </div>
      <div class="field-wrap"><label for="f-address2">Address line 2</label>
        <div class="ctl">
          <input name="address2" id="f-address2" autocomplete="address-line2" type="text"
            placeholder="Apartment, suite, etc.">
        </div>
      </div>
      <div class="pair">
        <div class="field-wrap"><label for="f-city">City</label>
          <div class="ctl">
            <input name="city" id="f-city" required autocomplete="address-level2" type="text" placeholder="">
          </div>
        </div>
        <div class="field-wrap"><label for="f-country">Country</label>
          <div class="ctl"><select name="country" id="f-country" required autocomplete="country-name">
              <option value="">Choose your country</option>
              <option>United Kingdom</option>
              <option>United Arab Emirates</option>
              <option>United States</option>
              <option>France</option>
              <option>Germany</option>
              <option>Spain</option>
              <option>Italy</option>
              <option>Netherlands</option>
              <option>Ireland</option>
              <option>Canada</option>
              <option>Australia</option>
              <option>Other</option>
            </select></div>
        </div>
      </div>
      <div class="pair">
        <div class="field-wrap"><label for="f-county">County</label>
          <div class="ctl"><input name="county" id="f-county" autocomplete="address-level1" type="text" placeholder="">
          </div>
        </div>
        <div class="field-wrap"><label for="f-postcode">Zip / postal code</label>
          <div class="ctl"><input name="postcode" id="f-postcode" required autocomplete="postal-code" type="text"
              placeholder=""></div>
        </div>
      </div>
    </div>
  </form>

<div class="order-summary">

    <!-- HEADING -->
    <h2 class="order-summary__title">
        Your order
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


    <!-- DISCOUNT CODE -->
    <div class="order-summary__discount">

        <div class="order-summary__discount-content">
            <div class="order-summary__label">
                Discount code
            </div>

            <div class="order-summary__code">
                KLICK10
            </div>
        </div>

        <button type="button" class="order-summary__applied">
            <span>✓</span>
            Applied
        </button>

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


    <!-- TERMS -->
    <label class="order-summary__terms">

        <input type="checkbox" checked>

        <span>
            I agree to the
            <a href="#">Terms and Conditions</a>
            and
            <a href="#">Privacy Policy</a>
        </span>

    </label>


    <!-- RECAPTCHA -->
    <div class="order-summary__captcha">


    </div>


    <!-- SECURE PAYMENT -->
    <div class="order-summary__secure">

        <div class="order-summary__secure-header">

            <span>
                Pay on a secure page
            </span>

            <div class="order-summary__cards">
<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
  <path d="M13.668 12.393L8.955 23.637H5.88L3.561 14.6625C3.42 14.1105 3.2985 13.908 2.8695 13.6755C2.1705 13.296 1.0155 12.9405 0 12.7185L0.069 12.393H5.019C5.34247 12.3927 5.6554 12.508 5.90131 12.7182C6.14722 12.9283 6.3099 13.2195 6.36 13.539L7.5855 20.046L10.6125 12.393H13.668ZM25.7175 19.9665C25.7295 16.998 21.6135 16.8345 21.642 15.5085C21.651 15.105 22.035 14.676 22.875 14.5665C23.8594 14.473 24.8508 14.6472 25.7445 15.0705L26.2545 12.6855C25.3844 12.3585 24.463 12.1893 23.5335 12.186C20.658 12.186 18.6345 13.716 18.6165 15.9045C18.5985 17.523 20.061 18.4245 21.1635 18.9645C22.2975 19.515 22.6785 19.869 22.6725 20.361C22.665 21.117 21.7695 21.4485 20.9325 21.462C19.47 21.4845 18.6225 21.0675 17.9445 20.7525L17.418 23.2155C18.0975 23.5275 19.3515 23.8005 20.652 23.8125C23.7075 23.8125 25.707 22.3035 25.7175 19.9665ZM33.309 23.637H36L33.6525 12.393H31.1685C30.9031 12.3906 30.6431 12.4679 30.4221 12.615C30.2012 12.7621 30.0296 12.9722 29.9295 13.218L25.566 23.637H28.62L29.2275 21.957H32.9595L33.309 23.637ZM30.0645 19.653L31.5945 15.4305L32.4765 19.653H30.0645ZM17.8245 12.393L15.42 23.637H12.51L14.9175 12.393H17.8245Z" fill="#15120E"/>
</svg>                
<span class="mastercard-icon"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
  <path d="M14.1788 22.5387C14.2513 22.6 14.3288 22.6612 14.405 22.7212C12.9338 23.7 11.1675 24.2687 9.27125 24.2687C4.15 24.27 0 20.12 0 15C0 9.88123 4.15 5.72998 9.27 5.72998C11.1675 5.72998 12.9338 6.29998 14.4012 7.27748C14.3263 7.34123 14.2513 7.39998 14.195 7.46498C12 9.36123 10.7438 12.11 10.7438 15C10.7438 17.8887 11.995 20.6375 14.1788 22.5387ZM20.73 5.72998C18.83 5.72998 17.0662 6.29998 15.5988 7.27748C15.6737 7.34123 15.7487 7.39998 15.805 7.46498C18 9.36123 19.2563 12.11 19.2563 15C19.2563 17.8875 18.005 20.6337 15.8212 22.5387C15.7487 22.6 15.6712 22.6612 15.595 22.7212C17.0662 23.7 18.83 24.2687 20.7288 24.2687C25.85 24.27 30 20.12 30 15C30 9.88248 25.85 5.72998 20.73 5.72998ZM15 7.71748C14.88 7.81123 14.7638 7.90498 14.65 8.00623C12.695 9.70498 11.4612 12.2062 11.4612 15C11.4612 17.795 12.695 20.295 14.65 21.9937C14.7625 22.0937 14.8813 22.1912 15 22.2837C15.12 22.1912 15.2362 22.0937 15.35 21.9937C17.3037 20.295 18.5387 17.795 18.5387 15C18.5387 12.2062 17.305 9.70498 15.35 8.00623C15.2375 7.90623 15.12 7.81123 15 7.71748Z" fill="#15120E"/>
</svg></span>
            </div>

        </div>

        <p>
            You continue to our payment provider's secure page to pay by
            Visa or Mastercard. We never see or store your card details.
        </p>

    </div>


    <!-- PAYMENT BUTTON -->
    <button type="button" class="order-summary__button">

        <span>
            Continue to secure payment
        </span>

        <span class="order-summary__button-arrow">
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
  <path d="M1 8H15M9 14L15 8L9 2" stroke="#E0CCBB" stroke-width="1.5"/>
</svg>
        </span>

    </button>

</div>
    </div>

</section>
<?php include 'includes/footer.php'; ?>