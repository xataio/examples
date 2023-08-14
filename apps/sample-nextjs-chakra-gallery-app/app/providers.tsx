'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';
import { Global } from '@emotion/react';
import { GlobalStyle } from '../theme/globalstyles';
import { default as theme } from '../theme/theme';

const customTheme = extendTheme(theme);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={customTheme}>
        <Global styles={GlobalStyle} />
        {children}
      </ChakraProvider>
    </CacheProvider>
  );
}
