// We want to preview images, so we register
// the Image Preview plugin, We also register
// exif orientation (to correct mobile image
// orientation) and size validation, to prevent
// large files from being added
FilePond.create(document.querySelector(".filepond"));
FilePond.create(document.querySelector(".fileponds"));

FilePond.registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginImageExifOrientation,
  FilePondPluginFileValidateSize,
  FilePondPluginImageEdit
);

FilePond.setOptions({
  allowImagePreview: true, // Enable image previews
  allowMultiple: true, // Allow multiple files
  maxFileSize: "3MB", // Set maximum file size
  acceptedFileTypes: ["image/*"], // Only accept images
});

// Select the file input and use
// create() to turn it into a pond

// How to use with Pintura Image Editor:
// https://pqina.nl/pintura/docs/latest/getting-started/installation/filepond/
