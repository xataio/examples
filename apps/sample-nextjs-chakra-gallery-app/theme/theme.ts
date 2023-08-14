import { ComponentStyleConfig, theme as chakraTheme, extendTheme } from '@chakra-ui/react';
import { GlobalStyleProps, StyleFunctionProps } from '@chakra-ui/theme-tools';

import { breakpoints, colors, fonts, semanticTokens, shadows } from './tokens';

const inputStyles = (props: GlobalStyleProps) => ({
  borderRadius: 'base',
  bg: 'inputBg',
  borderColor: 'inputBorder',
  _placeholder: {
    color: props.colorMode === 'light' ? `gray.400` : `contrastMedium`
  },
  _focusVisible: {
    outline: 'none',
    boxShadow: `inset var(--chakra-colors-text) 0 0 0 0.07rem !important`,
    borderColor: 'text'
  },
  _hover: {
    borderColor: 'contrastMedium'
  },
  _disabled: {
    color: 'textSubtle',
    bg: 'contrastLow',
    borderColor: 'stroke',
    opacity: 1
  }
});

export type Statuses = 'info' | 'active' | 'attention' | 'warning' | 'default' | 'danger' | 'success';

const Link: ComponentStyleConfig = {
  baseStyle: {
    color: 'textPrimary',
    _hover: {
      textDecoration: `underline`
    }
  }
};

const variantSubdued = (props: StyleFunctionProps) => {
  const { colorScheme: c } = props;
  return {
    color: 'text',
    background: props.colorMode === 'light' ? `${c}.50` : `${c}.800`,
    _hover: {
      background: props.colorMode === 'light' ? `${c}.100` : `${c}.700`
    }
  };
};

const variantHeadingGradient = (props: StyleFunctionProps) => {
  const isDarkMode = props.colorMode === 'dark';
  const gradient = isDarkMode
    ? 'linear-gradient(87.55deg, var(--chakra-colors-gray-50) 33.91%, var(--chakra-colors-pink-50) 65.85%)'
    : 'linear-gradient(87.55deg, var(--chakra-colors-gray-800) 33.91%, var(--chakra-colors-purple-700) 65.85%)';

  return {
    textShadow: 'lg',
    // prevent text from getting cut off
    paddingBlock: 2,
    '@supports (background-clip: text) or (-webkit-background-clip: text)': {
      background: gradient,
      color: 'transparent',
      backgroundClip: 'text'
    }
  };
};

// eslint-disable-next-line import/no-default-export
export default extendTheme({
  config: {
    // System sets initial value.
    initialColorMode: 'system',
    // App color mode is detached from system color mode changes.
    useSystemColorMode: false
  },
  styles: {
    global: {
      // This fixes a bug where Stripe's 3DS prompt was broken on darkmode.
      'iframe[src*="stripe.com"]': {
        colorScheme: 'light'
      },
      body: {
        bg: 'bg',
        // default outline style
        '*:focus-visible': {
          outlineWidth: '2px',
          outlineStyle: 'solid',
          outlineColor: 'text',
          boxShadow: 'none !important'
        },
        // main navbar outline should always be a white border for increased visiblity against the various navbar background colors
        '#main-navbar *:focus-visible': {
          outlineColor: 'white'
        },
        // A selector with more specificity to override the behavior of the above selector.
        '#main-navbar .default-outline *:focus-visible': {
          outlineColor: 'text'
        },
        // Bad hack till we move to MDX
        '.docs-card-group': {
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 8,
          mb: 8,
          minH: 36,
          gridAutoRows: '1fr',
          '.chakra-link': {
            flexGrow: 1,
            display: 'block',
            bg: 'contrastLowest',
            border: 'solid 1px',
            borderColor: 'stroke',
            borderRadius: 'md',
            padding: 4,
            textDecoration: 'none',
            ':hover': {
              bg: 'contrastLow',
              span: {
                textDecoration: 'underline'
              }
            },
            span: {
              fontWeight: 'bold'
            },
            p: {
              color: 'textSubtle'
            }
          }
        }
      }
    }
  },
  colors,
  fonts,
  //  ...borderRadius,
  shadows,
  semanticTokens,
  breakpoints,
  components: {
    Link,
    Input: {
      defaultProps: {
        ...chakraTheme.components.Input.defaultProps,
        size: 'sm'
      },
      variants: {
        outline: (props: GlobalStyleProps) => ({
          field: inputStyles(props)
        })
      }
    },
    NumberInput: {
      defaultProps: {
        ...chakraTheme.components.Input.defaultProps,
        size: 'sm'
      },
      variants: {
        outline: (props: GlobalStyleProps) => ({
          field: inputStyles(props)
        })
      }
    },
    Textarea: {
      defaultProps: {
        ...chakraTheme.components.Textarea.defaultProps,
        size: 'sm'
      },
      variants: {
        outline: (props: GlobalStyleProps) => inputStyles(props)
      }
    },
    FormLabel: {
      baseStyle: {
        color: 'textSubtle',
        fontSize: '12px',
        fontWeight: 700
      }
    },
    Select: {
      defaultProps: {
        ...chakraTheme.components.Select.defaultProps,
        size: 'sm'
      },
      variants: {
        outline: (props: GlobalStyleProps) => ({
          field: inputStyles(props)
        })
      }
    },
    Popover: {
      baseStyle: {
        header: {
          fontSize: 'lg',
          fontWeight: 600,
          border: 'none'
        },
        content: {
          padding: '6px',
          backgroundColor: 'dialogBg',
          borderColor: 'dialogBorder',
          boxShadow: 'lg',
          _focus: {
            boxShadow: 'lg'
          },
          _active: {
            boxShadow: 'lg'
          }
        },
        body: {
          fontWeight: 400,
          fontSize: 'sm'
        },
        footer: {
          borderTopWidth: 0,
          px: 3,
          py: 3
        }
      }
    },
    Menu: {
      baseStyle: {
        list: {
          bg: 'dialogBg',
          borderColor: 'dialogBorder',
          boxShadow: '2xl',
          zIndex: 100,
          minWidth: '180px'
        },
        item: {
          fontSize: 'sm',
          bg: 'dialogBg',
          _hover: {
            bg: 'contrastLow'
          },
          _focus: {
            bg: 'transparent'
          },
          '.chakra-menu__icon-wrapper': {
            display: 'flex',
            alignItems: 'center'
          }
        }
      }
    },
    Button: {
      baseStyle: {
        lineHeight: 'unset',
        fontWeight: 500
      },
      defaultProps: {
        ...chakraTheme.components.Button.defaultProps,
        size: 'sm'
      },
      variants: {
        subdued: variantSubdued
      }
    },
    Checkbox: {
      baseStyle: (props: GlobalStyleProps) => {
        return {
          ...chakraTheme.components.Checkbox.baseStyle?.(props),
          control: {
            borderWidth: '2px',
            borderColor: 'inputBorder',
            _indeterminate: {
              bg: 'contrastFull',
              borderColor: 'contrastFull',
              _hover: {
                bg: 'text',
                borderColor: 'text'
              }
            },
            _checked: {
              bg: 'contrastFull',
              borderColor: 'contrastFull',
              _hover: {
                bg: 'contrastFull',
                borderColor: 'contrastFull'
              }
            },
            _hover: {
              borderColor: 'text'
            },
            _focusVisible: {
              outline: 'none',
              boxShadow: `inset var(--chakra-colors-text) 0 0 0 0.07rem !important`,
              borderColor: 'text'
            }
          }
        };
      }
    },
    Modal: {
      baseStyle: {
        dialog: {
          marginTop: '120px',
          bg: 'bg'
        },
        header: {
          fontSize: 'xl',
          fontWeight: 600
        },
        body: {
          fontSize: 'md'
        }
      }
    },
    Tabs: {
      variants: {
        minimal: {
          tab: {
            fontSize: 'sm',
            fontWeight: 400,
            borderRadius: 'md',
            bg: 'whiteAlpha.100',
            px: 2,
            py: 0.25,
            border: 'solid 1px',
            borderColor: 'whiteAlpha.200',
            _selected: {
              bg: 'whiteAlpha.400'
            },
            _hover: {
              bg: 'whiteAlpha.300'
            }
          },
          tablist: {
            border: 'none',
            gap: 2
          },
          tabpanel: {
            px: 0
          }
        },
        line: {
          tab: {
            fontWeight: 600,
            fontSize: '15px',
            color: 'textSubtle',
            paddingLeft: 0,
            paddingRight: 0,
            marginBottom: { base: '0px', md: '-2px' },
            borderBottom: 'solid 2px',
            borderBottomWidth: '2px',
            flexShrink: 0,
            borderColor: 'transparent',
            _notLast: {
              marginRight: 7
            },
            _hover: {
              color: 'primary'
            },
            _active: {
              color: 'primary',
              bg: 'transparent'
            },
            _selected: {
              color: 'textPrimary',
              borderColor: 'primary',
              _hover: {
                color: 'textPrimary',
                borderColor: 'primary'
              }
            }
          },
          tablist: {
            overflowX: { base: 'scroll', md: 'unset' },
            scrollbarWidth: 'none',
            '::-webkit-scrollbar': {
              display: 'none'
            },
            borderBottom: 'solid 1px',
            borderBottomWidth: '1px',
            paddingBottom: '-1px',
            borderColor: 'stroke'
          }
        }
      }
    },
    Drawer: {
      baseStyle: {
        dialog: {
          bg: 'bg'
        }
      },
      sizes: {
        // This hack adds a custom size drawer for the code drawer.
        codeDrawer: {
          dialog: {
            maxW: '800px'
          }
        }
      }
    },
    Table: {
      baseStyle: {
        th: {
          textTransform: 'none',
          letterSpacing: 'normal',
          fontWeight: 'semibold'
        }
      },
      sizes: {
        sm: {
          th: {
            px: 2,
            fontSize: 'sm',
            py: 2
          },
          td: {
            px: 2,
            py: 1.5
          }
        },
        xs: {
          th: {
            px: 1.5,
            py: 1
          },
          td: {
            px: 1.5,
            py: 1
          }
        }
      },
      variants: {
        bordered: {
          thead: {
            th: {
              border: 'solid 1px',
              borderColor: 'stroke'
            }
          },
          tbody: {
            tr: {
              td: {
                border: 'solid 1px',
                borderColor: 'stroke'
              }
            }
          }
        },
        striped: {
          thead: {
            th: {
              borderColor: 'transparent'
            }
          },
          tbody: {
            tr: {
              '&:nth-of-type(even)': {
                'th, td': {
                  borderColor: 'transparent'
                }
              },
              '&:nth-of-type(odd)': {
                'th, td': {
                  borderColor: 'transparent'
                },
                td: {
                  background: 'contrastLowest'
                }
              }
            }
          }
        }
      }
    },
    Heading: {
      variants: {
        gradient: variantHeadingGradient
      }
    }
  }
});
