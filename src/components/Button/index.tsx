/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  ColorValue,
  Text,
  TouchableHighlight,
} from 'react-native';
import React from 'react';
import {
  contentColor,
  FontFamily,
  greyColor,
  primaryColor,
  whiteColor,
} from '../../constant/theme';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {shadow} from '../../constant/style';

type btnType = {
  borderWidth?: number;
  borderColor?: ColorValue;
  borderRadius?: number;
  bgColor?: ColorValue;
  title?: string;
  titleColor?: ColorValue;
  titleWeight?: string;
  indicatorColor?: ColorValue;
  underlayColor?: ColorValue;
  isShadow?: boolean;
  fontSize?: number;
  height?: number;
  disabled?: boolean;
  onPress?: () => void;
};

const Button = ({
  borderWidth = 0,
  borderColor = primaryColor,
  borderRadius = 20,
  bgColor = primaryColor,
  title,
  titleColor = whiteColor,
  titleWeight = FontFamily.poppinsBold,
  indicatorColor = whiteColor,
  underlayColor = contentColor,
  isShadow = false,
  fontSize = 14,
  height = 50,
  disabled = false,
  onPress,
}: btnType) => {
  const {btnLoading} = useSelector((state: RootState) => state.globalReducer);
  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor={underlayColor}
      disabled={disabled}
      activeOpacity={0.7}
      style={[
        isShadow && shadow,
        {
          width: '100%',
          height: height,
          backgroundColor: !disabled ? bgColor : greyColor,
          borderRadius: borderRadius,
          borderWidth: borderWidth,
          borderColor: borderColor,
          alignItems: 'center',
          justifyContent: 'center',
        },
      ]}>
      {btnLoading ? (
        <ActivityIndicator style={{marginLeft: 6}} color={indicatorColor} />
      ) : (
        <Text
          style={{
            color: titleColor,
            fontFamily: titleWeight,
            fontSize: fontSize,
          }}>
          {title}
        </Text>
      )}
    </TouchableHighlight>
  );
};

export default Button;
