import { Images } from '~/components/images';
import { TagRecord, getXataClient } from '~/utils/xata';
const xata = getXataClient();

export async function generateStaticParams() {
  const tags: TagRecord[] = await xata.db.tag.getMany();
  return tags.map((tag) => ({
    slug: tag.id
  }));
}

export default async function Page({
  params,
  searchParams
}: {
  params: { slug: string };
  searchParams: { p: string };
}) {
  const pageNumber = parseInt(searchParams.p, 10) || 1;
  const numOfImagePerPage = 8;

  const recordsWithTag = await xata.db['tag-to-image']
    .filter({
      'tag.id': params.slug
    })
    .select(['*', 'image.image.url', 'image.image.attributes', 'image.image.name'])
    .getPaginated({
      pagination: { size: numOfImagePerPage, offset: numOfImagePerPage * pageNumber - numOfImagePerPage }
    });

  const imageRecords = recordsWithTag.records.map((record) => {
    const { url: transformedUrl } = record.image?.image?.transform({
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

    return { ...record.image, thumb };
  });

  const summarizeTag = await xata.db['tag-to-image']
    .filter({
      'tag.id': params.slug
    })
    .summarize({
      columns: ['tag'],
      summaries: {
        totalImages: { count: '*' }
      }
    });

  const totalNumberOfImagesWithTag = summarizeTag.summaries[0].totalImages;

  const tag = await xata.db.tag.read(params.slug);
  const tagWithCount = {
    ...tag,
    totalImages: totalNumberOfImagesWithTag
  };

  const totalNumberOfPages = Math.ceil(totalNumberOfImagesWithTag / numOfImagePerPage);

  const page = {
    pageNumber,
    hasNextPage: recordsWithTag.hasNextPage(),
    hasPrevousPage: pageNumber > 1,
    totalNumberOfPages: totalNumberOfPages
  };

  return <Images images={imageRecords} tags={[tagWithCount]} page={page} />;
}
