/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ColorValue,
} from 'react-native';
import React from 'react';
import {
  bgColor2,
  blackColor,
  blackTextStyle,
  FontFamily,
  redColor,
} from '../../constant/theme';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

type headerType = {
  title: string;
  titleColor?: any;
  iconColor?: ColorValue;
  iconColor2?: ColorValue;
  bgColor?: ColorValue;
  isIconActive?: boolean;
  isDotActive?: boolean;
  onPress: () => void;
  onPressIcon?: () => void;
};

const Header = ({
  title,
  titleColor = blackTextStyle,
  iconColor = blackColor,
  iconColor2 = blackColor,
  bgColor = bgColor2,
  isIconActive = false,
  isDotActive = false,
  onPress,
  onPressIcon,
}: headerType) => {
  return (
    <View style={[styles.header, {backgroundColor: bgColor}]}>
      <View
        style={{
          width: '84%',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPress}
          style={{width: '15%'}}>
          <MaterialIcon
            name={'chevron-left'}
            size={32}
            color={titleColor === blackTextStyle ? blackColor : iconColor}
          />
        </TouchableOpacity>
        <Text
          style={[
            titleColor,
            {fontFamily: FontFamily.poppinsMedium, fontSize: 16},
          ]}
          numberOfLines={1}
          ellipsizeMode="middle">
          {title}
        </Text>
      </View>
      {isIconActive ? (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPressIcon}
          style={{
            width: '15%',
            alignItems: 'flex-end',
          }}>
          <MaterialIcon name={'filter-variant'} size={24} color={iconColor2} />
          {isDotActive ? <View style={styles.dot} /> : <></>}
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    minHeight: 50,
    maxHeight: 100,
    paddingTop: 24,
    paddingHorizontal: 16,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  dot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 8 / 2,
    backgroundColor: redColor,
  },
});
