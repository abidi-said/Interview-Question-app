import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

import {theme} from '../constants';
import Block from './Block';

export default class Card extends Component {
  render() {
    const {color, style, children, ...props} = this.props;
    const cardStyles = [styles.card, style];

    return (
      <Block color={color || theme.colors.white} style={cardStyles} {...props}>
        {children}
      </Block>
    );
  }
}

export const styles = StyleSheet.create({
  card: {
    borderRadius: theme.sizes.radius,
    paddingHorizontal: theme.sizes.base + 4,
    paddingBottom: theme.sizes.base + 4,

    marginBottom: theme.sizes.base,
  },
});
