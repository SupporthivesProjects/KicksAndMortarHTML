<?php include 'includes/header.php'; ?>
<section class="auth on-dark" data-section data-theme="dark" id="top">
  <div class="auth-art">
    <div class="media " data-inner data-speed-inner="0.28">
      <picture>
        <source media="(max-width: 899px)" srcset="img/forgot.jpg">
        </source>
        <img src="img/forgot.jpg" alt="A fresh start." decoding="async" fetchpriority="high" data-menubg>
      </picture>
    </div>
    <div class="overlay"></div>
    <div class="auth-art-copy">
      <h2 class="div-good" data-lines data-hero>A fresh start.</h2>
      <p class="body-y mute">Choose a password you have not used on this account before.</p>
    </div>
  </div>
  <div class="auth-panel-1 container">
    <div class="login-out">

        <div class="login">
            <div class="login-in">
                <p class="log">/ Reset password</p>
                <p class="urdu" lang="ar" dir="rtl">كلمة مرور جديدة</p>
            </div>
            <h1 class="b-login" data-lines data-hero>Set a new password</h1>
            <p class="body-enter mute">Use at least 8 characters, with a mix of letters and numbers.</p>
        </div>
    <form class="form-1 auth-form" data-auth="reset-password">
      <div class="fieldwrap">
        <label for="f-password">New password</label>
        <div class="tcl">
            <input name="password" id="f-password" required autocomplete="new-password" type="password" placeholder="••••••••••••" minlength="8">
        </div>
    </div>
    <div class="fieldwrap">
        <label for="f-confirmPassword">Confirm new password</label>
        <div class="ctl">
            <input name="confirmPassword" id="f-confirmPassword" required autocomplete="new-password" type="password" placeholder="••••••••••••" minlength="8">
        </div>
    </div>
    <button type="submit" class="btn-1 btn-p">
        <span>Update password</span>
        <img class="arrow" src="assets/arrow.svg" alt="">
    </button>
    <p class="form-status small" role="status" aria-live="polite"></p>
    <p class="small faint"></p>
</div>
</form>
  </div>
</section>
<?php include 'includes/footer.php'; ?>

