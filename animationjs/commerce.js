(() => {
    'use strict';
    const $ = (s, c = document) => c.querySelector(s),
        $$ = (s, c = document) => [...c.querySelectorAll(s)];
    const S = KMStore,
        C = KMCatalogue,
        config = KMConfig,
        page = document.body.dataset.page;
    const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    } [c]));
    const M = (v, d = 2, cur) => S.money(v, d, cur),
        layout = () => window.dispatchEvent(new Event('km:layout'));
    const btn = (text, url, attrs = '', secondary = false) => `<${url?'a':'button'} ${url?`href="${url}"`:'type="button"'} class="btn ${secondary?'btn-s':'btn-p'}" ${attrs}><span>${esc(text)}</span><img class="arrow" src="assets/arrow.svg" alt=""></${url?'a':'button'}>`;
    const pay = $('.footer .pay')?.outerHTML || '';
    let toastTimer;

    function toast(t) {
        const el = $('#toast');
        el.textContent = t;
        el.classList.add('is-on');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => el.classList.remove('is-on'), 3600);
    }

    function dialog(title, copy, actions = '') {
        let el = $('#kmDialog');
        if (!el) {
            el = document.createElement('dialog');
            el.id = 'kmDialog';
            el.className = 'km-dialog';
            document.body.append(el);
            el.addEventListener('click', e => {
                if (e.target === el) el.close();
            });
        }
        el.innerHTML = `<button class="dialog-close" type="button" aria-label="Close dialog">×</button><div class="result-mark"><img src="assets/result-check.svg" alt=""></div><h2 id="dialogTitle">${esc(title)}</h2><p>${esc(copy)}</p>${actions}`;
        el.setAttribute('aria-labelledby', 'dialogTitle');
        $('.dialog-close', el).onclick = () => el.close();
        el.showModal();
        return el;
    }

    function empty(title, copy) {
        return `<div class="empty-box"><h2 class="h4">${title}</h2><p class="body mute">${copy}</p>${btn('See the services','index.html#services')}</div>`;
    }
    const termText = x => x.term === 'oneoff' ? 'One-off project' : `${x.term} month term`;

    function summaryLines(items, cur) {
        return items.map(x => `<div class="summary-line"><div>${esc(C[x.service].name)}, ${esc(C[x.service].tiers[x.tier].name)} package<small>${termText(x)}</small></div><strong>${M(x.unitPrice??S.price(x)??0,2,cur)}</strong></div>`).join('');
    }

    function terms(current, service, tier) {
        return `<div class="term-selector" role="group" aria-label="${esc(C[service].name)} term">${[1,3,6,12].map(m=>`<button type="button" data-cart-term="${service}:${m}" aria-pressed="${current===m}">${m} month${m===1?'':'s'}</button>`).join('')}</div>`;
    }
    const service = C[page] ? page : null;
    let selectedTerm = service && C[service].oneOff ? 'oneoff' : 3;

    function packages() {
        if (!service) return;
        let unavailable = false;
        $$('[data-tier]').forEach(el => {
            const tier = Number(el.dataset.tier),
                price = S.price({
                    service,
                    tier,
                    term: selectedTerm
                }),
                label = $('[data-price]', el),
                button = $('[data-add]', el);
            label.textContent = price === null ? 'Price on request' : M(price, Number.isInteger(price) ? 0 : 2);
            label.classList.toggle('unavailable', price === null);
            $('[data-term-copy]', el).textContent = selectedTerm === 'oneoff' ? 'one-off project price' : `for a ${selectedTerm} month term`;
            $('span', button).textContent = price === null ? 'Enquire about this term' : 'Add to cart';
            if (price === null) unavailable = true;
        });
        const notice = $('.price-notice');
        if (notice) notice.textContent = unavailable ? 'Ask us for the price for this term. You can still compare what each package includes.' : '';
    }
    $$('[data-term]').forEach(b => b.addEventListener('click', () => {
        selectedTerm = Number(b.dataset.term);
        $$('[data-term]').forEach(x => x.setAttribute('aria-pressed', x === b));
        packages();
        layout();
    }));
    $$('[data-add]').forEach(b => b.addEventListener('click', () => {
        const [service, tier] = b.dataset.add.split(':');
        if (S.price({
                service,
                tier: Number(tier),
                term: selectedTerm
            }) === null) {
            if (window.km) window.km.scrollTo('custom-package');
            else $('#custom-package').scrollIntoView({
                behavior: 'smooth'
            });
            $('#f-message').value = `Please quote the ${C[service].tiers[tier].name} package for a ${selectedTerm} month term.`;
            return;
        }
        S.add(service, Number(tier), selectedTerm);
        const el = dialog('Added to your cart', `${C[service].name}, ${C[service].tiers[tier].name} package. ${selectedTerm==='oneoff'?'One-off project.':selectedTerm+' month term.'}`, btn('View cart', 'cart.html') + btn('Keep browsing', null, 'data-dismiss', true));
        $('[data-dismiss]', el).onclick = () => el.close();
    }));

    function nav() {
        const count = S.state.cart.length;
        $$('.cart sup').forEach(el => el.textContent = count);
        $$('a.login').forEach(el => {
            el.href = S.state.signedIn ? 'account.html' : 'login.html';
            el.textContent = S.state.signedIn ? 'Account' : 'Log in';
        });
    }

    function renderCart() {
        if (!$('#cartItems')) return;
        const items = S.state.cart,
            total = S.totals();
        $('.cart-count').textContent = `${items.length} package${items.length===1?'':'s'}`;
        $('#cartItems').innerHTML = items.length ? items.map(x => {
            const svc = C[x.service],
                tier = svc.tiers[x.tier];
            return `<article class="cart-line"><div class="media"><picture>${['seo','ppc'].includes(x.service)?`<source media="(max-width: 899px)" srcset="assets/cart-${x.service}-mobile.webp">`:''}<img src="${svc.image}" alt="${esc(svc.name)}"></picture></div><div class="cart-line-info"><div class="cart-line-head"><h2 class="h4">${esc(svc.name)}, ${tier.name} package</h2><div class="cart-line-price h3">${M(S.price(x))}<button type="button" data-remove="${x.service}">Remove</button></div></div><p class="cart-term">${termText(x)}</p><div class="cart-includes">${tier.figures.map(f=>`<p>${esc(f.join(' ').replace('keywords and phrases targeted','keywords and phrases'))}</p>`).join('')}${x.service==='ppc'?`<p>${M(config.adSpendPerMonth.ppc[x.tier],0)} ad spend included every month</p>`:''}</div>${svc.oneOff?'':terms(x.term,x.service,x.tier)}</div></article>`;
        }).join('') : empty('Your cart is empty.', 'Choose a service and a package to get started.');
        $('#cartSummary').innerHTML = `<h2 class="h5">Order summary</h2>${summaryLines(items)}<div class="summary-line subtotal-line"><span>Subtotal</span><strong>${M(total.subtotal)}</strong></div><div class="summary-total"><span>Total at checkout</span><strong>${M(total.total)}</strong></div>${items.length?btn('Continue to checkout','checkout.html'):btn('Browse services','index.html#services')}${pay}<div class="payment-notes"><p>Fixed terms. Nothing renews on its own.</p><p>Add a discount code at checkout.</p><p>Pay on a secure page by Visa or Mastercard.</p></div>`;
        const candidates = Object.keys(C).filter(k => !items.some(x => x.service === k)).slice(0, 4);
        $('#upsellGrid').innerHTML = candidates.map(k => {
            const s = C[k],
                min = Math.min(...Object.values(s.tiers[0].prices));
            return `<a class="upsell-card" href="${k}.html"><div class="media"><img loading="lazy" src="${s.image}" alt="${esc(s.name)}"></div><div><h3>${esc(s.name)}</h3><small>From ${M(min,0)}</small></div></a>`;
        }).join('');
        layout();
    }

    function checkoutSummary() {
        const el = $('#checkoutSummary');
        if (!el) return;
        const items = S.state.cart,
            t = S.totals();
        if (!items.length) {
            el.innerHTML = empty('Your cart is empty.', 'Choose a package before continuing to checkout.');
            return;
        }
        el.innerHTML = `<h2 class="h4">Your order</h2>${summaryLines(items)}<div class="discount"><label for="discountCode">Discount code<input id="discountCode" value="${esc(S.state.discount)}" autocomplete="off"></label><button type="button" data-discount class="${S.state.discount?'is-applied':''}">${S.state.discount?'✓ Applied':'Apply'}</button></div><p class="discount-status small" role="status"></p><div class="summary-line subtotal-line"><span>Subtotal</span><strong>${M(t.subtotal)}</strong></div>${t.discount?`<div class="summary-line"><span>Discount, ${esc(S.state.discount)} (${config.discounts[S.state.discount].percent}%)</span><strong>${M(t.discount)} off</strong></div>`:''}<div class="summary-total"><span>Total today</span><strong>${M(t.total)}</strong></div><label class="consent"><input name="consent" type="checkbox" required><span>I agree to the <a href="terms.html">Terms and Conditions</a> and <a href="privacy.html">Privacy Policy</a>.</span></label><div class="captcha-slot" data-captcha><label><input name="preview-check" type="checkbox">I’m not a robot</label><span>reCAPTCHA<br><small>Preview only</small></span></div><div class="secure-copy"><div class="secure-head"><strong>Pay on a secure page</strong>${pay}</div><p>You continue to our payment provider’s secure page to pay by Visa or Mastercard. We never see or store your card details.</p></div><button type="submit" class="btn btn-p"><span>Continue to secure payment</span><img class="arrow" src="assets/arrow.svg" alt=""></button><p class="form-status small" role="status"></p>`;
        layout();
    }
    document.addEventListener('click', e => {
        const remove = e.target.closest('[data-remove]');
        if (remove) S.remove(remove.dataset.remove);
        const term = e.target.closest('[data-cart-term]');
        if (term) {
            const [svc, t] = term.dataset.cartTerm.split(':');
            if (!S.setTerm(svc, Number(t))) toast('This term is not available in the live catalogue yet.');
            else $(`[data-cart-term="${svc}:${t}"]`)?.focus({
                preventScroll: true
            });
        }
        if (e.target.closest('[data-discount]')) {
            const code = $('#discountCode').value.trim().toUpperCase();
            if (code === '' || config.discounts[code]) {
                const checked = $('#checkoutForm [name=consent]')?.checked;
                S.setDiscount(code);
                if (checked) $('#checkoutForm [name=consent]').checked = true;
                $('.discount-status').textContent = code ? 'Applied to service fees. Included ad spend is excluded.' : 'Discount removed.';
            } else $('.discount-status').textContent = 'This discount code is not recognised.';
            layout();
        }
        if (e.target.closest('[data-signout]')) {
            S.signOut();
            location.href = 'login.html';
        }
    });

    function formData(form) {
        const data = {};
        for (const [k, v] of new FormData(form))
            if (typeof v === 'string' && !/password|consent|preview-check|g-recaptcha/i.test(k)) data[k] = v.trim();
        return data;
    }

    function fillProfile(form) {
        if (!form || !S.state.profile) return;
        for (const [k, v] of Object.entries(S.state.profile)) {
            const field = form.elements.namedItem(k);
            if (field && field.type !== 'password') field.value = v;
        }
    }

    function captchaToken(form) {
        return form.querySelector('[name="g-recaptcha-response"]')?.value || '';
    }
    async function post(path, data) {
        const response = await fetch(config.apiBase.replace(/\/$/, '') + path, {
            method: 'POST',
            credentials: 'include',
            headers: data instanceof FormData ? {} : {
                'Content-Type': 'application/json'
            },
            body: data instanceof FormData ? data : JSON.stringify(data)
        });
        let result;
        try {
            result = await response.json();
        } catch (_) {
            throw Error('The server returned an invalid response. Please try again.');
        }
        if (!response.ok) throw Error(result.message || 'We could not complete this request. Please try again.');
        return result;
    }
    const checkout = $('#checkoutForm');
    fillProfile(checkout);
    if (checkout) {
        const status = $('#checkoutIdentity');
        if (status) status.textContent = S.state.signedIn && S.state.profile?.email ? 'Signed in as ' + S.state.profile.email : '';
    }
    checkout?.addEventListener('submit', async e => {
        e.preventDefault();
        if (!S.state.cart.length) return;
        const profile = formData(checkout);
        const status = $('.form-status', checkout);
        if (config.mode === 'preview' || !config.apiBase) {
            const modal = dialog('Payment preview', 'No payment provider is connected to this build. No charge will be made. Choose a result to review the completed journey.', btn('Preview successful payment', null, 'data-preview-success') + btn('Preview declined payment', null, 'data-preview-error', true));
            $('[data-preview-success]', modal).onclick = () => {
                S.completePreview(profile);
                location.href = 'payment-complete.html';
            };
            $('[data-preview-error]', modal).onclick = () => {
                S.setProfile(profile);
                location.href = 'payment-error.html';
            };
            return;
        }
        const b = $('[type=submit]', checkout);
        b.disabled = true;
        status.textContent = 'Opening secure payment…';
        try {
            const r = await post('/checkout', {
                items: S.state.cart,
                discount: S.state.discount,
                currency: S.currency,
                profile,
                captchaToken: captchaToken(checkout)
            });
            const target = new URL(r.url);
            if (target.protocol !== 'https:') throw Error('The payment URL must use HTTPS.');
            location.href = target.href;
        } catch (err) {
            status.textContent = err.message;
            b.disabled = false;
            layout();
        }
    });
    $$('input[type=file]').forEach(input => input.addEventListener('change', () => {
        const file = input.files[0],
            label = input.closest('label')?.querySelector('[data-file-label]') || $('#briefName');
        if (file && (file.size > 20 * 1024 * 1024 || !/\.(pdf|docx?)$/i.test(file.name))) {
            input.value = '';
            toast('Choose a PDF or Word file smaller than 20MB.');
            return;
        }
        if (label) label.textContent = file ? file.name : 'Attach a PDF or Word file, up to 20MB';
        layout();
    }));
    $$('[data-enquiry]').forEach(form => {
        form.noValidate = false;
        ['name', 'email', 'message', 'consent'].forEach(n => {
            if (form.elements[n]) form.elements[n].required = true;
        });
        form.addEventListener('submit', async e => {
            e.preventDefault();
            let status = $('.form-status', form);
            if (!status) {
                status = document.createElement('p');
                status.className = 'form-status small';
                status.role = 'status';
                form.append(status);
            }
            if (config.apiBase && config.mode !== 'preview') {
                try {
                    await post('/enquiries', new FormData(form));
                    status.textContent = 'Thank you. We have received your enquiry and will reply by email.';
                    form.reset();
                } catch (err) {
                    status.textContent = err.message;
                }
            } else {
                const d = formData(form),
                    svc = d.service || form.dataset.service || 'General enquiry';
                const body = Object.entries(d).map(([k, v]) => `${k}: ${v}`).join('\n\n');
                const url = `mailto:${config.enquiryEmail}?subject=${encodeURIComponent(svc+' enquiry')}&body=${encodeURIComponent(body)}`;
                status.innerHTML = `Your email draft is ready. <a href="${esc(url)}">Open it in your email app</a> to send your enquiry.${form.querySelector('input[type=file]')?.files.length?' Attach your selected brief to the email before sending.':''}`;
            }
            layout();
        });
    });
    $$('[data-auth]').forEach(form => form.addEventListener('submit', async e => {
        e.preventDefault();
        const kind = form.dataset.auth,
            data = formData(form),
            status = $('.form-status', form);
        const pw = form.elements.password?.value,
            confirm = form.elements.confirmPassword?.value;
        if (confirm !== undefined && pw !== confirm) {
            status.textContent = 'Your passwords do not match.';
            layout();
            return;
        }
        if (kind !== 'login' && pw && !(pw.length >= 8 && /[a-z]/i.test(pw) && /[0-9]/.test(pw))) {
            status.textContent = 'Use at least 8 characters, including letters and numbers.';
            layout();
            return;
        }
        if (config.mode === 'preview' || !config.apiBase) {
            if (kind === 'forgot-password') {
                dialog('Check your inbox.', 'This is the reset-email preview. No email has been sent by this static build.', btn('Back to log in', 'login.html') + btn('Preview reset form', 'reset-password.html', '', true));
            } else if (kind === 'reset-password') {
                form.reset();
                dialog('Password updated.', 'This is the confirmation preview. No password has been changed or saved.', btn('Back to log in', 'login.html'));
            } else {
                const el = dialog(kind === 'signup' ? 'Account preview' : 'Log in preview', 'This build uses a local demonstration account. Your password is never stored or sent.', btn('Explore your account', null, 'data-open-account'));
                $('[data-open-account]', el).onclick = () => {
                    S.signIn({
                        firstName: data.firstName || 'John',
                        lastName: data.lastName || 'Smith',
                        email: data.email
                    });
                    location.href = 'account.html';
                };
            }
        } else {
            const b = $('[type=submit]', form);
            b.disabled = true;
            try {
                const result = await post('/auth/' + kind, {
                    ...data,
                    password: pw,
                    confirmPassword: confirm,
                    token: new URLSearchParams(location.search).get('token'),
                    captchaToken: captchaToken(form)
                });
                if (kind === 'login' || kind === 'signup') {
                    S.signIn(result.profile);
                    location.href = 'account.html';
                } else {
                    form.reset();
                    dialog(kind === 'forgot-password' ? 'Check your inbox.' : 'Password updated.', kind === 'forgot-password' ? 'If an account uses this email address, a reset link is on its way.' : 'Your password has been updated.', btn('Back to log in', 'login.html'));
                }
            } catch (err) {
                status.textContent = err.message;
            } finally {
                b.disabled = false;
                layout();
            }
        }
    }));
    const sampleProfile = {
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@email.com',
        phone: '+44 7700 900123',
        address1: '14 Hanover Square',
        address2: 'Mayfair',
        city: 'London',
        country: 'United Kingdom',
        county: 'Greater London',
        postcode: 'W1S 1HN'
    };
    const sampleOrders = [{
        id: 'KM10482',
        date: '2026-09-27',
        items: [{
            service: 'seo',
            tier: 1,
            term: 3
        }, {
            service: 'ppc',
            tier: 0,
            term: 1
        }],
        subtotal: 1393,
        discount: 139.30,
        total: 1253.70,
        discountCode: 'KLICK10',
        profile: sampleProfile,
        status: 'Active',
        preview: true,
        currency: 'USD'
    }, {
        id: 'KM10317',
        date: '2026-06-20',
        items: [{
            service: 'seo',
            tier: 1,
            term: 3
        }],
        subtotal: 1129,
        discount: 0,
        total: 1129,
        profile: sampleProfile,
        status: 'Paid',
        preview: true,
        currency: 'USD'
    }, {
        id: 'KM10205',
        date: '2026-04-12',
        items: [{
            service: 'email-marketing',
            tier: 0,
            term: 3
        }],
        subtotal: 284,
        discount: 0,
        total: 284,
        profile: sampleProfile,
        status: 'Paid',
        preview: true,
        currency: 'USD'
    }];
    const orders = () => S.state.orders.length ? S.state.orders : (S.state.signedIn ? [] : sampleOrders);
    const date = s => new Date(s).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    function showAccount() {
        const form = $('#accountForm');
        if (form) {
            const p = S.state.profile || sampleProfile;
            for (const [key, value] of Object.entries(p)) {
                const el = form.elements.namedItem(key);
                if (el) el.value = value;
            }
            $$('[data-first-name]').forEach(el => el.textContent = p.firstName || 'there');
            form.addEventListener('submit', async e => {
                e.preventDefault();
                const data = formData(form),
                    status = $('.form-status', form);
                const current = form.elements.currentPassword.value,
                    next = form.elements.newPassword.value;
                if (next && (!current || next.length < 8 || !/[a-z]/i.test(next) || !/[0-9]/.test(next))) {
                    status.textContent = 'Enter your current password and a new password of at least 8 characters, including letters and numbers.';
                    layout();
                    return;
                }
                if (config.apiBase && config.mode !== 'preview') {
                    try {
                        await post('/account', {
                            ...data,
                            currentPassword: form.elements.currentPassword.value,
                            newPassword: form.elements.newPassword.value
                        });
                        S.setProfile(data);
                        status.textContent = 'Your changes have been saved.';
                    } catch (err) {
                        status.textContent = err.message;
                    }
                } else {
                    S.setProfile(data);
                    status.textContent = 'Details saved for this browser preview. Password changes require the connected account service.';
                }
                form.elements.currentPassword.value = '';
                form.elements.newPassword.value = '';
                layout();
            });
        }
        const files = $('#deliverables');
        if (files) {
            const data = [
                ['SEO', 'August SEO report', '1 September 2026'],
                ['SEO', 'Technical SEO audit', '6 July 2026'],
                ['SEO', 'Keyword research', '27 June 2026'],
                ['Email marketing', 'June campaign report', '1 July 2026']
            ];
            files.innerHTML = (files.hasAttribute('data-empty') || S.state.signedIn) ? empty('No files yet.', 'Reports, audits and creative from your packages will show here once they are delivered.') : data.map(([svc, name, delivered]) => `<article class="file-row"><div><p class="xs faint">/ ${svc}</p><h3 class="h5">${name}</h3><p class="xs mute">Delivered ${delivered}</p></div><button type="button" data-download-sample="${name}">Download ↓</button></article>`).join('');
        }
        const history = $('#orderHistory');
        if (history) history.innerHTML = (history.hasAttribute('data-empty') || !orders().length) ? empty('No orders yet.', 'Your orders and invoices will show here after your first purchase.') : `<table class="orders-table"><thead><tr>${['Order','Date','Packages','Amount','Status','Invoice'].map(s=>`<th scope="col">${s}</th>`).join('')}</tr></thead><tbody>${orders().map(o=>`<tr><td data-label="Order">${o.id}</td><td data-label="Date">${date(o.date)}</td><td data-label="Packages"><div>${o.items.map(x=>`${C[x.service].name}, ${C[x.service].tiers[x.tier].name} package<small>${termText(x)}</small>`).join('')}</div></td><td data-label="Amount">${M(o.total,2,o.currency)}</td><td data-label="Status" class="${o.status==='Active'?'active':''}">${o.status}</td><td data-label="Invoice"><button type="button" data-invoice="${o.id}">Invoice ↓</button></td></tr>`).join('')}</tbody></table>`;
    }

    function renderResult() {
        if (!$('#resultSummary')) return;
        const error = page === 'payment-error',
            o = error && S.state.cart.length ? {
                ...S.totals(),
                id: 'Pending order',
                date: new Date().toISOString(),
                items: S.state.cart,
                profile: S.state.profile || sampleProfile,
                discountCode: S.state.discount,
                currency: S.currency,
                preview: true
            } : (orders()[0] || sampleOrders[0]);
        if (!error) {
            $('.result-copy h1').textContent = `Thank you, ${o.profile?.firstName||'John'}.`;
            $('#resultCopy').textContent = `Order ${o.id} is confirmed. Your packages are set up in your account, where every report and invoice will appear.`;
        }
        $('#resultMode').textContent = o.preview ? 'Preview order. No payment has been taken.' : '';
        $('#resultSummary').innerHTML = `<div class="summary-line"><h2 class="h4">${o.id==='Pending order'?o.id:'Order '+o.id}</h2><small>${date(o.date)}</small></div>${summaryLines(o.items,o.currency)}<div class="summary-line subtotal-line"><span>Subtotal</span><strong>${M(o.subtotal,2,o.currency)}</strong></div>${o.discount?`<div class="summary-line"><span>Discount, ${esc(o.discountCode)}</span><strong>${M(o.discount,2,o.currency)} off</strong></div>`:''}<div class="summary-total"><span>${error?'Total due':'Total paid'}</span><strong>${M(o.total,2,o.currency)}</strong></div>`;
    }

    function download(name, data, type) {
        const url = URL.createObjectURL(new Blob([data], {
            type
        }));
        const link = document.createElement('a');
        link.href = url;
        link.download = name;
        document.body.append(link);
        link.click();
        link.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
    // Small native PDF writer: selectable text; no network or build dependency.
    function invoicePDF(order) {
        const currency = config.currencyRates[order.currency] ? order.currency : 'USD',
            rate = order.exchangeRate || config.currencyRates[currency] || 1,
            lines = ['klicksandmortar', 'INVOICE ' + order.id, ...(order.preview ? ['PREVIEW ONLY - no payment taken'] : []), date(order.date), '', ...Object.values(order.profile || sampleProfile).filter(Boolean), '', ...order.items.flatMap(x => [`${C[x.service].name}, ${C[x.service].tiers[x.tier].name} package`, `${termText(x)}   ${currency} ${((x.unitPrice??S.price(x))*rate).toFixed(2)}`]), '', `Subtotal: ${currency} ${(order.subtotal*rate).toFixed(2)}`, `Discount: ${currency} ${(order.discount*rate).toFixed(2)}`, `Total: ${currency} ${(order.total*rate).toFixed(2)}`, '', 'hello@klicksandmortar.com'];
        const clean = s => s.replace(/[^\x20-\x7E]/g, '?').replace(/[\\()]/g, '\\$&');
        let stream = 'BT /F1 12 Tf 48 795 Td 20 TL\n';
        lines.forEach((s, i) => stream += (i ? 'T* ' : '') + `(${clean(String(s))}) Tj\n`);
        stream += 'ET';
        const objs = ['<< /Type /Catalog /Pages 2 0 R >>', '<< /Type /Pages /Kids [3 0 R] /Count 1 >>', '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>', '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>', `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`];
        let pdf = '%PDF-1.4\n',
            offset = [0];
        objs.forEach((o, i) => {
            offset.push(pdf.length);
            pdf += `${i+1} 0 obj\n${o}\nendobj\n`;
        });
        const start = pdf.length;
        pdf += `xref\n0 6\n0000000000 65535 f \n` + offset.slice(1).map(n => String(n).padStart(10, '0') + ' 00000 n \n').join('') + `trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${start}\n%%EOF`;
        return pdf;
    }
    document.addEventListener('click', e => {
        const inv = e.target.closest('[data-invoice]');
        if (inv) {
            const o = inv.dataset.invoice === 'last' ? orders()[0] : orders().find(o => o.id === inv.dataset.invoice);
            if (o) download(o.id + '-invoice.pdf', invoicePDF(o), 'application/pdf');
        }
        const file = e.target.closest('[data-download-sample]');
        if (file) {
            download(file.dataset.downloadSample.toLowerCase().replaceAll(' ', '-') + '-preview.txt', file.dataset.downloadSample + '\n\nklicksandmortar v2.0 preview\n\nThis demonstrates the download interaction. No client report was supplied with the designs. Connect the deliverables endpoint to download the actual document.', 'text/plain');
            toast('Downloaded the labelled preview file.');
        }
    });
    document.addEventListener('keydown', e => {
        const menu = $('#menu');
        if (e.key === 'Tab' && menu?.classList.contains('is-open')) {
            const list = [$('#menuOpen'), ...$$('a,button', menu).filter(x => x.offsetParent !== null)],
                first = list[0],
                last = list.at(-1);
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    });
    $$('[data-cur]').forEach(el => el.addEventListener('click', () => {
        if (!config.currencyRates[el.dataset.cur]) toast('Package prices are currently available in USD.');
    }));
    window.addEventListener('km:store', () => {
        nav();
        packages();
        renderCart();
        checkoutSummary();
    });
    nav();
    packages();
    renderCart();
    checkoutSummary();
    showAccount();
    renderResult();

    function mountCaptchas() {
        if (config.mode === 'preview') return;
        $$('[data-captcha]').forEach(el => {
            if (el.dataset.mounted) return;
            const submit = el.closest('form')?.querySelector('[type=submit]');
            if (submit) submit.disabled = true;
            el.innerHTML = '<p class="small">Verification is required before submitting.</p>';
            if (window.grecaptcha?.render) {
                el.innerHTML = '';
                el.dataset.mounted = 'true';
                window.grecaptcha.render(el, {
                    sitekey: config.recaptchaSiteKey,
                    theme: el.closest('.on-dark') ? 'dark' : 'light',
                    callback: () => {
                        if (submit) submit.disabled = false;
                    },
                    'expired-callback': () => {
                        if (submit) submit.disabled = true;
                    },
                    'error-callback': () => {
                        if (submit) submit.disabled = true;
                    }
                });
            }
        });
        layout();
    }
    window.addEventListener('km:store', mountCaptchas);
    mountCaptchas();
    if (config.mode !== 'preview' && config.recaptchaSiteKey && $$('[data-captcha]').length) {
        window.kmCaptchaReady = mountCaptchas;
        const script = document.createElement('script');
        script.src = 'https://www.google.com/recaptcha/api.js?onload=kmCaptchaReady&render=explicit';
        script.async = true;
        script.defer = true;
        document.head.append(script);
    }
})();