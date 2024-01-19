import { Upload } from '@/components/upload';
import { getXataClient } from '@/utils/xata';

const xata = getXataClient();

const createImage = async (mediaType: string) => {
  'use server';

  // Create an empty image record with no base64 content
  const record = await xata.db.images.create(
    { image: { mediaType, base64Content: '' } },
    // Request an uploadUrl from the created record. We can use it to upload a file to replace the empty one
    ['*', 'image.uploadUrl']
  );

  return { id: record.id, uploadUrl: record.image?.uploadUrl };
};

const deleteImage = async (id: string) => {
  'use server';
  await xata.db.images.delete(id);
};

export default async function Home() {
  const images = await xata.db.images.getMany();

  return (
    <Upload
      images={images.toSerializable()}
      createImage={createImage}
      deleteImage={deleteImage}
    />
  );
}
