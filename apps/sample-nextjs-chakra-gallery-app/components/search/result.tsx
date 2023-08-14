import { Badge, Box, Flex, Icon, LinkBox, LinkOverlay, Text, VStack } from '@chakra-ui/react';
import { ChevronRight16Filled } from '@fluentui/react-icons';
import NextLink from 'next/link';
import { FC } from 'react';

export interface SearchResultProps {
  result: any;
  onClick: () => void;
  isFocused: boolean;
}

export const SearchResult: FC<SearchResultProps> = ({ result, onClick, isFocused }) => {
  let resultTitle;
  if (result.record.xata.highlight.title !== undefined) {
    resultTitle = <span dangerouslySetInnerHTML={{ __html: result.record.xata.highlight.name[0] }} />;
  } else {
    resultTitle = result.record.name;
  }

  const slug = `/${result.table}s/${result.record.id}`;

  const badgeText = result.table;
  const badgeColor = result.table === 'tag' ? 'green' : 'blue';

  return (
    <LinkBox
      key={result.record.id}
      justifyContent="start"
      alignItems="start"
      bg={isFocused ? 'contrastLowest' : 'transparent'}
      _hover={{
        bg: 'contrastLowest'
      }}
      py={2}
      px={2}
      data-id={result.record.id}
      borderLeft="solid 4px"
      borderColor={isFocused ? 'stroke' : 'transparent'}
      borderLeftColor={isFocused ? 'green.600' : 'transparent'}
      role="group"
      position="relative"
      w="full"
    >
      <VStack spacing={0} alignItems="start">
        <Flex alignItems="start" gap={2}>
          <LinkOverlay as={NextLink} onClick={onClick} href={slug}>
            <Flex alignItems="start" gap={1}>
              {isFocused ? (
                <Icon as={ChevronRight16Filled} boxSize={4} color="green.500" mt={1} />
              ) : (
                <Box boxSize={4} />
              )}
              <Box>
                <Flex alignItems="center" gap={4}>
                  <Badge
                    colorScheme={badgeColor}
                    fontSize="xx-small"
                    variant="subtle"
                    mt={0.25}
                    minW={50}
                    textAlign="center"
                  >
                    {badgeText}
                  </Badge>
                  <Text
                    noOfLines={1}
                    sx={{
                      em: {
                        color: 'textSuccess',
                        fontStyle: 'italic',
                        fontWeight: 'bold'
                      }
                    }}
                  >
                    {resultTitle}
                  </Text>
                </Flex>
              </Box>
            </Flex>
          </LinkOverlay>
        </Flex>
      </VStack>
    </LinkBox>
  );
};
