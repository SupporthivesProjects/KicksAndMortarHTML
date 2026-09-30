<?php include 'includes/header.php'; ?>
<section class="purchase roomy on-light" data-section  id="top">
        <div class="row purchase-heading">
          <div class="label">
            <p>/ Checkout</p>
            <p class="ar" lang="ar" dir="rtl">الدفع</p>
          </div>
          <h1 class="h1" data-lines data-hero>Checkout</h1>
        </div>
        <form id="checkoutForm" class="purchase-body indent checkout-layout">
          <div class="form checkout-fields">
            <div class="checkout-topline"><a href="cart.html" class="small">← Back to cart</a><span class="small faint" id="checkoutIdentity"></span></div>
            <h2 class="h4">Personal details</h2>
            <div class="pair">
              <div class="field-wrap"><label for="f-firstName">First name</label>
                <div class="ctl"><input name="firstName" id="f-firstName" required autocomplete="given-name" type="text" placeholder="John"></div>
              </div>
              <div class="field-wrap"><label for="f-lastName">Last name</label>
                <div class="ctl"><input name="lastName" id="f-lastName" required autocomplete="family-name" type="text" placeholder="Smith"></div>
              </div>
            </div>
            <div class="pair">
              <div class="field-wrap"><label for="f-email">Email address</label>
                <div class="ctl"><input name="email" id="f-email" required autocomplete="email" type="email" placeholder="john.smith@email.com"></div>
              </div>
              <div class="field-wrap"><label for="f-phone">Phone number</label>
                <div class="ctl"><input name="phone" id="f-phone" required autocomplete="tel" type="tel" placeholder="+44 7700 900123"></div>
              </div>
            </div>
            <h2 class="h4">Billing address</h2>
            <div class="field-wrap"><label for="f-address1">Address line 1</label>
              <div class="ctl"><input name="address1" id="f-address1" required autocomplete="address-line1" type="text" placeholder="Street address"></div>
            </div>
            <div class="field-wrap"><label for="f-address2">Address line 2</label>
              <div class="ctl">
                <input name="address2" id="f-address2" autocomplete="address-line2" type="text" placeholder="Apartment, suite, etc.">
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
                <div class="ctl"><input name="county" id="f-county" autocomplete="address-level1" type="text" placeholder=""></div>
              </div>
              <div class="field-wrap"><label for="f-postcode">Zip / postal code</label>
                <div class="ctl"><input name="postcode" id="f-postcode" required autocomplete="postal-code" type="text" placeholder=""></div>
              </div>
            </div>
          </div>
          <div>

          </div>
        </form>
      </section>
<?php include 'includes/footer.php'; ?>