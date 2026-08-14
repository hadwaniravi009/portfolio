/**
 * RH Portfolio Core - Admin JS for Media Uploads & UI Helpers
 */

jQuery(document).ready(function($) {
    // Media Uploader for Icon / Image input fields
    $('.rh-media-upload-btn').on('click', function(e) {
        e.preventDefault();
        var targetInput = $($(this).data('target'));

        var customUploader = wp.media({
            title: 'Select or Upload Icon / Image',
            button: {
                text: 'Use this Image'
            },
            multiple: false
        });

        customUploader.on('select', function() {
            var attachment = customUploader.state().get('selection').first().toJSON();
            targetInput.val(attachment.url).trigger('change');
        });

        customUploader.open();
    });
});
