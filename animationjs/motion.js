(() => {
    'use strict';
    const VERSION = 'v2.2',
        BUILT = '2026-09-28',
        PAGE = document.body.dataset.page || 'home';
    const $ = (s, c = document) => c.querySelector(s),
        $$ = (s, c = document) => [...c.querySelectorAll(s)];
    const root = document.documentElement;
    const RM = matchMedia('(prefers-reduced-motion: reduce)');
    const COARSE = matchMedia('(hover: none), (pointer: coarse)');
    const MOBILE = matchMedia('(max-width: 899px)');
    const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
    const lerp = (a, b, t) => a + (b - a) * t;

    // the menu background reuses the page's own first image so nothing is embedded twice
    {
        const src = $('[data-menubg]') || $('#smooth img');
        if (src) $('#menuBg').src = src.src || src.getAttribute('poster');
    }

    /* ---------- state across pages: URL hash (cur=EUR, plus an optional anchor id) ---------- */
    const CURS = ['USD', 'EUR', 'GBP'];
    let currency = window.KMStore?.currency || 'USD',
        arriveAnchor = null;
    (function readHash() {
        const h = decodeURIComponent(location.hash.slice(1));
        if (!h) return;
        h.split('&').forEach(p => {
            const [k, v] = p.split('=');
            if (v === undefined) {
                if (k) arriveAnchor = k;
            } else if (k === 'cur' && CURS.includes(v)) currency = v;
        });
        history.replaceState(null, '', location.pathname + location.search); // a refresh does not resurrect discarded state
    })();

    // tuning, exposed on window.km.tune()
    const T = {
        ease: 0.085,
        cardEase: 0.1,
        reveal: 0.88
    };

    const smoothEl = $('#smooth'),
        spacer = $('#spacer'),
        nav = $('#nav');
    let smooth = false;
    let vw = 0,
        vh = 0,
        docH = 0;
    const S = {
        cur: 0,
        target: 0,
        last: 0,
        dir: 0
    };

    /* ---------- split into masked lines ---------- */
    const splitCache = new Map();

    function splitLines(el) {
        if (!splitCache.has(el)) splitCache.set(el, el.textContent.trim());
        const text = splitCache.get(el);
        el.innerHTML = '';
        const words = text.split(/\s+/).map(w => {
            const s = document.createElement('span');
            s.textContent = w;
            s.style.display = 'inline-block';
            el.appendChild(s);
            el.appendChild(document.createTextNode(' '));
            return s;
        });
        const lines = [];
        let top = null;
        words.forEach(w => {
            const t = w.offsetTop;
            if (top === null || Math.abs(t - top) > 2) {
                lines.push([]);
                top = t;
            }
            lines[lines.length - 1].push(w.textContent);
        });
        el.innerHTML = '';
        const delay = parseFloat(el.dataset.delay || 0);
        lines.forEach((ws, i) => {
            const l = document.createElement('span');
            l.className = 'line';
            const inner = document.createElement('span');
            inner.textContent = ws.join(' ');
            inner.style.transitionDelay = (delay + i * 0.08) + 's';
            l.appendChild(inner);
            el.appendChild(l);
        });
    }

    function splitAll() {
        $$('[data-lines]').forEach(splitLines);
    }

    /* ---------- measuring ---------- */
    let sections = [],
        parallax = [],
        inners = [],
        reveals = [];

    function docTop(el) { // position in document ignoring our transforms
        let y = 0,
            n = el;
        while (n && n !== smoothEl && n !== document.body) {
            y += n.offsetTop;
            n = n.offsetParent;
        }
        return y;
    }
    let maxScroll = 0;

    function measure() {
        forceNav = true;
        vw = root.clientWidth;
        vh = window.innerHeight;
        root.style.setProperty('--u', (MOBILE.matches ? 1 : vw / 1920) + 'px');
        sections = $$('[data-section]').map(el => ({
            el,
            top: docTop(el),
            h: el.offsetHeight,
            vis: el.style.visibility !== 'hidden',
            theme: el.dataset.theme
        }));
        docH = smoothEl.offsetHeight;
        if (smooth) {
            spacer.style.height = docH + 'px';
        }
        parallax = $$('[data-speed]').filter(el => !(MOBILE.matches && el.hasAttribute('data-desk'))).map(el => {
            el.style.transform = '';
            const sec = el.closest('[data-section]');
            return {
                el,
                k: parseFloat(el.dataset.speed),
                pos: el.dataset.pos || 'mid',
                top: docTop(el),
                h: el.offsetHeight,
                fade: el.hasAttribute('data-fadeout'),
                end: docTop(sec) + sec.offsetHeight
            };
        });
        $$('[data-desk][data-speed]').forEach(el => {
            if (MOBILE.matches) el.style.transform = '';
        });
        inners = $$('.media[data-inner]').map(m => {
            const img = m.querySelector('img,video');
            return {
                m,
                img,
                top: docTop(m),
                h: m.offsetHeight,
                zoom: m.hasAttribute('data-zoom'),
                card: !!m.closest('[data-card]'),
                r: parseFloat(getComputedStyle(m).getPropertyValue('--r')) || 12,
                k: parseFloat(m.dataset.speedInner || 1)
            };
        });
        reveals = $$('[data-lines]:not([data-hero]),[data-fade],[data-clip],[data-step]').map(el => ({
            el,
            top: docTop(el),
            done: el.classList.contains('is-inview')
        }));
        maxScroll = Math.max(0, docH - vh);
        if (introVideo) {
            const r = introVideo.parentElement;
            vidBox.top = docTop(r);
            vidBox.h = r.offsetHeight;
        }
        S.target = clamp(window.scrollY, 0, maxScroll);
        if (carousel) cardMeasure();
    }

    /* ---------- smooth scroll engine (locomotive-style lerp) ---------- */
    function setMode() {
        smooth = !RM.matches && !COARSE.matches;
        root.classList.toggle('is-smooth', smooth);
        if (!smooth) {
            spacer.style.height = '0px';
            sections.forEach(s => {
                s.el.style.transform = '';
                s.el.style.visibility = '';
            });
        }
    }
    window.addEventListener('scroll', () => {
        S.target = window.scrollY;
    }, {
        passive: true
    });

    let lastT = performance.now();

    function frame(now) {
        const dt = Math.min(64, now - lastT);
        lastT = now;
        if (smooth) {
            const t = 1 - Math.pow(1 - T.ease, dt / 16.667);
            S.cur = lerp(S.cur, S.target, t);
            if (Math.abs(S.target - S.cur) < 0.1) S.cur = S.target; // hard cut, an asymptote is not a rest state
        } else S.cur = window.scrollY;
        const y = S.cur;
        const moved = y !== S.last || forceNav;
        S.dir = y > S.last ? 1 : (y < S.last ? -1 : S.dir);
        S.last = y;
        forceNav = false;

        if (smooth && moved) {
            for (const s of sections) {
                const vis = s.top - y < vh + 200 && s.top + s.h - y > -200;
                if (vis) {
                    s.el.style.transform = `translate3d(0,${-y}px,0)`;
                    if (!s.vis) {
                        s.el.style.visibility = '';
                        s.vis = true;
                    }
                } else if (s.vis) {
                    s.el.style.visibility = 'hidden';
                    s.vis = false;
                }
            }
        }
        if (!RM.matches && moved) {
            const mid = y + vh / 2;
            for (const p of parallax) {
                if (p.top - y > vh + 400 || p.top + p.h - y < -400) continue;
                const d = p.pos === 'top' ? y * p.k : p.pos === 'end' ? Math.min(0, (y - (p.end - vh)) * p.k) : (mid - (p.top + p.h / 2)) * p.k;
                p.el.style.transform = `translate3d(0,${d.toFixed(2)}px,0)`;
                if (p.fade) p.el.style.opacity = clamp(1 - y / (vh * 0.75), 0, 1).toFixed(3);
            }
            for (const i of inners) {
                if (i.card) continue;
                if (i.top - y > vh + 100 || i.top + i.h - y < -100) continue;
                const prog = clamp((mid - (i.top + i.h / 2)) / ((vh + i.h) / 2), -1, 1); // -1 entering, 1 leaving
                const ty = prog * i.r / 100 * i.h * i.k;
                let sc = 1;
                if (i.zoom) {
                    const e = clamp((y + vh - i.top) / (vh * 0.9), 0, 1);
                    sc = 1 + 0.18 * Math.pow(1 - e, 2);
                }
                i.img.style.transform = `translate3d(0,${ty.toFixed(2)}px,0) scale(${sc.toFixed(4)})`;
            }
        }
        // reveals
        const line = y + vh * T.reveal;
        for (const r of reveals) {
            if (!r.done && r.top < line) {
                r.el.classList.add('is-inview');
                r.done = true;
            }
        }
        // nav: ground follows the section under it
        if (moved) {
            const under = sections.find(s => s.top <= y + 40 && s.top + s.h > y + 40);
            nav.classList.toggle('is-light', !!under && under.theme === 'light');
            nav.classList.toggle('is-hidden', !menuOpen && y > vh * 0.6 && S.dir > 0);
            sbarUpdate(y);
        }
        if (carousel) cardFrame(dt);
        videoFrame(y);
        if (slidesEl) heroAuto(dt, y);
        requestAnimationFrame(frame);
    }
    let forceNav = true;

    /* ---------- films: play only while in view, poster under reduced motion ---------- */
    const introVideo = document.getElementById('introVideo');
    const vidBox = {
        top: 0,
        h: 0
    };

    function videoFrame(y) {
        if (slidesEl) {
            // hero film: only the current slide, only while the hero is on screen
            const hv = slideVideo(slideIdx),
                heroOn = y < (sections[0] ? sections[0].h : vh);
            if (hv) {
                if (RM.matches) {
                    if (!hv.paused) hv.pause();
                } else if (heroOn && hv.paused && !sliding) {
                    const p = hv.play();
                    if (p) p.catch(() => {});
                } else if (!heroOn && !hv.paused) hv.pause();
            }
        }
        if (!introVideo) return;
        if (RM.matches) {
            if (!introVideo.paused) {
                introVideo.pause();
                introVideo.currentTime = 0;
            }
            return;
        }
        const vidTop = vidBox.top,
            vidH = vidBox.h;
        const inView = vidTop - y < vh && vidTop + vidH - y > 0;
        if (inView && introVideo.paused && !introVideo.dataset.blocked) {
            const p = introVideo.play();
            if (p) p.catch(() => {
                introVideo.dataset.blocked = '1';
            });
        } else if (!inView && !introVideo.paused) {
            introVideo.pause();
        }
    }

    /* ---------- scrollbar ---------- */
    const sbar = $('#sbar'),
        thumb = sbar.firstElementChild;
    let sbTimer = 0,
        sbDrag = null;

    function sbarUpdate(y) {
        if (!smooth) return;
        const th = Math.max(40, vh * vh / docH);
        thumb.style.height = th + 'px';
        thumb.style.transform = `translate3d(0,${(y/maxScroll||0)*(vh-th-4)}px,0)`;
        sbar.classList.add('is-on');
        clearTimeout(sbTimer);
        sbTimer = setTimeout(() => sbar.classList.remove('is-on'), 900);
    }
    thumb.addEventListener('pointerdown', e => {
        sbDrag = {
            y: e.clientY,
            s: window.scrollY
        };
        sbar.classList.add('is-drag');
        thumb.setPointerCapture(e.pointerId);
    });
    thumb.addEventListener('pointermove', e => {
        if (!sbDrag) return;
        const th = thumb.offsetHeight;
        window.scrollTo(0, sbDrag.s + (e.clientY - sbDrag.y) * maxScroll / (vh - th - 4));
    });
    thumb.addEventListener('pointerup', () => {
        sbDrag = null;
        sbar.classList.remove('is-drag');
    });

    /* ---------- hero slideshow (homepage) ---------- */
    const slidesEl = $('#slides'),
        slideEls = slidesEl ? $$('.slide', slidesEl) : [];
    let slideIdx = 0,
        sliding = false;
    const slideVideo = i => slideEls[i] && slideEls[i].querySelector('video');

    function goSlide(dir) {
        if (sliding) return;
        sliding = true;
        const prev = slideIdx;
        slideIdx = (slideIdx + dir + slideEls.length) % slideEls.length;
        const s = slideEls[slideIdx],
            v = slideVideo(slideIdx);
        if (v) {
            try {
                v.currentTime = 0;
            } catch (_) {}
            if (!RM.matches) {
                const p = v.play();
                if (p) p.catch(() => {});
            }
        }
        s.className = 'slide';
        void s.offsetWidth;
        s.className = 'slide is-entering' + (dir < 0 ? ' back' : '');
        const n = String(slideIdx + 1).padStart(2, '0');
        $('#heroCount').textContent = n;
        $('#heroIdx').textContent = n;
        const done = () => {
            const pv = slideVideo(prev);
            if (pv) pv.pause();
            slideEls[prev].className = 'slide';
            s.className = 'slide is-current';
            sliding = false;
        };
        if (RM.matches) done();
        else s.addEventListener('animationend', function h(e) {
            if (e.target === s) {
                s.removeEventListener('animationend', h);
                done();
            }
        });
    }
    // autoplay: advance every 10s while the hero is on screen and the tab is visible; a manual click restarts the count
    const HERO_AUTO = 10000;
    let heroElapsed = 0;

    function heroAuto(dt, y) {
        if (RM.matches || sliding || document.hidden) return;
        const heroOn = y < (sections[0] ? sections[0].h * 0.6 : vh);
        if (!heroOn) return;
        heroElapsed += dt;
        if (heroElapsed >= HERO_AUTO) {
            heroElapsed = 0;
            goSlide(1);
        }
    }
    if (slidesEl) {
        $('#heroNext').addEventListener('click', () => {
            heroElapsed = 0;
            goSlide(1);
        });
        $('#heroPrev').addEventListener('click', () => {
            heroElapsed = 0;
            goSlide(-1);
        });
    }

    /* ---------- services carousel (homepage) ---------- */
    const wrap = $('#trackWrap'),
        track = $('#track'),
        carousel = !!wrap;
    const cards = carousel ? $$('[data-card]', track) : [];
    const C = {
        x: 0,
        tx: 0,
        min: 0,
        idx: 0,
        step: 0,
        drag: null,
        vel: 0
    };
    const cardInners = () => inners.filter(i => i.card);
    const dc = $('#dragCursor');
    let dcX = 0,
        dcY = 0,
        dcCX = 0,
        dcCY = 0;
    cards.forEach((c, i) => {
        $('.media', c).style.transitionDelay = (i * 0.09) + 's';
    });
    let cardBase = 0;

    function cardMeasure() {
        cardBase = wrap.getBoundingClientRect().left + (parseFloat(getComputedStyle(wrap).paddingLeft) || 0);
        {
            const g = parseFloat(getComputedStyle(track).columnGap) || 0,
                cw = cards[0].offsetWidth;
            cards.forEach((c, i) => {
                c.offsetLeft0 = i * (cw + g);
                const m = $('.media', c);
                m.offsetWidth0 = m.offsetWidth;
            });
        }
        const cs = getComputedStyle(track);
        const gap = parseFloat(cs.columnGap) || 0;
        C.step = cards[0].offsetWidth + gap;
        const padL = parseFloat(getComputedStyle(wrap).paddingLeft) || 0;
        const rightPad = MOBILE.matches ? 20 : parseFloat(getComputedStyle(root).getPropertyValue('--u')) * 120;
        C.min = Math.min(0, wrap.clientWidth - padL - track.scrollWidth - rightPad);
        C.tx = clamp(C.tx, C.min, 0);
        updateCtrl();
    }

    function updateCtrl() {
        $('#svcPrev').disabled = C.tx >= -1;
        $('#svcNext').disabled = C.tx <= C.min + 1;
    }

    function snapTo(i) {
        C.idx = clamp(i, 0, cards.length - 1);
        C.tx = clamp(-C.idx * C.step, C.min, 0);
        updateCtrl();
    }

    function cardFrame(dt) {
        const t = C.drag ? 1 : (RM.matches ? 1 : 1 - Math.pow(1 - T.cardEase, dt / 16.667));
        C.x = lerp(C.x, C.tx, t);
        if (Math.abs(C.x - C.tx) < 0.1) C.x = C.tx;
        track.style.transform = `translate3d(${C.x.toFixed(2)}px,0,0)`;
        if (RM.matches) return;
        const y = S.cur,
            mid = y + vh / 2;
        for (const i of cardInners()) {
            const left = cardBase + i.m.parentElement.offsetLeft0 + C.x,
                w = i.m.offsetWidth0; // cached in cardMeasure: no layout reads per frame
            const px = clamp(((left + w / 2) - vw / 2) / vw, -1, 1);
            const py = clamp((mid - (i.top + i.h / 2)) / ((vh + i.h) / 2), -1, 1);
            i.img.style.transform = `translate3d(${(-px*w*0.05).toFixed(2)}px,${(py*i.r/100*i.h).toFixed(2)}px,0)`;
        }
        // drag cursor follows with lag
        dcCX = lerp(dcCX, dcX, 0.2);
        dcCY = lerp(dcCY, dcY, 0.2);
        dc.style.left = dcCX + 'px';
        dc.style.top = dcCY + 'px';
    }
    if (carousel) {
        $('#svcNext').addEventListener('click', () => {
            snapTo(Math.round(-C.tx / C.step) + 1);
        });
        $('#svcPrev').addEventListener('click', () => {
            snapTo(Math.round(-C.tx / C.step) - 1);
        });
        wrap.addEventListener('pointerdown', e => {
            if (e.button !== 0) return;
            C.drag = {
                x: e.clientX,
                y: e.clientY,
                tx: C.tx,
                lx: e.clientX,
                t: performance.now(),
                moved: false,
                id: e.pointerId
            };
            dc.classList.add('is-down');
        });
        window.addEventListener('pointermove', e => {
            if (!COARSE.matches) {
                dcX = e.clientX;
                dcY = e.clientY;
            }
            if (!C.drag) return;
            const dx = e.clientX - C.drag.x;
            if (!C.drag.moved) {
                if (Math.abs(dx) < 6) return;
                if (Math.abs(e.clientY - C.drag.y) > Math.abs(dx)) {
                    C.drag = null;
                    dc.classList.remove('is-down');
                    return;
                }
                C.drag.moved = true;
                try {
                    wrap.setPointerCapture(C.drag.id);
                } catch (_) {}
            }
            const now = performance.now();
            C.vel = (e.clientX - C.drag.lx) / Math.max(1, now - C.drag.t);
            C.drag.lx = e.clientX;
            C.drag.t = now;
            let t = C.drag.tx + dx;
            if (t > 0) t *= 0.35;
            if (t < C.min) t = C.min + (t - C.min) * 0.35;
            C.tx = t;
        });
        const endDrag = () => {
            if (!C.drag) return;
            dc.classList.remove('is-down');
            if (C.drag.moved) {
                suppressCardClick = true;
                const proj = C.tx + C.vel * 260;
                snapTo(Math.round(-proj / C.step));
            }
            C.drag = null;
        };
        window.addEventListener('pointerup', endDrag);
        window.addEventListener('pointercancel', endDrag);
        wrap.addEventListener('pointerenter', e => {
            if (!COARSE.matches && !RM.matches) {
                dcX = dcCX = e.clientX;
                dcY = dcCY = e.clientY;
                dc.classList.add('is-on');
            }
        });
        wrap.addEventListener('pointerleave', () => dc.classList.remove('is-on', 'is-down'));
        let suppressCardClick = false;
        wrap.addEventListener('pointerdown', () => {
            suppressCardClick = false;
        });
        wrap.addEventListener('pointermove', () => {
            if (C.drag && C.drag.moved) suppressCardClick = true;
        });
        wrap.addEventListener('click', e => {
            if (suppressCardClick) {
                e.preventDefault();
                e.stopPropagation();
            }
        }, true);
    }

    /* ---------- menu ---------- */
    const menu = $('#menu');
    menu.inert = true;
    let menuOpen = false;

    function setMenu(o) {
        menuOpen = o;
        menu.inert = !o;
        smoothEl.inert = o;
        root.classList.toggle('menu-active', o);
        menu.classList.toggle('is-open', o);
        menu.setAttribute('aria-hidden', !o);
        nav.classList.toggle('menu-open', o);
        const b = $('#menuOpen');
        b.setAttribute('aria-expanded', o);
        b.setAttribute('aria-label', o ? 'Close menu' : 'Open menu');
        if (!o) b.focus({
            preventScroll: true
        });
    }
    // one button: the burger opens and, morphed into the X, closes
    $('#menuOpen').addEventListener('click', () => setMenu(!menuOpen));
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            setMenu(false);
            cur.classList.remove('is-open');
            $('.cur-btn', cur).setAttribute('aria-expanded', 'false');
        }
    });

    /* ---------- currency (travels between pages in the hash) ---------- */
    const cur = $('#cur');

    function setCurrency(c) {
        currency = c;
        $$('[data-cur]', cur).forEach(x => x.toggleAttribute('aria-current', x.dataset.cur === c));
        $$('[data-menu-currency]').forEach(x => x.setAttribute('aria-pressed', x.dataset.menuCurrency === c));
        $('#curLabel').textContent = c;
        window.KMStore?.setCurrency(c);
        $$('.curMirror').forEach(m => m.textContent = c);
    }
    $('.cur-btn', cur).addEventListener('click', e => {
        e.stopPropagation();
        const o = !cur.classList.contains('is-open');
        cur.classList.toggle('is-open', o);
        $('.cur-btn', cur).setAttribute('aria-expanded', o);
    });
    $$('[data-cur]', cur).forEach(b => b.addEventListener('click', () => {
        setCurrency(b.dataset.cur);
        cur.classList.remove('is-open');
        $('.cur-btn', cur).setAttribute('aria-expanded', 'false');
    }));
    document.addEventListener('click', () => {
        cur.classList.remove('is-open');
        $('.cur-btn', cur).setAttribute('aria-expanded', 'false');
    });
    $$('[data-menu-currency]').forEach(b => b.addEventListener('click', () => {
        setCurrency(b.dataset.menuCurrency);
        if (!KMConfig.currencyRates[b.dataset.menuCurrency]) toast('Package prices are currently available in USD.');
    }));
    setCurrency(currency);

    /* ---------- anchors, page links and inert links ---------- */
    function scrollToId(id, instant) {
        const el = document.getElementById(id);
        if (!el) return;
        const target = id === 'top' ? 0 : clamp(docTop(el), 0, maxScroll);
        if (instant) {
            window.scrollTo(0, target);
            S.cur = S.target = S.last = target;
            S.dir = 0;
            forceNav = true;
            return;
        }
        if (smooth || RM.matches) window.scrollTo(0, target);
        else window.scrollTo({
            top: target,
            behavior: 'smooth'
        });
    }
    // fleava style page change: the page goes dark and a hairline progress bar runs, then the next page settles in
    const veil = $('#veil');
    let leaving = false;

    function leaveTo(href) {
        if (leaving) return;
        leaving = true;
        const [file, anchor] = href.split('#');
        const parts = [];
        if (anchor) parts.push(anchor);
        if (currency !== 'USD') parts.push('cur=' + currency);
        const url = file + (parts.length ? '#' + parts.join('&') : '');
        if (RM.matches) {
            location.href = url;
            return;
        }
        root.classList.add('is-leaving');
        setTimeout(() => {
            location.href = url;
        }, 650);
    }
    window.addEventListener('pageshow', e => {
        if (e.persisted) {
            leaving = false;
            root.classList.remove('is-leaving');
        }
    });
    document.addEventListener('click', e => {
        const a = e.target.closest('a');
        if (!a) return;
        if (e.defaultPrevented || a.hasAttribute('download') || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        if (a.dataset.go) {
            e.preventDefault();
            const go = () => scrollToId(a.dataset.go);
            if (menuOpen) {
                setMenu(false);
                setTimeout(go, 500);
            } else go();
            return;
        }

        const href = a.getAttribute('href') || '';
        if (/^[a-z0-9-]+\.html(#.*)?$/i.test(href) && !e.metaKey && !e.ctrlKey && !e.shiftKey) {
            e.preventDefault();
            const [file, anchor] = href.split('#');
            if (file === location.pathname.split('/').pop() || (file === 'index.html' && PAGE === 'home' && /\/$/.test(location.pathname))) { // same page: just scroll
                const go = () => scrollToId(anchor || 'top');
                if (menuOpen) {
                    setMenu(false);
                    setTimeout(go, 500);
                } else go();
                return;
            }
            if (menuOpen) setMenu(false);
            leaveTo(href);
        }
    });
    const toastEl = $('#toast');
    let toastT = 0;

    function toast(msg) {
        toastEl.textContent = msg;
        toastEl.classList.add('is-on');
        clearTimeout(toastT);
        toastT = setTimeout(() => toastEl.classList.remove('is-on'), 2200);
    }

    /* ---------- accordion (FAQ) ---------- */
    $$('[data-acc]').forEach(row => {
        const btn = $('button', row),
            panel = $('.acc-panel', row);
        btn.addEventListener('click', () => {
            const open = !row.classList.contains('is-open');
            row.classList.toggle('is-open', open);
            btn.setAttribute('aria-expanded', open);
            panel.setAttribute('aria-hidden', !open);
            // the document height changes while the panel animates: keep the smooth shell in step
            const t0 = performance.now();
            (function tick() {
                measure();
                if (performance.now() - t0 < 800) requestAnimationFrame(tick);
            })();
        });
    });

    /* ---------- contact form ---------- */
    const form = null; // Form transport is handled by commerce.js.
    if (form) {
        const fileIn = $('#brief', form),
            fileLabel = $('#briefName', form);
        fileIn.addEventListener('change', () => {
            const f = fileIn.files[0];
            fileLabel.textContent = f ? f.name : fileLabel.dataset.empty;
            fileLabel.classList.toggle('has-file', !!f);
        });
        const cap = $('#captcha', form);
        cap.addEventListener('click', () => {
            if (cap.classList.contains('is-checked') || cap.classList.contains('is-busy')) return;
            cap.classList.add('is-busy');
            setTimeout(() => {
                cap.classList.remove('is-busy');
                cap.classList.add('is-checked');
                cap.setAttribute('aria-checked', 'true');
                cap.closest('.field-wrap').classList.remove('has-error');
            }, RM.matches ? 0 : 700);
        });
        cap.addEventListener('keydown', e => {
            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                cap.click();
            }
        });
        const sel = $('select', form);
        const syncSel = () => sel.classList.toggle('is-empty', !sel.value);
        sel.addEventListener('change', syncSel);
        syncSel();
        $$('input,textarea,select', form).forEach(i => i.addEventListener('input', () => {
            const w = i.closest('.field-wrap');
            if (w) w.classList.remove('has-error');
        }));
        form.addEventListener('submit', e => {
            e.preventDefault();
            let first = null;
            const need = [
                ['name', v => v.trim().length > 0],
                ['email', v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())],
                ['message', v => v.trim().length > 0]
            ];
            need.forEach(([n, ok]) => {
                const i = form.elements[n];
                const w = i.closest('.field-wrap');
                const bad = !ok(i.value);
                w.classList.toggle('has-error', bad);
                if (bad && !first) first = i;
            });
            const cons = form.elements.consent;
            cons.closest('.field-wrap').classList.toggle('has-error', !cons.checked);
            if (!cons.checked && !first) first = cons;
            const capOk = cap.classList.contains('is-checked');
            cap.closest('.field-wrap').classList.toggle('has-error', !capOk);
            if (!capOk && !first) first = cap;
            if (first) {
                first.focus({
                    preventScroll: true
                });
                return;
            }
            const name = form.elements.name.value.trim().split(/\s+/)[0];
            $('#sentName').textContent = name;
            form.closest('.write').classList.add('is-sent');
            setTimeout(() => {
                measure();
                $('#sent').classList.add('is-inview');
            }, 50);
        });
    }

    /* ---------- init ---------- */
    let resizeT = 0;

    function relayout() {
        const w = root.clientWidth;
        root.style.setProperty('--u', (MOBILE.matches ? 1 : w / 1920) + 'px');
        splitAll();
        $$('[data-hero]').forEach(h => h.classList.add('is-inview'));
        setMode();
        measure();
        forceNav = true;
    }
    window.addEventListener('resize', () => {
        clearTimeout(resizeT);
        resizeT = setTimeout(() => {
            const keep = new Set($$('.is-inview'));
            relayout();
            keep.forEach(e => e.classList.add('is-inview'));
            reveals.forEach(r => {
                if (r.el.classList.contains('is-inview')) r.done = true;
            });
            $$('[data-lines].is-inview .line>span').forEach(s => s.style.transitionDelay = '0s');
        }, 150);
    });
    RM.addEventListener('change', () => relayout());
    COARSE.addEventListener('change', () => relayout());

    function start() {
        if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
        window.scrollTo(0, 0);
        root.style.setProperty('--u', (MOBILE.matches ? 1 : root.clientWidth / 1920) + 'px');
        splitAll();
        setMode();
        measure();
        S.cur = S.target = 0;
        if (arriveAnchor) scrollToId(arriveAnchor, true);
        requestAnimationFrame(t => {
            lastT = t;
            requestAnimationFrame(frame);
        });
        // entrance: the veil lifts, lines rise, labels fade, the header image settles
        requestAnimationFrame(() => requestAnimationFrame(() => {
            root.classList.add('is-arrived');
            document.body.classList.add('is-loaded');
            $$('[data-hero]').forEach((h, i) => setTimeout(() => h.classList.add('is-inview'), (arriveAnchor ? 0 : 250) + i * 150));
        }));
        // images decode late on first paint: re-measure once everything is in
        window.addEventListener('load', () => {
            measure();
            if (arriveAnchor) scrollToId(arriveAnchor, true);
        });
    }
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(start);
    else start();

    /* ---------- diagnostics console ---------- */
    window.addEventListener('km:layout', () => {
        measure();
        forceNav = true;
    });
    new ResizeObserver(() => {
        if (docH !== smoothEl.offsetHeight) {
            measure();
            forceNav = true;
        }
    }).observe(smoothEl);
    document.addEventListener('focusin', e => {
        if (smooth && smoothEl.contains(e.target)) {
            const b = e.target.getBoundingClientRect();
            if (b.top < 100 || b.bottom > vh - 30) {
                const top = clamp(docTop(e.target) - 120, 0, maxScroll);
                window.scrollTo(0, top);
                S.cur = S.target = top;
            }
        }
    });
    window.km = {
        scrollTo: (id) => scrollToId(id),
        version: VERSION + ' ' + PAGE + ' (built ' + BUILT + ')',
        hero: () => slideEls.map((el, i) => {
            const v = slideVideo(i);
            return {
                i: i + 1,
                cls: el.className,
                video: !!v,
                paused: v ? v.paused : null,
                t: v ? +v.currentTime.toFixed(2) : null,
                w: v ? v.videoWidth : null
            };
        }),
        video: () => introVideo && ({
            paused: introVideo.paused,
            t: +introVideo.currentTime.toFixed(2),
            ready: introVideo.readyState,
            w: introVideo.videoWidth,
            h: introVideo.videoHeight,
            err: introVideo.error && introVideo.error.code
        }),
        state: () => ({
            page: PAGE,
            currency,
            smooth,
            reducedMotion: RM.matches,
            coarse: COARSE.matches,
            scroll: Math.round(S.cur),
            target: Math.round(S.target),
            docH,
            vh,
            sections: sections.length,
            parallax: parallax.length,
            inners: inners.length,
            revealed: reveals.filter(r => r.done).length + '/' + reveals.length,
            slide: slidesEl ? slideIdx + 1 : null,
            heroAutoMs: Math.round(heroElapsed),
            cardX: carousel ? Math.round(C.x) : null
        }),
        tune: (o = {}) => {
            Object.assign(T, o);
            return {
                ...T
            };
        },
        remeasure: () => {
            measure();
            return 'ok';
        }
    };
    console.info('%cklicksandmortar ' + window.km.version, 'color:#e0ccbb;background:#0f0f0f;padding:2px 6px');
})();