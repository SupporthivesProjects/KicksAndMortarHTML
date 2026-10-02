<?php include 'includes/header.php'; ?>

<section class="auth on-dark" data-section data-theme="dark" id="top">
  <div class="auth-art">
    <div class="media " data-inner data-speed-inner="0.28">
      <picture>
        <source media="(max-width: 899px)" srcset="img/forgot.jpg">
        </source>
        <img src="img/forgot.jpg" alt="It happens to everyone." decoding="async" fetchpriority="high" data-menubg>
      </picture>
    </div>
    <div class="overlay"></div>
    <div class="auth-art-copy">
      <h2 class="h1" data-lines data-hero>It happens to everyone.</h2>
      <p class="body mute">We will send you a link to set a new password.</p>
    </div>
  </div>
  <div class="auth-panel-1 container">
    <div class="login-out">

        <div class="login">
            <div class="login-in">
            <p class="log">/ Reset password</p>
            <p class="urdu" lang="ar" dir="rtl">استعادة كلمة المرور</p>
        </div>
        <h1 class="b-login" data-lines data-hero>Forgot your password?</h1>
      <p class="body-enter mute">Enter the email address on your account and we will send you a reset link.</p>
    </div>
    <form class="form-1 auth-form" data-auth="forgot-password">
      <div class="fieldwrap">
          <label for="f-email">Email address</label>
          <div class="tcl">
              <input name="email" id="f-email" required autocomplete="email" type="email" placeholder="john.smith@email.com">
            </div>
        </div>

        <div class="an-div">
        
        
        <button type="submit" class="btn btn-1 btn-p">
            <span>Send reset link</span><span class="arrowstyle">&rarr;</span>
            <img class="arrow-1" src="assets/arrow.svg" alt="">
        </button>
        <p class="form-status small" role="status" aria-live="polite"></p>
        <p class="login-no faint">Remembered it? <a href="login.php">Back to log in</a>
    </p>
</div>
    </form>
    
    
</div>
  </div>
</section>
 <div class="media" data-inner data-speed-inner="0.6" style="--r:18%">
   <img src="assets/original-8a8a96ad4952a91c.webp" alt="">
 </div>
 <div class="overlay"></div>




 <dialog id="kmDialog" class="km-dialog">
    <button class="dialog-close" type="button" aria-label="Close dialog">×</button>

    <div class="result-mark">
        <img src="assets/result-check.svg" alt="">
    </div>

    <h2 id="dialogTitle">Check your inbox.</h2>

    <p>
        This is the reset-email preview. No email has been sent by this static build.
    </p>

    <div class="dialog-actions">
        <a href="login.php" class="btn btn-p">
            <span>Back to log in</span>
            <img class="arrow" src="assets/arrow.svg" alt="">
        </a>

        <a href="reset-password.php" class="btn btn-s">
            <span>Preview reset form</span>
            <img class="arrow" src="assets/arrow.svg" alt="">
        </a>
    </div>
</dialog>

<?php include 'includes/footer.php'; ?>