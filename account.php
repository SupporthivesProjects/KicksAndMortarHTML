<?php include 'includes/header.php'; ?>
<section class="account-header on-dark" data-section data-theme="dark" id="top">
    <div class="media account-bg" data-inner data-speed-inner="0.28">
        <picture>
            <source media="(max-width: 899px)" srcset="/img/account-header-mobile.webp">

            <img src="/img/account-header.webp" alt="Desert at sunset" decoding="async" fetchpriority="high">
        </picture>
    </div>
    <div class="overlay"></div>
    <div class="account-title">
        <div class="label">
            <p>/ Your account</p>
            <p class="ar" lang="ar" dir="rtl">حسابك</p>
        </div>
        <h1 class="h1" data-lines data-hero>Welcome back, <span data-first-name>John</span>.</h1>
    </div>
</section>
<section class="account-body on-dark" data-section data-theme="dark">
    <nav class="account-sidebar" aria-label="Account"><a href="account.html" aria-current="page"><small>/
                01</small>Account details</a><a href="orders.html"><small>/ 02</small>Order history</a><button
            data-signout><small>/ 03</small>Sign out</button></nav>
    <div class="account-content">
        <form class="form" id="accountForm">
            <h2 class="h4">Personal details</h2>
            <div class="pair">
                <div class="field-wrap"><label for="f-firstName">First name</label>
                    <div class="ctl"><input name="firstName" id="f-firstName" required autocomplete="given-name"
                            type="text" placeholder="John"></div>
                </div>
                <div class="field-wrap"><label for="f-lastName">Last name</label>
                    <div class="ctl"><input name="lastName" id="f-lastName" required autocomplete="family-name"
                            type="text" placeholder="Smith"></div>
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
            <div class="pair">
                <div class="field-wrap"><label for="f-currentPassword">Password</label>
                    <div class="ctl"><input name="currentPassword" id="f-currentPassword"
                            autocomplete="current-password" type="password" placeholder="" minlength="8"></div>
                </div>
                <div class="field-wrap"><label for="f-newPassword">New password</label>
                    <div class="ctl"><input name="newPassword" id="f-newPassword" autocomplete="new-password"
                            type="password" placeholder="Enter a new password" minlength="8"></div>
                </div>
            </div>
            <h2 class="h4">Billing address</h2>
            <div class="field-wrap"><label for="f-address1">Address line 1</label>
                <div class="ctl"><input name="address1" id="f-address1" required autocomplete="address-line1"
                        type="text" placeholder="Street address"></div>
            </div>
            <div class="field-wrap"><label for="f-address2">Address line 2</label>
                <div class="ctl"><input name="address2" id="f-address2" autocomplete="address-line2" type="text"
                        placeholder="Apartment, suite, etc."></div>
            </div>
            <div class="pair">
                <div class="field-wrap"><label for="f-city">City</label>
                    <div class="ctl"><input name="city" id="f-city" required autocomplete="address-level2" type="text"
                            placeholder=""></div>
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
                    <div class="ctl"><input name="county" id="f-county" autocomplete="address-level1" type="text"
                            placeholder=""></div>
                </div>
                <div class="field-wrap"><label for="f-postcode">Zip / postal code</label>
                    <div class="ctl"><input name="postcode" id="f-postcode" required autocomplete="postal-code"
                            type="text" placeholder=""></div>
                </div>
            </div><button type="submit" class="btn btn-p"><span>Save changes</span><svg
                    xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                    <path d="M1 8H15M9 14L15 8L9 2" stroke="#15120E" stroke-width="1.5" />
                </svg></button>
            <p class="form-status small" role="status" aria-live="polite"></p>
        </form>
        <div class="account-files">
            <h2 class="h4">Your files</h2>
            <p class="small mute">Reports, audits and creative delivered on your packages. Download them any time.</p>
            <div id="deliverables">
                <article class="file-row">
                    <div>
                        <p class="xs faint">/ SEO</p>
                        <h3 class="h5">August SEO report</h3>
                        <p class="xs mute">Delivered 1 September 2026</p>
                    </div><button type="button" data-download-sample="August SEO report">Download <svg
                            xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                            <path d="M8 1V15M2 9L8 15L14 9" stroke="#E0CCBB" stroke-width="1.5" />
                        </svg></button>
                </article>
                <article class="file-row">
                    <div>
                        <p class="xs faint">/ SEO</p>
                        <h3 class="h5">Technical SEO audit</h3>
                        <p class="xs mute">Delivered 6 July 2026</p>
                    </div><button type="button" data-download-sample="Technical SEO audit">Download <svg
                            xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                            <path d="M8 1V15M2 9L8 15L14 9" stroke="#E0CCBB" stroke-width="1.5" />
                        </svg></button>
                </article>
                <article class="file-row">
                    <div>
                        <p class="xs faint">/ SEO</p>
                        <h3 class="h5">Keyword research</h3>
                        <p class="xs mute">Delivered 27 June 2026</p>
                    </div><button type="button" data-download-sample="Keyword research">Download <svg
                            xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                            <path d="M8 1V15M2 9L8 15L14 9" stroke="#E0CCBB" stroke-width="1.5" />
                        </svg></button>
                </article>
                <article class="file-row">
                    <div>
                        <p class="xs faint">/ Email marketing</p>
                        <h3 class="h5">June campaign report</h3>
                        <p class="xs mute">Delivered 1 July 2026</p>
                    </div><button type="button" data-download-sample="Keyword research">Download <svg
                            xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                            <path d="M8 1V15M2 9L8 15L14 9" stroke="#E0CCBB" stroke-width="1.5"></path>
                        </svg></button>
                </article>
            </div>
        </div>
    </div>
</section>
<?php include 'includes/footer.php'; ?>