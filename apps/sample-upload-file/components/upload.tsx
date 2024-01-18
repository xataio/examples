'use client';
import { FC, FormEvent, useState } from 'react';

export const Upload: FC = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!file) {
      setMessage('A file is required');
      return;
    }

    // Grab the form data
    const formData = new FormData();
    const fileObj = file as File;
    formData.append('fileType', fileObj.type);

    try {
      // This route creates new image and tag records in Xata
      // If you look at the api route code, you'll see that we're not actually
      // uploading the image here. Instead, we're creating a record in the database
      // with a temporary, empty image. We do this because we need to generate a
      // pre-signed URL for the image upload.
      const response = await fetch('/api/image', {
        method: 'POST',
        body: formData
      });
      if (response.status !== 200) {
        throw new Error("Couldn't create image record");
      }

      const record = await response.json();

      // The response include a pre-signed uploadUrl on the record. Below, we then send a file
      // directly to Xata on the client side using the PUT request. This lets us upload
      // large files that would otherwise exceed the limit for serverless functions on
      // services like Vercel.

      if (response.status === 200) {
        setIsUploading(true);
        try {
          setIsUploading(true);
          await fetch(record.image.uploadUrl, { method: 'PUT', body: file });
          setMessage('Your image was uploaded successfully.');
          setIsUploading(false);
        } catch (error) {
          // Delete the record and associated tag
          await fetch(`/api/image?imageId=${record.id}`, { method: 'DELETE' });
          setMessage("Couldn't upload image");
          setIsUploading(false);
          throw new Error("Couldn't upload image");
        }
      } else {
        setMessage("Couldn't upload image");
        throw new Error("Couldn't upload image");
      }
    } catch (error) {
      setMessage('An error occurred while uploading the image.');
    }
  };

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  return (
    <main>
      <h1>Upload an image</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="file">File</label>
        <input
          id="file"
          type="file"
          name="file"
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
        />
        <p>{message}</p>
        <button type="submit" disabled={isUploading}>
          Upload
        </button>
      </form>
    </main>
  );
};
