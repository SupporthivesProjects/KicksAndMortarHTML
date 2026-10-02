<!-- PAGE HEADER -->
 <?php include 'includes/header.php'; ?>

 <style>
    p{
        margin: 0px !important;
    }
    span{
      margin: 0px !important;
      padding: 0px !important;
    }
    h1{
        margin: 0px !important;
    }
    h2{
        margin: 0px !important;
    }
    h3{
        margin: 0px !important;
    }
    .phead .copy{
      width: max-content;
    }
    .btn{
      border-radius: 0px !important;
    }
 </style>

  <section class="phead on-dark" data-section data-theme="dark" id="top">
    <div class="hpar" data-speed="0.5" data-pos="top"><div class="hreveal"><div class="media"><img src="img/original-9f1026ef6a18c756.png" alt="Desert dunes at sunset" data-menubg></div></div></div>
    <div class="overlay"></div>
    <div class="row" data-speed="0.8" data-pos="top" data-fadeout>
      <div class="label" data-hfade><p>/ Contact</p><p class="ar" dir="auto">تواصل معنا</p></div>
      <div class="copy cont_copy">
        <h1 class="h1" data-lines data-hero>Tell us what you need.</h1>
        <p class="body" data-lines data-hero data-delay="0.2">Questions about a package, or work the packages do not cover. Write to us and we reply by email.</p>
      </div>
    </div>
  </section>

  <!-- WRITE TO US -->
  <section class="write on-light contact_Write" data-section data-theme="light">
    <div class="split">
      <div class="label" data-fade><p>/ Write to us</p><p class="ar" dir="auto">راسلنا</p></div>
      <div class="details">
        <h2 class="h2" data-lines>Write to us.</h2>
        <div class="dlist">
          <div data-fade><p class="small">Email</p><a class="body ulink" href="mailto:hello@klicksandmortar.com">hello@klicksandmortar.com</a></div>
          <div data-fade><p class="small">Studio</p><p class="body">Dubai, United Arab Emirates</p></div>
          <div data-fade><p class="small">Custom packages</p><p class="body">Attach your brief to the form and we come back with a price.</p></div>
        </div>
      </div>
      <form class="form" id="enquiry" data-enquiry novalidate data-fade>
        <div class="pair">
          <div class="field-wrap"><label for="f-name">Full name</label><div class="ctl"><input id="f-name" name="name" autocomplete="name" placeholder="John Smith"></div><p class="err">Enter your name.</p></div>
          <div class="field-wrap"><label for="f-email">Email</label><div class="ctl"><input id="f-email" name="email" type="email" autocomplete="email" placeholder="john.smith@email.com"></div><p class="err">Enter a valid email address.</p></div>
        </div>
        <div class="field-wrap"><label for="f-biz">Business name</label><div class="ctl"><input id="f-biz" name="business" autocomplete="organization" placeholder="Café Dune"></div></div>
        <div class="field-wrap"><label for="f-svc">Service</label><div class="ctl"><select id="f-svc" name="service" style="background-image: none !important;"><option class="nulll" value=""><span class="con_choose">Choose a service<span></option><option>SEO</option><option>PPC</option><option>Social Media</option><option>Email Marketing</option><option>Web Design</option><option>Reputation</option><option>Something else</option></select><svg class="chev" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div></div>
        <div class="field-wrap"><label for="f-msg">Message</label><div class="ctl ta"><textarea id="f-msg" name="message" placeholder="Tell us what you sell and who you want to reach."></textarea></div><p class="err">Tell us a little about what you need.</p></div>
        <div class="field-wrap"><span class="lbl">Brief (optional)</span><label class="ctl file"><input type="file" id="brief" name="brief" accept=".pdf,.doc,.docx"><span class="fname" id="briefName" data-empty="Attach a PDF or Word file, up to 20MB">Attach a PDF or Word file, up to 20MB</span><span class="browse">Browse</span></label></div>
        <div class="field-wrap"><label class="consent"><input type="checkbox" name="consent"><span class="box"><svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span>I agree to the <a href="terms.html">Terms and Conditions</a> and <a href="privacy.html">Privacy Policy</a>.</span></label><p class="err">Tick to agree before sending.</p></div>
        <div class="captcha-slot" data-captcha><label><input type="checkbox" name="preview-check"> I’m not a robot</label><span>reCAPTCHA<br><small>Preview only</small></span></div>
        <button type="submit" class="btn btn-p light submit_btn"><span>Send enquiry</span><svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M1 8h13.2M9.2 3.2L14 8l-4.8 4.8" stroke="currentColor" stroke-width="1.2"/></svg></button>
      </form>
      <div class="sent" id="sent" role="status">
        <p class="small faint">/ Enquiry sent</p>
        <h2 class="h2">Thank you, <span id="sentName"></span>.</h2>
        <p class="body">We have your enquiry and reply by email.</p>
        <div><a href="index.html#services" class="btn btn-p"><span>Browse services</span><svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M1 8h13.2M9.2 3.2L14 8l-4.8 4.8" stroke="currentColor" stroke-width="1.2"/></svg></a></div>
      </div>
    </div>
  </section>
  <?php include 'includes/footer.php'; ?>