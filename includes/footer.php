
    <footer class="footer compact on-dark" data-section data-theme="dark">
    <div class="media" data-inner data-speed-inner="0.6" style="--r:18%">
        <img src="./img/original-footer.webp" alt="" class="img-fluid">
    </div>
    <div class="overlay"></div>
    <div class="footer-content" data-speed="0.4" data-pos="end">
        <div class="talk">
            <a href="mailto:hello@klicksandmortar.com" class="big is-inview" data-lines=""><span class="line"><span style="transition-delay: 0s;">Let's talk.</span></span></a>
            <p class="ar is-inview" dir="auto" data-fade="">لنتحدث</p>
        </div>
        <div class="fcols" data-fade>
        <div>
            <span>Contact</span>
            <a href="mailto:hello@klicksandmortar.com" class="ulink">hello@klicksandmortar.com</a>
            <p>Dubai, United Arab Emirates</p>
        </div>
        <div>
            <span>Services</span>
            <a href="seo.html" class="ulink">SEO</a>
            <a href="ppc.html" class="ulink">PPC</a>
            <a href="social-media.html" class="ulink">Social Media</a>
            <a href="email-marketing.html" class="ulink">Email Marketing</a>
            <a href="web-design.html" class="ulink">Web Design</a>
            <a href="reputation.html" class="ulink">Reputation</a>
        </div>
        <div>
            <span>Company</span>
            <a href="about.html" class="ulink">About</a>
            <a href="process.html" class="ulink">Process</a>
            <a href="faq.html" class="ulink">FAQ</a>
            <a href="contact.html" class="ulink">Contact</a>
        </div>
        <div>
            <span>Account</span>
            <a href="login.html" class="ulink">Log in</a>
            <a href="signup.html" class="ulink">Sign up</a>
            <a href="cart.html" class="ulink">Cart</a>
        </div>
        </div>
        <div class="fbottom" data-step>
        <div class="legal">
            <p>© 2026 klicksandmortar</p>
            <a href="terms.html" class="ulink">Terms and Conditions</a>
            <a href="privacy.html" class="ulink">Privacy Policy</a>
        </div>
        <div class="pay">
            <img src="./img/footer-icon.svg" alt="Visa">
            <img src="./img/footer-icon1.svg" alt="Mastercard">
        </div>
        </div>
    </div>
    </footer>
</main>
    <div id="spacer"></div>
    <div class="sbar" id="sbar"><i></i></div>
    <div class="toast" id="toast" role="status"></div>
    <div id="veil" aria-hidden="true"></div>
    <div id="progress" aria-hidden="true">
    <script src="uiframe/js/jquery.min.js"></script>
    <script src="uiframe/js/bootstrap.bundle.min.js"></script>
    <script src="uiframe/js/popper.min.js"></script>
    <script src="uiframe/js/slick.js"></script>
    <script src="uiframe/js/owl.carousel.js"></script>
    <script src="uiframe/js/swiper-bundle.min.js"></script>
    <script src="uiframe/js/flickity.pkgd.min.js"></script>   
    <script src="uiframe/js/aos.js"></script>
    <script src="uiframe/js/home-js.js"></script>
    <script src="animationjs/motion.js"></script>

    <script>
      $(document).ready(function () {
          $(".navbar-toggler").click(function () {
              $(this).toggleClass("is-active");
              $("header").toggleClass("header-is-active");

              let logo = $("#logo");
              if (logo.attr("src") === "./img/m-logo.svg") {
                  logo.attr("src", "./img/c-logo.svg");
              } else {
                  logo.attr("src", "./img/m-logo.svg");
              }
          });
      });
    </script>
    <script>
        const header = document.querySelector('header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    </script>
     <script>
        const dropdownBtns = document.querySelectorAll(
            '.dropdown-toggle-cur, .dropdown-toggle-cart'
        );

        function updateOverlay() {
            const anyOpen =
                document.querySelector('.dropdown-menu.show') !== null;

            document.body.classList.toggle('dropdown-open', anyOpen);
        }

        dropdownBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                setTimeout(updateOverlay, 50);
            });
        });

        document.addEventListener('click', () => {
            setTimeout(updateOverlay, 50);
        });
    </script>

    <script>
      AOS.init();
    </script>
</body>
</html>
  