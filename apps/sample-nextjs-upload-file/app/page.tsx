import { Upload } from '@/components/upload';
import { ImagesRecord, getXataClient } from '../utils/xata';

export default async function Home() {
  const xata = getXataClient();
  const images = await xata.db.images.getMany();
  const serializedImages = images.toSerializable();
  return <Upload images={serializedImages} />;
}
