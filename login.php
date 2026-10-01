<?php include 'includes/header.php'; ?>

      <section class="auth on-dark" data-section data-theme="dark" id="top">
        <div class="auth-art">
          <div class="media " data-inner data-speed-inner="0.28">
            <picture>
              <source media="(max-width: 899px)" srcset="img/login-art-mobile.webp">
              </source><img src="img/login-art.webp" alt="Good to see you again." decoding="async" fetchpriority="high" data-menubg>
            </picture>
          </div>
          <div class="overlay"></div>
          <div class="auth-art-copy">
            <h2 class="div-good" data-lines data-hero>Good to see you again.</h2>
            <p class="body-y mute">Your orders, invoices and reports, all in one place.</p>
          </div>
        </div>
        <div class="auth-panel">
          <div class="login">
            <div class="login-in">
              <p class="log">/ Log in</p>
              <p class="urdu" lang="ar" dir="rtl">تسجيل الدخول</p>
            </div>
            <h1 class="b-login" data-lines data-hero>Log in</h1>
          </div>
          <form class="form-1 auth-form" data-auth="login">
            <div class="field-wrap"><label for="f-email">Email address</label>
              <div class="ctl"><input name="email" id="f-email" required autocomplete="email" type="email" placeholder="john.smith@email.com"></div>
            </div>
            <div class="fieldwrap"><label for="f-password">Password</label>
              <div class="tcl"><input name="password" id="f-password" required autocomplete="current-password" type="password" placeholder="" minlength="8"></div>
            </div><a class="login-f text-link forgot" href="forgot-password.html">Forgot password?</a>

          </form>
            <div class="an-div">

              <button type="submit" class="btn-1 btn-p">
                <span>Log in</span><img class="arrow" src="img/arrow.svg" alt="">
              </button>
            <p class="login-no faint">New here? <a href="signup.html">Create an account</a></p>
          </div>
        </div>
      </section>
<?php include 'includes/footer.php'; ?>
     