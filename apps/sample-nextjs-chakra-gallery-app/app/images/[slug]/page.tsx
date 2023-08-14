import { Image } from '~/components/images/individual';
import { ImageRecord, TagRecord, getXataClient } from '~/utils/xata';
const xata = getXataClient();

export async function generateStaticParams() {
  const images: ImageRecord[] = await xata.db.image.getMany();
  return images.map((image) => ({
    slug: image.id
  }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const image = (await xata.db.image.read(params.slug, [
    'name',
    'image.base64Content',
    'image.name',
    'image.url',
    'image.attributes'
  ])) as ImageRecord;

  const { url: transformedUrl } = image.image?.transform({
    width: 294,
    height: 294,
    format: 'auto',
    fit: 'cover',
    gravity: 'top'
  });

  const thumb = {
    url: transformedUrl,
    attributes: { width: 294, height: 294 }
  };

  image.image.thumb = thumb;

  const tagsFromImage = await xata.db['tag-to-image']
    .filter({
      'image.id': params.slug
    })
    .select(['*', 'tag.*'])
    .getMany();

  const tags = tagsFromImage.map((tag) => tag.tag) as TagRecord[];

  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image image={image} tags={tags} />;
}
