'use client';
import { Link } from '@chakra-ui/next-js';
import { Flex, Icon, IconButton, Text, Tooltip, useColorMode } from '@chakra-ui/react';
import { WeatherMoon20Filled, WeatherSunny20Filled } from '@fluentui/react-icons';
import NextLink from 'next/link';
import { FC } from 'react';
import { DiscordIcon } from '../icons/discord';
import { GitHubIcon } from '../icons/github';
import { TwitterIcon } from '../icons/twitter';
import { XataWordMarkIcon } from '../icons/xata_wordmark';

interface BaseLayoutProps {
  children: React.ReactNode;
}

export const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  const { toggleColorMode, colorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  return (
    <Flex flexDir="column" maxW={1200} margin="auto" minH="100vh">
      <Flex justifyContent="space-between" py={8}>
        <NextLink href="/">
          <XataWordMarkIcon />
        </NextLink>
        <Flex gap={4} alignItems="center">
          <Link href="https://xata.io/docs">Docs</Link>
          <Link href="https://github.com/xataio/examples">Examples</Link>
          <Tooltip label={`Change theme to ${isDark ? 'light' : 'dark'}`} openDelay={500}>
            <IconButton
              aria-label="Change theme"
              variant="ghost"
              icon={<Icon as={isDark ? WeatherSunny20Filled : WeatherMoon20Filled} boxSize={5} />}
              onClick={toggleColorMode}
            />
          </Tooltip>
        </Flex>
      </Flex>
      <Flex flexDir="column" flex={1}>
        {children}
      </Flex>
      <Flex as="footer" py={8} gap={3} alignItems="center" justifyContent="space-between">
        <Text color="textSubdued">
          <Link href="https://xata.io">Xata</Link> © {new Date().getFullYear()}
        </Text>

        <Flex alignItems="center" gap={3}>
          <IconButton
            variant="ghost"
            aria-label="Go to xata discord"
            as={Link}
            icon={<GitHubIcon boxSize={5} />}
            href="https://xata.io/discord"
          />
          <IconButton
            variant="ghost"
            aria-label="Go to xata discord"
            as={Link}
            icon={<DiscordIcon boxSize={5} />}
            href="https://xata.io/discord"
          />
          <IconButton
            variant="ghost"
            aria-label="Go to xata discord"
            as={Link}
            icon={<TwitterIcon boxSize={5} />}
            href="https://xata.io/discord"
          />
        </Flex>
      </Flex>
    </Flex>
  );
};
