import styled from 'styled-components/native';
import {
  color,
  ColorProps,
  space,
  SpaceProps,
  FlexboxProps,
  flex,
  variant,
  VariantArgs,
  compose,
  colorStyle,
  ColorStyleProps,
  system,
} from 'styled-system';

import { theme } from './theme';

interface HPTextProps extends SpaceProps, FlexboxProps, ColorProps {
  // variant?: keyof typeof HPTextVariants;
  fontSize?: keyof typeof theme.fontSizes;
  fontWeight?: keyof typeof theme.fontWeights;
}

export const HPText = styled.Text<HPTextProps>(
  color,
  space,
  system({
    fontWeight: {
      property: 'fontWeight',
      scale: 'fontWeights',
    },
    fontSize: {
      property: 'fontSize',
      scale: 'fontSizes',
    },
  }),
);
