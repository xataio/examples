'use client';
import { Link } from '@chakra-ui/next-js';
import { Flex, Heading, Select, SimpleGrid, Tag } from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FC, useState } from 'react';
import { ImageRecord, TagRecord } from '~/utils/xata';
import { BaseLayout } from '../layout/base';
import { Search } from '../search';
import { ImageUpload } from './upload';

export type ImageRecordWithThumb = ImageRecord & {
  thumb: {
    url: string;
    attributes: {
      width: number;
      height: number;
    };
  };
};

export type TagWithCount = TagRecord & {
  totalImages: number;
};

export type Page = {
  pageNumber: number;
  hasNextPage: boolean;
  hasPrevousPage: boolean;
  totalNumberOfPages: number;
};

interface ImagesProps {
  images: ImageRecordWithThumb[];
  tags: TagWithCount[];
  page: Page;
}

export const Images: FC<ImagesProps> = ({ images, tags, page }) => {
  const [selectedPageNumber, setSelectedPageNumber] = useState(page.pageNumber);

  const router = useRouter();
  const handlePageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedPageNumber(parseInt(event.target.value));
    router.push(`?p=${event.target.value}`);
  };

  return (
    <BaseLayout>
      <Flex alignItems="center" justifyContent="space-between" mb={8}>
        <ImageUpload />
        <Search />
      </Flex>
      {tags.length > 1 ? (
        <>
          <Heading as="h1" size="md" mb={8}>
            All images
          </Heading>
          {tags && (
            <Flex mb={8} gap={2} wrap="wrap">
              {tags.map((tag) => (
                <Tag as={NextLink} key={tag.id} href={`/tags/${tag.id}`} gap={2}>
                  {tag.name}
                  <Flex
                    alignItems="center"
                    justifyContent="center"
                    fontSize="xs"
                    bg="contrastLowest"
                    boxSize={4}
                    borderRadius="md"
                    color="contrastMedium"
                  >
                    {tag.totalImages}
                  </Flex>
                </Tag>
              ))}
            </Flex>
          )}
        </>
      ) : (
        <>
          <Heading as="h1" size="md" mb={8}>
            {tags[0].totalImages} images tagged with <Tag>{tags[0].name}</Tag>
          </Heading>
          <Flex mb={8} gap={2} wrap="wrap">
            <Link href="/">&laquo; Back to all images</Link>
          </Flex>
        </>
      )}
      <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={2}>
        {images.map((image) => {
          return (
            <NextLink key={image.id} href={`/images/${image.id}`}>
              <Image
                src={image.thumb.url}
                width={image.thumb.attributes.width}
                height={image.thumb.attributes.height}
                alt={image.name}
              />
            </NextLink>
          );
        })}
      </SimpleGrid>
      {page.totalNumberOfPages > 1 && (
        <Flex justifyContent="center" mt={4}>
          <Flex gap={4} alignItems="center">
            {page.hasPrevousPage && <Link href={`?p=${page.pageNumber - 1}`}>Previous</Link>}
            <Select onChange={handlePageChange} value={selectedPageNumber}>
              {Array.from(Array(page.totalNumberOfPages).keys()).map((pageNumber) => (
                <option key={pageNumber} value={pageNumber + 1}>
                  {pageNumber + 1}
                </option>
              ))}
            </Select>

            {page.hasNextPage && <Link href={`?p=${page.pageNumber + 1}`}>Next</Link>}
          </Flex>
        </Flex>
      )}
    </BaseLayout>
  );
};
