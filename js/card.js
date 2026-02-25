(function () {
    var DEMO_DATA = {
        fullName: 'Bilal Cheema',
        jobTitle: 'Digital Transformation Lead',
        profilePhotoUrl: 'https://i.imgur.com/rT4jZG4.jpeg',
        mobile: '+971 50 631 1572',
        email: 'bilal@eaglewingsuae.com',
        website: 'https://eaglewingsuae.com/',
        officeAddress: '1509, 1 Lake Plaza, JLT Cluster T\nDubai, United Arab Emirates',
        mapsLink: 'https://www.google.com/maps/place/Eagle+Wings+Business+Consultant/@25.0791251,55.1478561,17z/data=!3m1!4b1!4m6!3m5!1s0x3e5f4399e76d0543:0x76fce73242c77b62!8m2!3d25.0791203!4d55.150431!16s%2Fg%2F11qzcnrthf?entry=ttu',
        whatsapp: '971506311572',
        facebook: 'https://www.facebook.com/eaglewingsuae/',
        instagram: 'https://www.instagram.com/eaglewingsbusinessconsultant/',
        linkedin: 'https://www.linkedin.com/company/eaglewingsbusinessconsultant/',
        tiktok: 'https://www.tiktok.com/@eagle_wings_business',
        youtube: 'https://www.youtube.com/@Eaglewingsbusinessconsultant'
    };

    function getQueryParam(name) {
        var m = new RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
        return m ? decodeURIComponent(m[1]) : '';
    }

    function getData(id, callback) {
        if (id === 'demo') {
            if (callback) callback(DEMO_DATA);
            else return DEMO_DATA;
            return;
        }
        var apiBase = 'https://eagle-wings-backend.onrender.com';
        fetch(apiBase + '/api/identity/' + encodeURIComponent(id))
            .then(function (res) {
                if (res.status === 404) {
                    if (callback) callback(null);
                    else return null;
                    return;
                }
                if (!res.ok) throw new Error('Failed to load');
                return res.json();
            })
            .then(function (data) {
                if (callback) callback(data);
            })
            .catch(function () {
                if (callback) callback(null);
            });
    }

    function setText(el, text) {
        if (!el) return;
        el.textContent = text || '';
    }

    function setAttr(el, attr, value) {
        if (!el || value == null || value === '') return;
        el.setAttribute(attr, value);
    }

    function setHref(el, value) {
        if (!el) return;
        el.href = value || '#';
        el.style.display = value ? '' : 'none';
    }

    var DEFAULT_LOGO = '../images/logo-img.png';
    var DEFAULT_BRAND1 = 'EAGLE WINGS';
    var DEFAULT_BRAND2 = 'BUSINESS CONSULTANT';

    function toAbsoluteUrl(url) {
        if (!url) return '';
        if (/^https?:\/\//i.test(url)) return url;
        try { return new URL(url, window.location.href).href; } catch (e) { return url; }
    }

    function fillCard(data) {
        var logo = document.getElementById('card-logo');
        var photo = document.getElementById('card-photo');
        setAttr(photo, 'src', data.profilePhotoUrl);
        setAttr(photo, 'alt', data.fullName);
        setAttr(logo, 'src', data.logoUrl || DEFAULT_LOGO);
        setAttr(logo, 'alt', data.brandLine1 || DEFAULT_BRAND1);
        setText(document.getElementById('card-header-brand1'), data.brandLine1 || DEFAULT_BRAND1);
        setText(document.getElementById('card-header-brand2'), data.brandLine2 || DEFAULT_BRAND2);
        setText(document.getElementById('card-name'), data.fullName);
        setText(document.getElementById('card-title'), data.jobTitle);
        setText(document.getElementById('card-brand1'), data.brandLine1 || '');
        setText(document.getElementById('card-brand2'), data.brandLine2 || '');
        var footer = document.getElementById('card-footer');
        if (footer) {
            var hasFooter = (data.brandLine1 && data.brandLine1.trim()) || (data.brandLine2 && data.brandLine2.trim());
            footer.style.display = hasFooter ? 'block' : 'none';
        }
        setText(document.getElementById('card-mobile'), data.mobile);
        setText(document.getElementById('card-email'), data.email);
        setText(document.getElementById('card-website'), data.website ? data.website.replace(/^https?:\/\//, '').replace(/\/$/, '') : '');
        setHref(document.getElementById('card-link-mobile'), 'tel:' + (data.mobile || '').replace(/\s/g, ''));
        setHref(document.getElementById('card-link-email'), 'mailto:' + data.email);
        setHref(document.getElementById('card-link-website'), data.website);
        var addressEl = document.getElementById('card-link-address');
        var addressText = document.getElementById('card-address');
        if (data.officeAddress) {
            addressText.textContent = '';
            addressText.innerHTML = (data.officeAddress || '').replace(/\n/g, '<br>');
            setHref(addressEl, data.mapsLink || '#');
            addressEl.style.display = 'flex';
        }
        var wa = document.getElementById('card-link-whatsapp');
        if (data.whatsapp) {
            wa.href = 'https://wa.me/' + (data.whatsapp || '').replace(/\D/g, '');
            wa.style.display = 'flex';
        }
        var socials = [
            { url: data.facebook, label: 'Facebook', cls: 'facebook' },
            { url: data.instagram, label: 'Instagram', cls: 'instagram' },
            { url: data.linkedin, label: 'LinkedIn', cls: 'linkedin' },
            { url: data.tiktok, label: 'TikTok', cls: 'tiktok' },
            { url: data.youtube, label: 'YouTube', cls: 'youtube' }
        ];
        var container = document.getElementById('card-social-links');
        container.innerHTML = '';
        socials.forEach(function (s) {
            if (!s.url) return;
            var svg = {
                facebook: '<svg viewBox="0 0 24 24"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>',
                instagram: '<svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>',
                linkedin: '<svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
                tiktok: '<svg viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/></svg>',
                youtube: '<svg viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>'
            };
            var a = document.createElement('a');
            a.href = s.url;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.className = 'social-link';
            a.title = s.label;
            a.innerHTML = '<div class="social-icon ' + s.cls + '">' + (svg[s.cls] || svg.facebook) + '</div><span class="social-name"></span>';
            container.appendChild(a);
        });
    }

    function fillSignature(data) {
        setAttr(document.getElementById('sig-photo'), 'src', data.profilePhotoUrl);
        setAttr(document.getElementById('sig-photo'), 'alt', data.fullName);
        var sigLogo = document.getElementById('sig-logo');
        setAttr(sigLogo, 'src', data.logoUrl || DEFAULT_LOGO);
        sigLogo.style.display = 'block';
        setText(document.getElementById('sig-brand1'), data.brandLine1 || DEFAULT_BRAND1);
        setText(document.getElementById('sig-brand2'), data.brandLine2 || DEFAULT_BRAND2);
        setText(document.getElementById('sig-name'), data.fullName);
        setText(document.getElementById('sig-title'), data.jobTitle);
        setText(document.getElementById('sig-footer-brand1'), data.brandLine1 || DEFAULT_BRAND1);
        setText(document.getElementById('sig-footer-brand2'), data.brandLine2 || DEFAULT_BRAND2);
        var contacts = document.getElementById('sig-contacts');
        contacts.innerHTML = '';
        if (data.mobile) {
            contacts.innerHTML += '<a href="tel:' + (data.mobile || '').replace(/\s/g, '') + '" class="sig-contact-item" target="_blank" rel="noopener noreferrer"><span class="cicon"><svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.01 2.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg></span>' + data.mobile + '</a>';
        }
        if (data.email) {
            contacts.innerHTML += '<a href="mailto:' + data.email + '" class="sig-contact-item upper" target="_blank" rel="noopener noreferrer"><span class="cicon"><svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg></span>' + data.email + '</a>';
        }
        if (data.website) {
            var webDisplay = data.website.replace(/^https?:\/\//, '').replace(/\/$/, '');
            contacts.innerHTML += '<a href="' + data.website + '" target="_blank" rel="noopener noreferrer" class="sig-contact-item upper"><span class="cicon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg></span>' + webDisplay + '</a>';
        }
        if (data.officeAddress) {
            var mapsUrl = data.mapsLink || '#';
            var addrShort = (data.officeAddress || '').split('\n')[0];
            contacts.innerHTML += '<a href="' + mapsUrl + '" target="_blank" rel="noopener noreferrer" class="sig-contact-item"><span class="cicon"><svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1118 0z"/><circle cx="12" cy="10" r="3"/></svg></span>' + addrShort + '</a>';
        }
        var socials = document.getElementById('sig-socials');
        socials.innerHTML = '';
        var waNum = (data.whatsapp || data.mobile || '').replace(/\D/g, '');
        if (waNum) socials.innerHTML += '<a href="https://wa.me/' + waNum + '" target="_blank" rel="noopener noreferrer" class="soc wa" title="WhatsApp"><svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></a>';
        if (data.facebook) socials.innerHTML += '<a href="' + data.facebook + '" target="_blank" rel="noopener noreferrer" class="soc fb" title="Facebook"><svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>';
        if (data.instagram) socials.innerHTML += '<a href="' + data.instagram + '" target="_blank" rel="noopener noreferrer" class="soc ig" title="Instagram"><svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a>';
        if (data.linkedin) socials.innerHTML += '<a href="' + data.linkedin + '" target="_blank" rel="noopener noreferrer" class="soc li" title="LinkedIn"><svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>';
        if (data.tiktok) socials.innerHTML += '<a href="' + data.tiktok + '" target="_blank" rel="noopener noreferrer" class="soc tt" title="TikTok"><svg viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg></a>';
        if (data.youtube) socials.innerHTML += '<a href="' + data.youtube + '" target="_blank" rel="noopener noreferrer" class="soc yt" title="YouTube"><svg viewBox="0 0 24 24"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg></a>';
    }

    function escapeHtml(s) {
        if (!s) return '';
        return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    var GOLD = '#FFC107';
    /* Gmail-safe: minimal 1-color outline icons (Icons8 material-outlined, gold) */
    var SIG_ICON_BASE = 'https://img.icons8.com/material-outlined/24/FFC107/';
    var SIG_ICON_PHONE = '<img src="' + SIG_ICON_BASE + 'phone.png" width="14" height="14" alt="" style="display:block;border:0;">';
    var SIG_ICON_EMAIL = '<img src="' + SIG_ICON_BASE + 'new-post.png" width="14" height="14" alt="" style="display:block;border:0;">';
    var SIG_ICON_WEB = '<img src="' + SIG_ICON_BASE + 'globe.png" width="14" height="14" alt="" style="display:block;border:0;">';
    var SIG_ICON_PIN = '<img src="' + SIG_ICON_BASE + 'marker.png" width="14" height="14" alt="" style="display:block;border:0;">';
    /* Gmail-safe: minimal 1-color outline social icons, wrapped in table for center alignment */
    var SIG_SOC_BASE = 'https://img.icons8.com/material-outlined/24/ffffff/';
    function sigSocImg(src, alt) {
        return '<table cellpadding="0" cellspacing="0" border="0" width="36" height="36" style="border-collapse:collapse;"><tr><td align="center" valign="middle" style="padding:0;"><img src="' + src + '" width="16" height="16" alt="' + alt + '" style="display:block;margin:0 auto;border:0;"></td></tr></table>';
    }
    var SIG_SOC_WA = sigSocImg(SIG_SOC_BASE + 'whatsapp.png', 'WhatsApp');
    var SIG_SOC_FB = sigSocImg(SIG_SOC_BASE + 'facebook-f.png', 'Facebook');
    var SIG_SOC_IG = sigSocImg(SIG_SOC_BASE + 'instagram-new.png', 'Instagram');
    var SIG_SOC_LI = sigSocImg(SIG_SOC_BASE + 'linkedin.png', 'LinkedIn');
    var SIG_SOC_TT = sigSocImg(SIG_SOC_BASE + 'tiktok.png', 'TikTok');
    var SIG_SOC_YT = sigSocImg(SIG_SOC_BASE + 'youtube-play.png', 'YouTube');

    function buildEmailSignatureHtml(data, cardUrl) {
        var photoUrl = toAbsoluteUrl(data.profilePhotoUrl || '');
        var logoUrl = toAbsoluteUrl(data.logoUrl || DEFAULT_LOGO);
        var cardUrlEsc = escapeHtml(cardUrl || '#');
        var businessCardLink = '<a href="' + cardUrlEsc + '" target="_blank" rel="noopener noreferrer" style="color:#FFC107;text-decoration:none;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Business card</a>';
        var name = escapeHtml(data.fullName || '');
        var title = escapeHtml(data.jobTitle || '');
        var mobile = (data.mobile || '').replace(/\s/g, '');
        var email = (data.email || '');
        var emailEsc = escapeHtml(email);
        var website = (data.website || '');
        var webDisplay = website ? website.replace(/^https?:\/\//, '').replace(/\/$/, '') : '';
        var addrShort = (data.officeAddress || '').split('\n')[0] || '';
        var mapsUrl = (data.mapsLink || '#');
        var linkStyle = 'color:#e8edf8;text-decoration:none;font-size:13px;';
        var linkStyleUpper = 'color:#e8edf8;text-decoration:none;font-size:12px;text-transform:uppercase;';
        var contactRows = '';
        if (mobile) contactRows += '<tr><td style="vertical-align:middle;width:22px;padding:4px 6px 4px 0;">' + SIG_ICON_PHONE + '</td><td style="padding:4px 0;"><a href="tel:' + mobile + '" style="' + linkStyle + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(data.mobile || '') + '</a></td></tr>';
        if (email) contactRows += '<tr><td style="vertical-align:middle;width:22px;padding:4px 6px 4px 0;">' + SIG_ICON_EMAIL + '</td><td style="padding:4px 0;"><a href="mailto:' + escapeHtml(email) + '" style="' + linkStyleUpper + '" target="_blank" rel="noopener noreferrer">' + emailEsc + '</a></td></tr>';
        if (website) contactRows += '<tr><td style="vertical-align:middle;width:22px;padding:4px 6px 4px 0;">' + SIG_ICON_WEB + '</td><td style="padding:4px 0;"><a href="' + escapeHtml(website) + '" style="' + linkStyleUpper + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(webDisplay) + '</a></td></tr>';
        if (addrShort) contactRows += '<tr><td style="vertical-align:middle;width:22px;padding:4px 6px 4px 0;">' + SIG_ICON_PIN + '</td><td style="padding:4px 0;"><a href="' + escapeHtml(mapsUrl) + '" style="' + linkStyle + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(addrShort) + '</a></td></tr>';
        var photoImg = photoUrl ? '<img src="' + photoUrl + '" alt="" width="80" height="80" style="display:block;margin:0 auto;border-radius:50%;border:3px solid #1A1D2C;">' : '';
        var logoImg = '<img src="https://digital.eaglewingsuae.com/images/logo-img.png" alt="Eagle Wings" width="56" style="display:block;margin:0 auto;">';
        var socBorder = 'border:1px solid #FFC107;';
        var socialLinks = '';
        var waNum = (data.whatsapp || data.mobile || '').replace(/\D/g, '');
        if (waNum) socialLinks += '<a href="https://wa.me/' + waNum + '" target="_blank" rel="noopener noreferrer" style="display:inline-block;width:36px;height:36px;' + socBorder + 'border-radius:10px;text-align:center;line-height:36px;margin-right:6px;" title="WhatsApp">' + SIG_SOC_WA + '</a>';
        if (data.facebook) socialLinks += '<a href="' + escapeHtml(data.facebook) + '" target="_blank" rel="noopener noreferrer" style="display:inline-block;width:36px;height:36px;' + socBorder + 'border-radius:10px;text-align:center;line-height:36px;margin-right:6px;" title="Facebook">' + SIG_SOC_FB + '</a>';
        if (data.instagram) socialLinks += '<a href="' + escapeHtml(data.instagram) + '" target="_blank" rel="noopener noreferrer" style="display:inline-block;width:36px;height:36px;' + socBorder + 'border-radius:10px;text-align:center;line-height:36px;margin-right:6px;" title="Instagram">' + SIG_SOC_IG + '</a>';
        if (data.linkedin) socialLinks += '<a href="' + escapeHtml(data.linkedin) + '" target="_blank" rel="noopener noreferrer" style="display:inline-block;width:36px;height:36px;' + socBorder + 'border-radius:10px;text-align:center;line-height:36px;margin-right:6px;" title="LinkedIn">' + SIG_SOC_LI + '</a>';
        if (data.tiktok) socialLinks += '<a href="' + escapeHtml(data.tiktok) + '" target="_blank" rel="noopener noreferrer" style="display:inline-block;width:36px;height:36px;' + socBorder + 'border-radius:10px;text-align:center;line-height:36px;margin-right:6px;" title="TikTok">' + SIG_SOC_TT + '</a>';
        if (data.youtube) socialLinks += '<a href="' + escapeHtml(data.youtube) + '" target="_blank" rel="noopener noreferrer" style="display:inline-block;width:36px;height:36px;' + socBorder + 'border-radius:10px;text-align:center;line-height:36px;" title="YouTube">' + SIG_SOC_YT + '</a>';
        var contactsTable = contactRows ? '<table cellpadding="0" cellspacing="0" border="0"><tbody>' + contactRows + '</tbody></table>' : '';
        var wrapperStyle = 'max-width:580px;background:#1A1D2C;border:2px solid rgba(255,255,255,0.2);border-radius:12px;font-family:\'Segoe UI\',Arial,sans-serif;';
        var leftColStyle = 'padding:16px 20px;border-right:1px solid rgba(255,255,255,0.15);text-align:center;';
        var titleTdStyle = 'font-size:11px;font-weight:700;color:rgba(255,255,255,0.9);letter-spacing:2px;text-transform:uppercase;padding-bottom:12px;';
        var footerRowStyle = 'padding:14px 24px;border-top:1px solid rgba(255,255,255,0.1);background:rgba(0,0,0,0.2);';
        var main = '<table cellpadding="0" cellspacing="0" border="0" width="580" style="' + wrapperStyle + '"><tr><td width="180" valign="top" style="' + leftColStyle + '"><table cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td style="padding-bottom:12px;">' + photoImg + '</td></tr><tr><td>' + logoImg + '</td></tr><tr><td style="padding-top:6px;">' + businessCardLink + '</td></tr></table></td><td valign="top" style="padding:16px 24px;"><table cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td style="font-size:26px;font-weight:400;color:#fff;font-family:Georgia,serif;padding-bottom:6px;">' + name + '</td></tr><tr><td style="' + titleTdStyle + '">' + title + '</td></tr><tr><td style="padding-top:8px;">' + contactsTable + '</td></tr></table></td></tr><tr><td colspan="2" style="' + footerRowStyle + '"><table cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td style="font-size:9px;font-weight:700;color:rgba(255,255,255,0.5);letter-spacing:2px;vertical-align:middle;">FOLLOW US</td><td style="vertical-align:middle;padding-left:14px;">' + socialLinks + '</td><td align="right" valign="middle">' + businessCardLink + '</td></tr></table></td></tr></table>';
        return main;
    }

    function fillEmailSignatureSection(data, cardUrl) {
        var html = buildEmailSignatureHtml(data, cardUrl);
        var preview = document.getElementById('sig-email-preview');
        if (preview) preview.innerHTML = html;
        var btn = document.getElementById('copy-sig-html');
        if (btn) btn._sigHtml = html;
    }

    function copyToClipboard(inputEl, btnEl) {
        if (!inputEl || !inputEl.value || !btnEl) return;
        inputEl.select();
        inputEl.setSelectionRange(0, 99999);
        try {
            navigator.clipboard.writeText(inputEl.value);
        } catch (e) {
            document.execCommand('copy');
        }
        btnEl.textContent = 'Copied!';
        btnEl.classList.add('copied');
        setTimeout(function () {
            btnEl.textContent = 'Copy link';
            btnEl.classList.remove('copied');
        }, 2000);
    }

    var id = getQueryParam('id') || 'demo';
    var view = getQueryParam('view') || '';
    var createdIds = [];
    try {
        createdIds = JSON.parse(localStorage.getItem('ew_created_card_ids') || '[]');
    } catch (e) { createdIds = []; }
    var isCreator = id !== 'demo' && createdIds.indexOf(id) !== -1;

    var loadingEl = document.getElementById('cardLoading');
    if (id !== 'demo' && loadingEl) loadingEl.style.display = 'flex';

    getData(id, function (data) {
        if (loadingEl) loadingEl.style.display = 'none';
        if (!data) {
            document.getElementById('notFound').style.display = 'block';
        } else {
            document.getElementById('cardView').style.display = 'block';
            fillCard(data);
            fillSignature(data);
            var baseUrl = window.location.origin + window.location.pathname;
            var cardUrl = baseUrl + '?id=' + encodeURIComponent(id) + '&view=card';
            var signatureUrl = baseUrl + '?id=' + encodeURIComponent(id) + '&view=signature';
            fillEmailSignatureSection(data, cardUrl);
            var shareLinksEl = document.querySelector('.card-share-links');
            var tabBarEl = document.getElementById('cardTabBar');
            var cardSection = document.getElementById('business-card-section');
            var sigSection = document.getElementById('signature-section');
            var sigEmailSection = document.getElementById('signature-email-section');
            var cardInput = document.getElementById('link-business-card');
            var sigInput = document.getElementById('link-email-signature');
            var cardCopyBtn = document.getElementById('copy-business-card');
            var sigCopyBtn = document.getElementById('copy-email-signature');
            var tabCardBtn = document.getElementById('tabBusinessCard');
            var tabSigBtn = document.getElementById('tabEmailSignature');
            var tabCopyForEmailBtn = document.getElementById('tabCopyForEmail');
            var copySigHtmlBtn = document.getElementById('copy-sig-html');

            var isStandalone = view === 'card' || view === 'signature';
            if (isStandalone) {
                if (shareLinksEl) shareLinksEl.style.display = 'none';
                if (tabBarEl) tabBarEl.style.display = 'none';
                if (sigEmailSection) sigEmailSection.style.display = 'none';
                var cardH2 = cardSection ? cardSection.querySelector('h2') : null;
                var sigH2 = sigSection ? sigSection.querySelector('h2') : null;
                if (cardH2) cardH2.style.display = 'none';
                if (sigH2) sigH2.style.display = 'none';
                if (view === 'card') {
                    if (cardSection) cardSection.style.display = 'block';
                    if (sigSection) sigSection.style.display = 'none';
                } else {
                    if (cardSection) cardSection.style.display = 'none';
                    if (sigSection) sigSection.style.display = 'block';
                }
            } else {
                if (tabBarEl) tabBarEl.style.display = 'flex';
                if (shareLinksEl) shareLinksEl.style.display = 'flex';
                var activeTab = view === 'signature' ? 'signature' : 'card';
                function setTab(tab) {
                    activeTab = tab;
                    if (cardSection) cardSection.style.display = tab === 'card' ? 'block' : 'none';
                    if (sigSection) sigSection.style.display = tab === 'signature' ? 'block' : 'none';
                    if (sigEmailSection) sigEmailSection.style.display = tab === 'email' ? 'block' : 'none';
                    if (tabCardBtn) { tabCardBtn.classList.toggle('active', tab === 'card'); tabCardBtn.setAttribute('aria-selected', tab === 'card'); }
                    if (tabSigBtn) { tabSigBtn.classList.toggle('active', tab === 'signature'); tabSigBtn.setAttribute('aria-selected', tab === 'signature'); }
                    if (tabCopyForEmailBtn) { tabCopyForEmailBtn.classList.toggle('active', tab === 'email'); tabCopyForEmailBtn.setAttribute('aria-selected', tab === 'email'); }
                }
                setTab(activeTab);
                if (tabCardBtn) tabCardBtn.addEventListener('click', function () { setTab('card'); });
                if (tabSigBtn) tabSigBtn.addEventListener('click', function () { setTab('signature'); });
                if (tabCopyForEmailBtn) tabCopyForEmailBtn.addEventListener('click', function () { setTab('email'); });
                if (cardInput) cardInput.value = cardUrl;
                if (sigInput) sigInput.value = signatureUrl;
                if (cardCopyBtn) cardCopyBtn.addEventListener('click', function () { copyToClipboard(cardInput, cardCopyBtn); });
                if (sigCopyBtn) sigCopyBtn.addEventListener('click', function () { copyToClipboard(sigInput, sigCopyBtn); });
                if (copySigHtmlBtn) copySigHtmlBtn.addEventListener('click', function () {
                    var html = copySigHtmlBtn._sigHtml;
                    if (!html) return;
                    var blobHtml = new Blob([html], { type: 'text/html' });
                    var blobPlain = new Blob([html], { type: 'text/plain' });
                    navigator.clipboard.write([new ClipboardItem({ 'text/html': blobHtml, 'text/plain': blobPlain })])
                        .then(function () {
                            copySigHtmlBtn.textContent = 'Copied!';
                            copySigHtmlBtn.classList.add('copied');
                            setTimeout(function () { copySigHtmlBtn.textContent = 'Copy signature HTML'; copySigHtmlBtn.classList.remove('copied'); }, 2000);
                        })
                        .catch(function () {
                            try {
                                navigator.clipboard.writeText(html);
                            } catch (e) {
                                var ta = document.createElement('textarea');
                                ta.value = html;
                                ta.style.position = 'fixed';
                                ta.style.left = '-9999px';
                                document.body.appendChild(ta);
                                ta.select();
                                try { document.execCommand('copy'); } catch (e2) {}
                                document.body.removeChild(ta);
                            }
                            copySigHtmlBtn.textContent = 'Copied!';
                            copySigHtmlBtn.classList.add('copied');
                            setTimeout(function () { copySigHtmlBtn.textContent = 'Copy signature HTML'; copySigHtmlBtn.classList.remove('copied'); }, 2000);
                        });
                });
            }
        }
    });
})();
