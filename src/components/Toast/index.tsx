/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import {RootState} from '../../redux/store';
import {
  blackColor,
  blackRGBAColor,
  blackTextStyle,
  blueColor,
  blueRGBAColor,
  greenColor,
  greenRGBAColor,
  redColor,
  redRGBAColor,
  whiteColor,
  yellowColor,
  yellowRGBAColor,
} from '../../constant/theme';
import {setToast} from '../../redux/action/global';
import {shadow} from '../../constant/style';

const Toast = () => {
  const {toastDuration, toastType, toastMessage} = useSelector(
    (state: RootState) => state.globalReducer,
  );
  const position = useSharedValue(0);
  const opacity = useSharedValue(0);

  const dispatch = useDispatch();

  useEffect(() => {
    position.value = withSpring(20);
    opacity.value = withSpring(1);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      position.value = withSpring(0);
      opacity.value = withSpring(0);
      dispatch(
        setToast({
          toastVisible: false,
          toastType: '',
          toastMessage: '',
          toastDuration: null,
        }),
      );
    }, toastDuration);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      top: position.value,
      opacity: opacity.value,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[animatedStyle, styles.toastContainer, shadow]}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[
            toastType === 'success'
              ? (greenRGBAColor as string)
              : toastType === 'warning'
              ? (yellowRGBAColor as string)
              : toastType === 'danger'
              ? (redRGBAColor as string)
              : toastType === 'info'
              ? (blueRGBAColor as string)
              : (blackRGBAColor as string),
            whiteColor as string,
          ]}
          style={styles.toastContent}>
          <View style={{width: '10%'}}>
            <MaterialIcon
              name={
                toastType === 'success'
                  ? 'check-circle'
                  : toastType === 'warning'
                  ? 'alert-circle'
                  : toastType === 'danger'
                  ? 'alert'
                  : toastType === 'info'
                  ? 'information'
                  : 'information'
              }
              size={24}
              color={
                toastType === 'success'
                  ? greenColor
                  : toastType === 'warning'
                  ? yellowColor
                  : toastType === 'danger'
                  ? redColor
                  : toastType === 'info'
                  ? blueColor
                  : blackColor
              }
            />
          </View>
          <View style={{width: '85%'}}>
            <Text
              style={[blackTextStyle, {fontSize: 11}]}
              numberOfLines={3}
              ellipsizeMode={'tail'}>
              {toastMessage}
            </Text>
          </View>
        </LinearGradient>
      </Animated.View>
    </View>
  );
};

export default Toast;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    left: 0,
    width: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    zIndex: 99,
  },
  toastContainer: {
    backgroundColor: whiteColor,
    borderRadius: 10,
    width: '90%',
  },
  toastContent: {
    width: '100%',
    borderRadius: 10,
    height: '100%',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
