import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Platform, View} from 'react-native';
import {theme} from '../constants';

class Button extends Component {
  render() {
    const {
      style,
      opacity,
      gradient,
      outlined,
      color,
      startColor,
      endColor,
      end,
      start,
      locations,
      shadow,
      children,
      ...props
    } = this.props;

    const buttonStyles = [
      styles.button,
      shadow && styles.shadow,
      color && styles[color], // predefined styles colors for backgroundColor
      color && !styles[color] && {backgroundColor: color}, // custom backgroundColor
      style,
    ];
    const buttonStylesOutlined = [
      styles.buttonOutlined,
      shadow && styles.shadow,
      color && styles[color], // predefined styles colors for backgroundColor
      color && !styles[color] && {borderColor: color}, // custom backgroundColor
      style,
    ];

    if (outlined) {
      return (
        <TouchableOpacity
          style={buttonStylesOutlined}
          activeOpacity={opacity || 0.8}
          {...props}>
          {children}
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        style={buttonStyles}
        activeOpacity={opacity || 0.8}
        {...props}>
        {children}
      </TouchableOpacity>
    );
  }
}

Button.defaultProps = {
  startColor: theme.colors.primary,
  endColor: theme.colors.primary,
  start: {x: 0, y: 0},
  end: {x: 1, y: 1},
  locations: [0.1, 0.9],
  opacity: 0.8,
  color: theme.colors.primary,
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    height: theme.sizes.base * 3.5,

    justifyContent: 'center',
    marginVertical: theme.sizes.padding / 4,
  },
  buttonOutlined: {
    borderRadius: 20,
    height: theme.sizes.base * 3.5,

    borderWidth: 2,
    justifyContent: 'center',
    marginVertical: theme.sizes.padding / 4,
  },
  shadow: {
    // backgroundColor: '#ffffff',
    marginBottom: Platform.OS === 'android' ? 0 : 16,

    //iOS stuff
    shadowOffset: {width: 0, height: 2},
    shadowColor: 'rgba(96, 191, 147,0.6)',
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 6,
  },
  accent: {backgroundColor: theme.colors.accent},
  primary: {backgroundColor: theme.colors.primary},
  secondary: {backgroundColor: theme.colors.secondary},
  tertiary: {backgroundColor: theme.colors.tertiary},
  black: {backgroundColor: theme.colors.black},
  white: {backgroundColor: theme.colors.white},
  gray: {backgroundColor: theme.colors.gray},
  gray2: {backgroundColor: theme.colors.gray2},
  gray3: {backgroundColor: theme.colors.gray3},
  gray4: {backgroundColor: theme.colors.gray4},
});
