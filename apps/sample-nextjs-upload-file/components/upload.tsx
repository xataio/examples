'use client';

import { ImagesRecord } from '@/utils/xata';
import { JSONData } from '@xata.io/client';
import { FC, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

interface UploadProps {
  images: JSONData<ImagesRecord>[];
  createImage: (
    mediaType: string
  ) => Promise<{ id: string; uploadUrl?: string }>;
  deleteImage: (id: string) => Promise<void>;
}

export const Upload: FC<UploadProps> = ({
  images,
  createImage,
  deleteImage
}) => {
  const router = useRouter();

  const [file, setFile] = useState<File>();
  const [message, setMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!file) {
      setMessage('A file is required');
      return;
    }

    // This route creates new image and tag records in Xata
    // If you look at the api route code, you'll see that we're not actually
    // uploading the image here. Instead, we're creating a record in the database
    // with a temporary, empty image. We do this because we need to generate a
    // pre-signed URL for the image upload.
    const { id, uploadUrl } = await createImage(file.type);
    if (!uploadUrl) {
      throw new Error("Couldn't create image record");
    }

    // The response include a pre-signed uploadUrl on the record. Below, we then send a file
    // directly to Xata on the client side using the PUT request. This lets us upload
    // large files that would otherwise exceed the limit for serverless functions on
    // services like Vercel.
    try {
      setIsUploading(true);
      setMessage('');
      await fetch(uploadUrl, { method: 'PUT', body: file });
    } catch (error) {
      // Delete the record if the upload fails
      await deleteImage(id);
      setMessage("Couldn't upload image");
    } finally {
      setIsUploading(false);
      router.refresh();
    }
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
          accept="image/*"
          onChange={(event) => {
            setFile(event.target.files?.[0]);
          }}
        />
        <p>{message}</p>
        <button type="submit" disabled={isUploading}>
          Upload
        </button>
      </form>

      {images.length > 0 && (
        <>
          <h2>Images</h2>
          <ul>
            {images.map((image) => (
              <li key={image.id} style={{ maxWidth: 200 }}>
                <img
                  src={image.image?.url}
                  width="100%"
                  alt={image.image?.name}
                />
                <button
                  onClick={() => {
                    deleteImage(image.id);
                    router.refresh();
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
};
