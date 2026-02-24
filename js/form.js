(function () {
    var form = document.getElementById('business-identity-form');
    var profileZone = document.getElementById('profilePhotoZone');
    var profileInput = document.getElementById('profilePhoto');
    var profilePreview = document.getElementById('profilePhotoPreview');

    if (!form) return;

    var requiredFields = [
        { id: 'fullName', label: 'Full Name', message: 'Please enter your full name.' },
        { id: 'jobTitle', label: 'Job Title', message: 'Please enter your job title.' },
        { id: 'profilePhoto', label: 'Profile Photo', message: 'Please upload a profile photo (JPG, PNG or WebP).', isFile: true },
        { id: 'mobile', label: 'Mobile', message: 'Please enter your mobile number.' },
        { id: 'email', label: 'Work Email', message: 'Please enter a valid work email address.' }
    ];

    function getFieldGroup(field) {
        if (!field) return null;
        if (field.id === 'profilePhoto') return profileZone ? profileZone.closest('.form-group') : null;
        return field.closest('.form-group');
    }

    function getOrCreateErrorEl(group) {
        if (!group) return null;
        var el = group.querySelector('.field-error');
        if (el) return el;
        el = document.createElement('span');
        el.className = 'field-error';
        el.setAttribute('role', 'alert');
        el.setAttribute('aria-live', 'polite');
        group.appendChild(el);
        return el;
    }

    function setError(field, message) {
        var group = getFieldGroup(field);
        if (!group) return;
        group.classList.add('is-invalid');
        var errEl = getOrCreateErrorEl(group);
        if (errEl) errEl.textContent = message;
    }

    function clearError(field) {
        var group = getFieldGroup(field);
        if (!group) return;
        group.classList.remove('is-invalid');
        var errEl = group.querySelector('.field-error');
        if (errEl) errEl.textContent = '';
    }

    function validateForm() {
        var invalid = [];
        requiredFields.forEach(function (def) {
            var field = document.getElementById(def.id);
            var group = getFieldGroup(field);
            var valid = false;
            if (def.isFile && field) {
                valid = field.files && field.files.length > 0;
            } else if (field) {
                valid = field.value.trim() !== '';
            }
            if (!valid && group) {
                setError(field, def.message);
                invalid.push({ group: group, field: field });
            } else {
                clearError(field);
            }
        });
        return invalid;
    }

    function clearAllErrors() {
        requiredFields.forEach(function (def) {
            clearError(document.getElementById(def.id));
        });
    }

    function setupUploadZone(zone, input, preview) {
        if (!zone || !input) return;
        zone.addEventListener('click', function () { input.click(); });
        zone.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                input.click();
            }
        });
        input.addEventListener('change', function () {
            var file = this.files[0];
            if (file) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    if (preview) {
                        preview.src = e.target.result;
                        preview.alt = file.name;
                    }
                    zone.classList.add('has-file');
                };
                reader.readAsDataURL(file);
            } else {
                if (preview) preview.src = '';
                zone.classList.remove('has-file');
            }
            clearError(this);
        });
    }

    setupUploadZone(profileZone, profileInput, profilePreview);

    requiredFields.forEach(function (def) {
        if (def.isFile) return;
        var field = document.getElementById(def.id);
        if (!field) return;
        field.addEventListener('input', function () { clearError(this); });
        field.addEventListener('blur', function () { clearError(this); });
    });

    var whatsappInput = document.getElementById('whatsapp');
    var mobileInput = document.getElementById('mobile');
    if (mobileInput && whatsappInput) {
        mobileInput.addEventListener('blur', function () {
            if (!whatsappInput.value.trim() && this.value.trim()) {
                whatsappInput.value = this.value;
            }
        });
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        clearAllErrors();
        var invalid = validateForm();
        if (invalid.length > 0) {
            invalid[0].group.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }
        var btn = document.getElementById('btnSubmit');
        if (btn) {
            btn.disabled = true;
            btn.textContent = 'Creating…';
        }
        var profileFile = profileInput && profileInput.files && profileInput.files[0];
        function readDataUrl(file) {
            return new Promise(function (resolve, reject) {
                var r = new FileReader();
                r.onload = function () { resolve(r.result); };
                r.onerror = reject;
                r.readAsDataURL(file);
            });
        }
        Promise.all([
            readDataUrl(profileFile),
        ]).then(function (results) {
            var profilePhotoBase64 = results[0];
            var payload = {
                fullName: document.getElementById('fullName').value.trim(),
                jobTitle: document.getElementById('jobTitle').value.trim(),
                profilePhotoBase64: profilePhotoBase64,
                mobile: document.getElementById('mobile').value.trim(),
                email: document.getElementById('email').value.trim(),
                website: document.getElementById('website').value.trim(),
                officeAddress: document.getElementById('officeAddress').value.trim(),
                mapsLink: document.getElementById('mapsLink').value.trim(),
                whatsapp: document.getElementById('whatsapp').value.trim(),
                facebook: document.getElementById('facebook').value.trim(),
                instagram: document.getElementById('instagram').value.trim(),
                linkedin: document.getElementById('linkedin').value.trim(),
                tiktok: document.getElementById('tiktok').value.trim(),
                youtube: document.getElementById('youtube').value.trim()
            };
            var apiBase = (typeof window.API_BASE !== 'undefined' && window.API_BASE) ? window.API_BASE : '';
            return fetch(apiBase + '/api/identity', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
        })
            .then(function (res) {
                return res.text().then(function (text) {
                    var data = null;
                    if (text && text.trim()) {
                        try { data = JSON.parse(text); } catch (e) { /* ignore */ }
                    }
                    if (!res.ok) {
                        var msg = (data && (data.message || data.error)) || text || ('Request failed (' + res.status + ')');
                        throw new Error(msg);
                    }
                    return data || {};
                });
            })
            .then(function (data) {
                if (data.id) {
                    try {
                        var key = 'ew_created_card_ids';
                        var ids = JSON.parse(localStorage.getItem(key) || '[]');
                        if (ids.indexOf(data.id) === -1) ids.push(data.id);
                        localStorage.setItem(key, JSON.stringify(ids));
                    } catch (e) { /* ignore */ }
                }
                if (data.cardUrl) {
                    window.location.href = data.cardUrl;
                } else if (data.id) {
                    window.location.href = '/card/?id=' + data.id;
                } else {
                    alert('Created. ID: ' + (data.id || 'unknown'));
                }
            })
            .catch(function (err) {
                alert(err.message || 'Failed to create identity. Check the console.');
                console.error(err);
                if (btn) {
                    btn.disabled = false;
                    btn.textContent = 'Create Business Identity';
                }
            });
    });
})();
