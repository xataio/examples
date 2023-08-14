import { Images, TagWithCount } from '~/components/images';
import { getXataClient } from '~/utils/xata';

export default async function Page({ searchParams }: { searchParams: { p: string } }) {
  const xata = getXataClient();
  const pageNumber = parseInt(searchParams.p, 10) || 1;
  const numOfImagePerPage = 8;

  const paginatedRecords = await xata.db.image
    .select(['name', 'image.base64Content', 'image.name', 'image.url', 'image.attributes'])
    .getPaginated({
      pagination: { size: numOfImagePerPage, offset: numOfImagePerPage * pageNumber - numOfImagePerPage }
    });

  const totalNumberOfImages = await xata.db.image.aggregate({
    totalCount: { count: '*' }
  });

  const totalNumberOfPages = Math.ceil(totalNumberOfImages.aggs.totalCount / numOfImagePerPage);

  const page = {
    pageNumber,
    hasNextPage: paginatedRecords.hasNextPage(),
    hasPrevousPage: pageNumber > 1,
    totalNumberOfPages
  };

  const topTags = await xata.db['tag-to-image'].summarize({
    columns: ['tag'],
    summaries: {
      totalImages: { count: '*' }
    },
    sort: [
      {
        totalImages: 'desc'
      }
    ]
  });

  const transformedRecords = paginatedRecords.records.map((record) => {
    const { url: transformedUrl } = record.image?.transform({
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

    return { ...record, thumb };
  });

  const tagsWithTotalImages = topTags.summaries.map((tagSummary) => ({
    ...tagSummary.tag,
    totalImages: tagSummary.totalImages
  })) as TagWithCount[];

  return <Images images={transformedRecords} tags={tagsWithTotalImages} page={page} />;
}
