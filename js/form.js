(function () {
    var form = document.getElementById('business-identity-form');
    var profileZone = document.getElementById('profilePhotoZone');
    var profileInput = document.getElementById('profilePhoto');
    var profilePreview = document.getElementById('profilePhotoPreview');
    var logoZone = document.getElementById('brandLogoZone');
    var logoInput = document.getElementById('brandLogo');
    var logoPreview = document.getElementById('brandLogoPreview');

    if (!form) return;

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
        });
    }

    setupUploadZone(profileZone, profileInput, profilePreview);
    setupUploadZone(logoZone, logoInput, logoPreview);

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
        var formData = new FormData(form);
        console.log('Form submitted. Backend will handle upload and link creation.');
        for (var pair of formData.entries()) {
            if (pair[1] instanceof File) {
                console.log(pair[0], pair[1].name, pair[1].size);
            } else {
                console.log(pair[0], pair[1]);
            }
        }
        alert('Form is ready. Connect a backend to upload images and create your public link.');
    });
})();
