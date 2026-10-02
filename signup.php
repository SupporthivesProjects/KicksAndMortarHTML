<?php include 'includes/header.php'; ?>

<section class="auth on-dark" data-section data-theme="dark" id="top">
  <div class="auth-art">
    <div class="media " data-inner data-speed-inner="0.28">
      <picture>
        <source media="(max-width: 899px)" srcset="img/signup.jpg">
        </source>
        <img src="img/signup.jpg" alt="Marketing without the sales call." decoding="async" fetchpriority="high" data-menubg>
      </picture>
    </div>
    <div class="overlay"></div>
    <div class="auth-art-copy">
      <h2 class="div-good" data-lines data-hero>Marketing without the sales call.</h2>
      <p class="body-y mute">Create an account to buy packages, track every order and download your reports.</p>
    </div>
  </div>
  <div class="auth-panel-1 container">
    <div class="login">
        <div class="login-out">

            <div class="login-in">
                <p class="log">/ Sign up</p>
                <p class="urdu" lang="ar" dir="rtl">إنشاء حساب</p>
            </div>
            <h1 class="b-login" data-lines data-hero>Create an account</h1>
        </div>
        <form class="form-1 auth-form" data-auth="signup">
            <div class="field-row">
                    <div class="field-row-in">
                        <label class="f-name" for="f-firstName">First name</label>
                        <div class="tcl">
                            <input class="l-name" name="firstName" id="f-firstName" required autocomplete="given-name" type="text" placeholder="John">
                        </div>
                    </div>
                    <div class="field-row-in">
                        <label class="f-name" for="f-lastName">Last name</label>
                        <div class="tcl">
                            <input class="l-name" name="lastName" id="f-lastName" required autocomplete="family-name" type="text" placeholder="Smith">
                        </div>
                    </div>
            </div>
            <div class="fieldwrap">
                <label  for="f-email">Email address</label>
                <div class="tcl">
                    <input name="email" id="f-email" required autocomplete="email" type="email" placeholder="john.smith@email.com">
                </div>
            </div>
            <div class="field-row">
                <div class="field-row-in">
                    <label class="f-name" for="f-password">Password</label>
                    <div class="tcl">
                        <input class="l-name" name="password" id="f-password" required autocomplete="new-password" type="password" placeholder="••••••••••••" minlength="8">
                    </div>
                </div>
                <div class="field-row-in">
                    <label class="f-name" for="f-confirmPassword">Confirm password</label>
                    <div class="tcl">
                        <input class="l-name" name="confirmPassword" id="f-confirmPassword" required autocomplete="new-password" type="password" placeholder="••••••••••••" minlength="8">
                    </div>
                </div>
            </div>
            <label class="consent1">
                <input class=checkbox type="checkbox" name="consent" required>
                <span>I agree to the <a href="terms.html">Terms and Conditions</a> and <a href="privacy.html">Privacy Policy</a>. </span>
            </label>
            <div class="captcha-slot-1" data-captcha>
                <label>
                    <input class="preview" type="checkbox" name="preview-check"> I’m not a robot </label>
                    <span class="recaptcha">reCAPTCHA <br>
                    <small class="only">Privacy .Terms</small>
                </span>
            </div>
            
            <div class="an-div">
                <button type="submit" class="btn-1 btn-p">
                    <span>Create account</span>
                    <img class="arrow-1" src="assets/arrow.svg" alt="">
                </button>
                <p class="login-no faint">Already have an account? <a href="login.php">Log in</a>
            </p>
        </div>
    </div>
    </form>
  </div>
</section>

<?php include 'includes/footer.php'; ?>