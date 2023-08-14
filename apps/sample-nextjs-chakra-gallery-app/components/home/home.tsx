'use client';
import { Button, Flex, Heading, SimpleGrid } from '@chakra-ui/react';
import Image from 'next/image';
import { FC } from 'react';
import { ImageRecord } from '~/utils/xata';
import { BaseLayout } from '../layout/base';

type ImageRecordWithThumb = ImageRecord & {
  thumb: {
    url: string;
    attributes: {
      width: number;
      height: number;
    };
  };
};

interface HomeProps {
  images: ImageRecordWithThumb[];
}

export const Home: FC<HomeProps> = ({ images }) => {
  return (
    <BaseLayout>
      <Flex alignItems="center" justifyContent="space-between" mb={8}>
        <Heading as="h1" size="md">
          Images
        </Heading>
        <Button colorScheme="blue" size="sm">
          Add image
        </Button>
      </Flex>
      <SimpleGrid columns={4} spacing={2}>
        {images.map((image) => {
          return (
            <Image
              key={image.name}
              src={image.thumb.url}
              width={image.thumb.attributes.width}
              height={image.thumb.attributes.height}
              alt={image.name}
            />
          );
        })}
      </SimpleGrid>
    </BaseLayout>
  );
};
