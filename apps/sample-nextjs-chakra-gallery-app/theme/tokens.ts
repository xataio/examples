import defaultTheme from '@chakra-ui/theme';
import chroma from 'chroma-js';
export type SemanticTokenColor = keyof (typeof semanticTokens)['colors'];

// xata seed colors
const primary_purple = '#8566FF';
const yellow_gold = '#F6DF8A';
const apricot_orange = '#EFA764';
const crimson_red = '#DC6161';
const fresh_mint = '#57DC9C';
const soft_orchid = '#F6F4FF';

//  const SEED_COLOR: chroma.Color = chroma.random().set(`hsl.s`, 0.6);
//  Purple

const SEED_COLOR: chroma.Color = chroma(primary_purple);
//const DESATURATE_GRAY_LEVEL = 3;

// Blue
/* const SEED_COLOR: chroma.Color = chroma(`#0084ff`);
const DESATURATE_GRAY_LEVEL = 3.0; */
//  const primary = chroma("#0084ff");

// This sets the mood of the theme. A blue color will result in a blue theme...etc
//  const SEED_COLOR: chroma.Color = chroma(`#7300ff`);
// Moves from light to dark against a curve
const LIGHTNESS_CURVE = [0.95, 0.85, 0.75, 0.65, 0.55, 0.45, 0.35, 0.18, 0.12, 0.08];
// Optional lightness curve for darker blacks
// const GRAY_LIGHTNESS_CURVE = [0.95, 0.85, 0.75, 0.65, 0.55, 0.45, 0.35, 0.25, 0.15, 0.01];

// Moves from slightly desaturated to saturated to desaturated
const SATURATION_CURVE = [0.12, 0.1, 0.08, 0.04, 0, 0, 0.04, 0.08, 0.1, 0.12];

// A higher number will result in less saturated colors

/**
 * Function to shift the hue of any passed chroma value
 *
 * @param color The chroma color to shift from
 * @param amount The amount (out of 360) to shift the hue by
 * @returns Returns a chroma color with the hue shifted by the amount
 */
// eslint-disable-next-line
const shiftHue = (color: chroma.Color, amount: number) => {
  const colorHue = chroma(SEED_COLOR).get(`hsl.h`);
  if (colorHue + amount > 360) {
    return chroma(color).set(`hsl.h`, colorHue + amount - 360);
  }
  return chroma(color).set(`hsl.h`, colorHue + amount);
};

// const primary = chroma(primary_purple);
const teal = chroma(SEED_COLOR.set(`hsl.h`, 180));
const red = chroma(crimson_red);
const orange = chroma(apricot_orange);
const yellow = chroma(yellow_gold);
const green = chroma(fresh_mint);
const blue = chroma(SEED_COLOR.set(`hsl.h`, 196));

// palette generated from https://gka.github.io/palettes/
// input colors: #ffffff, #f6f4ff, #0f0c1b
const grayPalette: string[] = [
  '#fbfaff',
  '#dddce2',
  '#c0bfc6',
  '#a3a2ab',
  '#888690',
  '#6d6c77',
  '#54525e',
  '#3c3a46',
  '#252330',
  '#0f0c1b'
];

// palette generated from https://gka.github.io/palettes/
// input colors: #f0ecff, #8566ff (primary purple), #0f0c1b (midnight plum)
// no bezier interpolation
const purplePallette: string[] = [
  '#f0ecff',
  '#dacaff',
  '#c1a9ff',
  '#a688ff',
  '#8768ff',
  '#6c53cd',
  '#53419c',
  '#3c2f6d',
  '#251f42',
  '#0f0c1b'
];

// palette generated from https://gka.github.io/palettes/
// input colors: #fef6ff, #df9cf7, #0f0c1b (midnight plum)
// no bezier interpolation and no correct lightness
const pinkPalette: string[] = [
  '#fef6ff',
  '#f7e2fd',
  '#f0cefb',
  '#e9bafa',
  '#e2a6f8',
  '#c88cdf',
  '#9a6cae',
  '#6b4c7d',
  '#3d2c4c',
  '#0f0c1b'
];

const generatePalette = (palette: string[]): { [key: string]: string } => {
  const nameScale = [`50`, `100`, `200`, `300`, `400`, `500`, `600`, `700`, `800`, `900`];

  return nameScale.reduce((a, v, index) => {
    const colorInPalette = palette[index];
    return { ...a, [v]: colorInPalette };
  }, {});
};

// Given a color and some shift values, will return a theme pallette of 10 colors
const generateColorSet = (color: chroma.Color, desaturate?: number, curve?: number[]) => {
  const lightnessCurve = curve || LIGHTNESS_CURVE;
  const desaturatedColor = chroma(color).desaturate(desaturate || 0);
  const lightnessGoal = desaturatedColor.get(`hsl.l`);
  const closestLightness = lightnessCurve.reduce((prev, curr) =>
    Math.abs(curr - lightnessGoal) < Math.abs(prev - lightnessGoal) ? curr : prev
  );
  const baseColorIndex = lightnessCurve.findIndex((l) => l === closestLightness);

  const colors = lightnessCurve
    .map((l) => desaturatedColor.set(`hsl.l`, l))
    .map((color) => chroma(color))
    .map((color, i) => {
      const saturationDelta = SATURATION_CURVE[i] - SATURATION_CURVE[baseColorIndex];
      // If there is no hue, there is no need to saturate
      // In Chroma, black and white get NaN for hue
      if (isNaN(color.get('hsl.h'))) {
        return color.set('hsl.h', 0).hex();
      }
      // Otherwise, saturate according to the curve
      return saturationDelta >= 0
        ? color.saturate(saturationDelta).hex()
        : color.desaturate(saturationDelta * -1).hex();
    });
  const nameScale = [`50`, `100`, `200`, `300`, `400`, `500`, `600`, `700`, `800`, `900`];
  // TODO: Figure a better way to assign this type
  const colorObject: ColorSet = nameScale.reduce((a, v, index) => {
    const colorInPalette = colors[index];
    return { ...a, [v]: colorInPalette };
  }, {});

  return colorObject;
};

export const colors = {
  SEED_COLOR: SEED_COLOR.hex(),
  gray: generatePalette(grayPalette),
  teal: generateColorSet(teal),
  red: generateColorSet(red),
  orange: generateColorSet(orange),
  yellow: generateColorSet(yellow),
  green: generateColorSet(green),
  purple: generatePalette(purplePallette),
  blue: generateColorSet(blue),
  pink: generatePalette(pinkPalette),
  // the primary color is the purple palette
  primary: generatePalette(purplePallette),
  // the accent color is the pink palette
  accent: generatePalette(pinkPalette)
};

/**
 * Will adjust a foreground color until it passes WCAG AA contrast ratio (4.5)
 *
 * @param foreground The foreground color to make readable
 * @param background The background color to make readable against
 * @returns Returns an adjusted foreground color as a hex that will have a 4.5 contract rating against the provided background.
 */
const makeReadable = (foreground: chroma.Color, background: chroma.Color) => {
  const contrastRatio = chroma.contrast(foreground, background);
  if (contrastRatio > 4.5) {
    return foreground.hex();
  } else {
    let newForeground = foreground;
    let newContrastRatio = chroma.contrast(newForeground, background);
    while (newContrastRatio < 4.5) {
      if (background.luminance() > 0.5) {
        newForeground = chroma(newForeground).darken(0.05);
      } else {
        newForeground = chroma(newForeground).brighten(0.05);
      }
      newContrastRatio = chroma.contrast(newForeground, background);
    }
    return newForeground.hex();
  }
};

type ColorSet = {
  [index: string]: string;
};

/**
 * Color function to make some readable text based upon the background color
 *
 * @param color The foreground color to make readable
 * @param mode The theme you are targeting (light or dark)
 * @returns Returns an adjusted foreground color as a hex that will have a 4.5 contract rating against the provided background.
 */
const quickReadableText = (color: chroma.Color, mode: `light` | `dark`) => {
  return makeReadable(color, chroma(mode === `dark` ? colors.gray[`700`] : colors.gray[`50`]));
};

// Contrast scale is what we use to define our tint/shade scale
// A separate object is needed so we can reference it within the semanticTokens
const contrastScale = {
  empty: { light: 'white', dark: 'gray.900' },
  lowest: {
    light: chroma(colors.gray['50']).darken(0.1).hex(),
    dark: chroma(colors.gray['900']).brighten(0.3).hex()
  },
  low: {
    light: chroma(colors.gray['50']).darken(0.5).hex(),
    dark: chroma(colors.gray['800']).brighten(0.3).hex()
  },
  medium: { light: 'gray.300', dark: 'gray.500' },
  high: { light: 'gray.600', dark: 'gray.300' },
  highest: { light: 'gray.800', dark: 'gray.200' },
  full: { light: 'gray.800', dark: 'gray.100' }
};

type Token = {
  name: string;
  values: {
    _light: string;
    _dark: string;
    description?: string;
  };
};

const generateColorArrayFromObject = (obj: Token) => {
  const array = Object.keys(obj).map((key) => {
    const color = obj[key as keyof Token]; // Assert the key as keyof Token

    if (typeof color === 'string') {
      // Handle the case when color is a string
      return {
        name: key,
        values: {
          light: color,
          dark: color,
          description: '' // Provide a default description value
        }
      };
    } else {
      return {
        name: key,
        values: {
          light: color._light,
          dark: color._dark,
          description: color.description
        }
      };
    }
  });

  return array;
};

const generateColorsObjNoDesc = (
  brandColorsObj: Record<string, { _light: string; _dark: string; description: string }>
): Record<string, { _light: string; _dark: string }> => {
  return Object.keys(brandColorsObj).reduce((acc, key) => {
    const { description, ...rest } = brandColorsObj[key];
    return { ...acc, [key]: rest };
  }, {});
};

const brandColorsObj: any = {
  primary: { _light: `purple.500`, _dark: `purple.300`, description: `Primary brand color` },
  accent: { _light: `pink.500`, _dark: `pink.300`, description: `Accent brand color` },
  success: { _light: `green.500`, _dark: `green.300`, description: `Success state` },
  danger: { _light: `red.500`, _dark: `red.300`, description: `Danger state` },
  warning: { _light: `yellow.500`, _dark: `yellow.300`, description: `Warning state` },
  info: { _light: `blue.500`, _dark: `blue.300`, description: `Info state` },
  ghost: { _light: `white`, _dark: `white` },
  ink: { _light: `gray.900`, _dark: `gray.900` }
};

const brandColorsObjNoDesc = generateColorsObjNoDesc(brandColorsObj);
export const brandColors = generateColorArrayFromObject(brandColorsObj);

const contrastColorsObj: any = {
  contrastEmpty: {
    _light: contrastScale.empty.light,
    _dark: contrastScale.empty.dark
  },
  contrastLowest: {
    _light: contrastScale.lowest.light,
    _dark: contrastScale.lowest.dark
  },
  contrastLow: {
    _light: contrastScale.low.light,
    _dark: contrastScale.low.dark
  },
  contrastMedium: {
    _light: contrastScale.medium.light,
    _dark: contrastScale.medium.dark
  },
  contrastHigh: {
    _light: contrastScale.high.light,
    _dark: contrastScale.high.dark
  },
  contrastHighest: {
    _light: contrastScale.highest.light,
    _dark: contrastScale.highest.dark
  },
  contrastFull: {
    _light: contrastScale.full.light,
    _dark: contrastScale.full.dark
  }
};

export const contrastColors = generateColorArrayFromObject(contrastColorsObj);

const textColorsObj: any = {
  text: { _light: 'gray.800', _dark: 'gray.50' },
  textSubtle: {
    _light: quickReadableText(chroma('#595073'), `light`),
    _dark: quickReadableText(chroma('#F1D7FF'), `dark`)
  },
  textPlaceholder: { _light: 'gray.500', _dark: 'gray.500' },
  title: { _light: `gray.900`, _dark: `white` },
  textInvert: { _light: 'white', _dark: 'gray.700' },
  textPrimary: {
    _light: quickReadableText(chroma(colors.primary[500]), `light`),
    _dark: quickReadableText(chroma(colors.primary[300]), `dark`)
  },
  textAccent: {
    _light: quickReadableText(chroma(colors.accent[400]), `light`),
    _dark: quickReadableText(chroma(colors.accent[500]), `dark`)
  },
  textWarning: {
    _light: quickReadableText(chroma(colors.orange[400]), `light`),
    _dark: quickReadableText(chroma(colors.orange[500]), `dark`)
  },
  textSuccess: {
    _light: quickReadableText(chroma(colors.green[400]), `light`),
    _dark: quickReadableText(chroma(colors.green[500]), `dark`)
  },
  textDanger: {
    _light: quickReadableText(chroma(colors.red[400]), `light`),
    _dark: quickReadableText(chroma(colors.red[500]), `dark`)
  },
  textInfo: {
    _light: quickReadableText(chroma(colors.blue[400]), `light`),
    _dark: quickReadableText(chroma(colors.blue[500]), `dark`)
  }
};

export const textColors = generateColorArrayFromObject(textColorsObj);

const bgColorsObj: any = {
  bg: { _light: '#FDFDFF', _dark: 'gray.900' },
  bgAlternate: { _light: soft_orchid, _dark: chroma(colors.gray[900]).brighten(0.2).hex() },
  bgPrimary: { _light: 'purple.500', _dark: 'purple.200' },
  bgDanger: {
    _light: 'red.50',
    _dark: 'red.700'
  },
  bgWarning: { _light: 'orange.50', _dark: 'orange.700' },
  bgSuccess: { _light: 'green.50', _dark: 'green.700' },
  bgInfo: { _light: 'blue.50', _dark: 'blue.700' },
  bgInvert: { _light: 'gray.800', _dark: 'white' },
  bgHighlight: {
    _light: contrastScale.lowest.light,
    _dark: contrastScale.lowest.dark
  }
};

export const bgColors = generateColorArrayFromObject(bgColorsObj);

export const semanticTokens = {
  colors: {
    seed: { _light: SEED_COLOR.hex(), _dark: SEED_COLOR.hex() },

    ...brandColorsObjNoDesc,
    ...contrastColorsObj,
    ...textColorsObj,
    ...bgColorsObj,
    stroke: {
      _light: contrastScale.low.light,
      // _dark: chroma(contrastScale.lowest.dark).brighten(0.3).hex()
      _dark: contrastScale.low.dark
    },
    dialogBg: { _light: contrastScale.lowest.light, _dark: contrastScale.lowest.dark },
    dialogBorder: {
      _light: contrastScale.lowest.light,
      // _dark: chroma(contrastScale.lowest.dark).brighten(0.5).hex()
      _dark: contrastScale.low.dark
    },
    // Tokens acording to the Figma designs that can be found here https://www.figma.com/file/RQlFwhHSMdbdVMZC4WtmKa/UI-Library?node-id=73%3A3025
    inputBg: {
      _light: 'white',
      _dark: colors.gray[900]
    },
    inputBorder: { _light: 'gray.200', _dark: 'gray.700' },
    codeTitleBg: {
      _light: 'gray.50',
      _dark: chroma(colors.gray[800]).brighten(0.1).hex()
    },
    codeHeaderBg: {
      _light: '#4E466F',
      _dark: '#4E466F'
    },
    codeBg: {
      _light: '#1B1532',
      _dark: '#1B1532'
    }
  }
};

// breakpoints
export const breakpoints = {
  xs: '23em', // 375px
  sm: '30em', // 480px
  md: '48em', // 768px
  lg: '62em', // 992px
  xl: '80em', // 1280px
  '2xl': '96em', // 1536px
  '3xl': '120em' // 1920px
};

export const borderRadius = {
  radii: {
    none: '0',
    sm: '0',
    base: '0',
    md: '0',
    lg: '0',
    xl: '0',
    '2xl': '0',
    '3xl': '0',
    full: '0'
  }
};

export const shadows = {
  ...defaultTheme.shadows,
  outline: `0 0 0 8px rgba(255, 255, 255, 0.02),0 0 1px var(--chakra-colors-gray-500)`,
  under: `rgba(0, 0, 0, 0.25) 0px 24px 20px -20px`,
  shine: `0px 4px 100px 50px rgba(201, 163, 251, 0.3)`
};

export const fonts = {
  heading:
    'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  body: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  mono: 'JetBrainsMono, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
};

// Occassionally we need to get the raw hex value of a token. Charkra's useToken hook will
// return the css var(), but not the raw value.
export const getComputedTokenValues = (variables: string[]) => {
  const style = getComputedStyle(document.documentElement);
  const computedValues: string[] = [];
  variables.map((item) => {
    const cssValue = style.getPropertyValue(item).trim(); // sometimes this needs trimming
    computedValues.push(cssValue);
  });
  return computedValues;
};
