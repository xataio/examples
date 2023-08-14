import { Icon, IconProps } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { MotionBox } from '~/components/motion/motion';

type XataLogoIconLogoProps = IconProps & {
  color?: 'brand' | 'ink' | 'ghost' | 'currentColor';
  hasAnimation?: boolean;
  /**
   * @default xataLogo
   * Unique ID in case multiple logos are rendered on the same page and uses the `brand` color
   */
  id?: string;
};

export const XataLogoIcon: React.FC<XataLogoIconLogoProps> = ({
  css,
  color = 'currentColor',
  hasAnimation = false,
  id = 'xataLogo',
  ...props
}) => {
  let bottomRight;
  let bottomLeft;
  let topLeft;
  let topRight;

  const ink = 'rgba(0, 0, 0, 0.8)';
  const ghost = 'rgba(255, 255, 255, 0.9)';

  if (color === 'brand') {
    topLeft = `url(#${id}GdTopLeft)`;
    topRight = `url(#${id}GdTopRight)`;
    bottomRight = `url(#${id}GdBottomRight)`;
    bottomLeft = `url(#${id}GdBottomLeft)`;
  } else if (color === 'ink') {
    topLeft = ink;
    topRight = ink;
    bottomRight = ink;
    bottomLeft = ink;
  } else if (color === 'ghost') {
    topLeft = ghost;
    topRight = ghost;
    bottomRight = ghost;
    bottomLeft = ghost;
  } else if (color === 'currentColor') {
    topLeft = 'currentColor';
    topRight = 'currentColor';
    bottomRight = 'currentColor';
    bottomLeft = 'currentColor';
  }

  const topLeftVariantInactive =
    'M0.500006 6.60213C0.502672 8.8784 1.41054 11.0604 3.02388 12.6681L8.74744 18.3712C8.94576 18.5689 9.26796 18.5694 9.45379 18.36C10.8453 16.792 11.6185 14.7641 11.6161 12.6571C11.6134 10.3808 10.7055 8.19885 9.09219 6.59116L3.863 1.38063C3.39169 0.910967 2.6205 0.907598 2.2208 1.43942C1.10825 2.91967 0.497813 4.72971 0.500006 6.60213Z';

  const topLeftVariantActive =
    'M1.50001 6.60213C1.50267 8.8784 2.41054 11.0604 4.02388 12.6681L8.74744 18.3712C8.94576 18.5689 9.26796 18.5694 9.45379 18.36C10.8453 16.792 11.6185 14.7641 11.6161 12.6571C11.6134 10.3808 10.7055 8.19885 9.09219 6.59116L4.863 1.38063C4.39169 0.910967 3.6205 0.907598 3.2208 1.43942C2.10825 2.91967 1.49781 4.72971 1.50001 6.60213Z';

  const topLeftVariants = {
    inactive: {
      d: [topLeftVariantInactive, topLeftVariantInactive, topLeftVariantInactive]
    },
    active: {
      d: [topLeftVariantInactive, topLeftVariantActive, topLeftVariantInactive]
    }
  };

  const topRightVariantInactive =
    'M20.9762 12.6339C22.5896 11.0262 23.4974 8.84422 23.5001 6.56795C23.5023 4.69553 22.8919 2.88549 21.7793 1.40524C21.3796 0.873419 20.6084 0.876787 20.1371 1.34645L14.9081 6.55711C13.2948 8.1648 12.3867 10.3466 12.384 12.6229C12.3816 14.7298 13.1548 16.7578 14.5463 18.3258C14.7321 18.5352 15.0543 18.5346 15.2527 18.337L20.9762 12.6339Z';

  const topRightVariantActive =
    'M19.9762 12.6339C21.5896 11.0262 22.4974 8.84422 22.5001 6.56795C22.5023 4.69553 21.8919 2.88549 20.7793 1.40524C20.3796 0.873419 19.6084 0.876787 19.1371 1.34645L14.9081 6.55711C13.2948 8.1648 12.3867 10.3466 12.384 12.6229C12.3816 14.7298 13.1548 16.7578 14.5463 18.3258C14.7321 18.5352 15.0543 18.5346 15.2527 18.337L19.9762 12.6339Z';

  const topRightVariants = {
    inactive: {
      d: [topRightVariantInactive, topRightVariantInactive, topRightVariantInactive]
    },
    active: {
      d: [topRightVariantInactive, topRightVariantActive, topRightVariantInactive]
    }
  };

  const bottomRightVariantInactive =
    'M19.1009 22.914C19.5712 23.3849 20.3403 23.3894 20.7607 22.8736C21.9251 21.4455 22.7 19.7984 22.9533 18.1782C23.2301 16.408 22.864 14.8001 21.9329 13.6368C21.758 13.4182 21.4346 13.4193 21.2363 13.617L15.8719 18.9625C15.6732 19.1605 15.6729 19.482 15.871 19.6804L19.1009 22.914Z';

  const bottomRightVariantActive =
    'M18.1009 22.914C18.5712 23.3849 19.3403 23.3894 19.7607 22.8736C20.9251 21.4455 21.7 19.7984 21.9533 18.1782C22.2301 16.408 21.864 14.8001 20.9329 13.6368C20.758 13.4182 20.4346 13.4193 20.2363 13.617L15.8719 18.9625C15.6732 19.1605 15.6729 19.482 15.871 19.6804L18.1009 22.914Z';

  const bottomRightVariants = {
    inactive: {
      d: [bottomRightVariantInactive, bottomRightVariantInactive, bottomRightVariantInactive]
    },
    active: {
      d: [bottomRightVariantInactive, bottomRightVariantActive, bottomRightVariantInactive]
    }
  };

  const bottomLeftVariantInactive =
    'M3.23951 22.9088C3.65998 23.4245 4.42907 23.42 4.89936 22.9492L8.12918 19.7156C8.32737 19.5172 8.32699 19.1956 8.12834 18.9977L2.76398 13.6521C2.56566 13.4545 2.24224 13.4533 2.0673 13.6719C1.13627 14.8353 0.770182 16.4432 1.04694 18.2133C1.30027 19.8336 2.07513 21.4807 3.23951 22.9088Z';

  const bottomLeftVariantActive =
    'M4.23951 22.9088C4.65998 23.4245 5.42907 23.42 5.89936 22.9492L8.12918 19.7156C8.32737 19.5172 8.32699 19.1956 8.12834 18.9977L3.76398 13.6521C3.56566 13.4545 3.24224 13.4533 3.0673 13.6719C2.13627 14.8353 1.77018 16.4432 2.04694 18.2133C2.30027 19.8336 3.07513 21.4807 4.23951 22.9088Z';

  const bottomLeftVariants = {
    inactive: {
      d: [bottomLeftVariantInactive, bottomLeftVariantInactive, bottomLeftVariantInactive]
    },
    active: {
      d: [bottomLeftVariantInactive, bottomLeftVariantActive, bottomLeftVariantInactive]
    }
  };

  const transition = {
    repeat: Infinity,
    ease: 'backIn',
    duration: 0.7
  };

  const groupVariant = {
    inactive: {
      rotate: '0',
      scale: 1
    },
    active: {
      rotate: [0, 6],
      scale: 1.1
    }
  };

  const [currentAnimation, setCurrentAnimation] = useState('inactive');

  const onHoverStart = () => {
    setCurrentAnimation('active');
  };

  const onHoverEnd = () => {
    setCurrentAnimation('inactive');
  };

  return (
    <>
      {hasAnimation ? (
        <MotionBox
          initial="inactive"
          // using onHoverStart and onHoverEnd to avoid triggering animation when tappping on mobile
          onHoverStart={onHoverStart}
          onHoverEnd={onHoverEnd}
          animate={currentAnimation}
          variants={groupVariant}
          width="fit-content"
        >
          <Icon viewBox="0 0 24 24" {...props}>
            <motion.g>
              <motion.path variants={topLeftVariants} transition={{ ...transition }} fill={topLeft} />
              <motion.path variants={topRightVariants} transition={{ ...transition }} fill={topRight} />
              <motion.path variants={bottomRightVariants} transition={{ ...transition }} fill={bottomRight} />
              <motion.path variants={bottomLeftVariants} transition={{ ...transition }} fill={bottomLeft} />
            </motion.g>
            <defs>
              <linearGradient id={`${id}GdTopLeft`} x1="12" x2="12" y1="1" y2="18.701" gradientUnits="userSpaceOnUse">
                <stop stopColor="#9F87FF"></stop>
                <stop offset="1" stopColor="#8566FF"></stop>
              </linearGradient>
              <linearGradient
                id={`${id}GdBottomLeft`}
                x1="12"
                x2="12"
                y1="13.251"
                y2="23.264"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#DE99F6"></stop>
                <stop offset="1" stopColor="#D669FC"></stop>
              </linearGradient>
              <linearGradient id={`${id}GdTopRight`} x1="12" x2="12" y1="1" y2="18.701" gradientUnits="userSpaceOnUse">
                <stop stopColor="#9F87FF"></stop>
                <stop offset="1" stopColor="#8566FF"></stop>
              </linearGradient>
              <linearGradient
                id={`${id}GdBottomRight`}
                x1="12"
                x2="12"
                y1="13.251"
                y2="23.264"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#DE99F6"></stop>
                <stop offset="1" stopColor="#D669FC"></stop>
              </linearGradient>
            </defs>
          </Icon>
        </MotionBox>
      ) : (
        <Icon viewBox="0 0 24 24" {...props}>
          <g>
            <path fill={topLeft} d={topLeftVariantInactive} />
            <path fill={topRight} d={topRightVariantInactive} />
            <path fill={bottomRight} d={bottomRightVariantInactive} />
            <path fill={bottomLeft} d={bottomLeftVariantInactive} />
          </g>
          <defs>
            <linearGradient id={`${id}GdTopLeft`} x1="12" x2="12" y1="1" y2="18.701" gradientUnits="userSpaceOnUse">
              <stop stopColor="#9F87FF"></stop>
              <stop offset="1" stopColor="#8566FF"></stop>
            </linearGradient>
            <linearGradient
              id={`${id}GdBottomLeft`}
              x1="12"
              x2="12"
              y1="13.251"
              y2="23.264"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#DE99F6"></stop>
              <stop offset="1" stopColor="#D669FC"></stop>
            </linearGradient>
            <linearGradient id={`${id}GdTopRight`} x1="12" x2="12" y1="1" y2="18.701" gradientUnits="userSpaceOnUse">
              <stop stopColor="#9F87FF"></stop>
              <stop offset="1" stopColor="#8566FF"></stop>
            </linearGradient>
            <linearGradient
              id={`${id}GdBottomRight`}
              x1="12"
              x2="12"
              y1="13.251"
              y2="23.264"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#DE99F6"></stop>
              <stop offset="1" stopColor="#D669FC"></stop>
            </linearGradient>
          </defs>
        </Icon>
      )}
    </>
  );
};
