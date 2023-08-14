'use client';
import { Link } from '@chakra-ui/next-js';
import { Box, Button, Flex, FormControl, FormLabel, Heading, Tag, Text, useToast } from '@chakra-ui/react';
import NextImage from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { ImageRecord, TagRecord } from '~/utils/xata';
import { BaseLayout } from '../layout/base';
import { Search } from '../search';
import { ImageUpload } from './upload';

interface ImageProps {
  image: ImageRecord;
  tags: TagRecord[];
}

export const Image: FC<ImageProps> = ({ image, tags }) => {
  const router = useRouter();
  const toast = useToast();
  const handleDelete = async () => {
    await fetch(`/api/delete?id=${image.id}`);
    router.push('/');
    toast({
      title: 'Image deleted',
      description: `Image ${image.name} has been deleted`,
      status: 'success',
      duration: 3000,
      isClosable: true
    });
  };

  console.log('image', image);

  return (
    <BaseLayout>
      <Flex alignItems="center" justifyContent="space-between" mb={8} w="full">
        <ImageUpload />
        <Search />
      </Flex>
      <Heading as="h1" size="md" mb={8}>
        {image.name}
      </Heading>
      <Flex mb={8} gap={2} wrap="wrap">
        <Link href="/">&laquo; Back to all images</Link>
      </Flex>
      <Flex alignItems="start" flexGrow={1}>
        <Flex alignItems="center" justifyContent="center" flexDir="column" grow={1}>
          <NextImage
            src={image.image.url}
            width={image.image.attributes.width}
            height={image.image.attributes.height}
            alt={image.name}
            style={{ maxWidth: '80%' }}
          />
        </Flex>
        <Flex flexDir="column" gap={6} maxW={300} bg="contrastLowest" p={8} borderRadius="md">
          <FormControl>
            <FormLabel>Image name</FormLabel>
            <Text fontSize="sm">{image.name}</Text>
          </FormControl>
          <FormControl>
            <FormLabel>Image URL</FormLabel>
            <Text fontSize="sm">{image.image.url}</Text>
          </FormControl>
          <FormControl>
            <FormLabel>Image width</FormLabel>
            <Text fontSize="sm">{image.image.attributes.width}</Text>
          </FormControl>
          <FormControl>
            <FormLabel>Image height</FormLabel>
            <Text fontSize="sm">{image.image.attributes.height}</Text>
          </FormControl>
          {tags.length > 0 && (
            <FormControl>
              <FormLabel>Tagged as</FormLabel>
              <Flex gap={2}>
                {tags?.map((tag) => (
                  <Tag as={NextLink} key={tag.id} href={`/tags/${tag.id}`}>
                    {tag.name}
                  </Tag>
                ))}
              </Flex>
            </FormControl>
          )}
          <Box>
            <Button colorScheme="red" size="sm" onClick={handleDelete}>
              Delete
            </Button>
          </Box>
        </Flex>
      </Flex>
    </BaseLayout>
  );
};
