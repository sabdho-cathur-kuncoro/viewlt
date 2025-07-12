/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {Modal, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import LottieView from 'lottie-react-native';
import {
  blackTextStyle,
  FontFamily,
  greyTextStyle,
  whiteColor,
} from '../../constant/theme';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {setPopup} from '../../redux/action/global';
import FocusAwareStatusBar from '../FocusAwareStatusBar';
import Gap from '../Gap';
import {shadow} from '../../constant/style';
import {lottieFiles} from '../../assets';

const Popup = () => {
  const {popupVisible, popupDuration, popupIcon, popupTitle, popupMessage} =
    useSelector((state: RootState) => state.globalReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(
        setPopup({
          popupVisible: false,
          popupIcon: '',
          popupTitle: '',
          popupMessage: '',
          popupDuration: null,
        }),
      );
    }, popupDuration);

    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <>
      <FocusAwareStatusBar
        backgroundColor={'rgba(0,0,0,0.2)'}
        barStyle={'dark-content'}
      />
      <Modal animationType="fade" transparent={true} visible={popupVisible}>
        <View style={styles.modalContainer}>
          <View style={[shadow, styles.modalView]}>
            <LottieView
              source={
                popupIcon === 'success'
                  ? lottieFiles.success
                  : popupIcon === 'danger'
                  ? lottieFiles.failed
                  : popupIcon === 'warning'
                  ? lottieFiles.warning
                  : popupIcon === 'error'
                  ? lottieFiles.errFailed
                  : lottieFiles.success
              }
              autoPlay
              loop
              style={{width: '100%', height: 80}}
            />
            <Gap height={16} />
            <View
              style={{
                width: '100%',
                alignItems: 'center',
              }}>
              <Text
                style={[
                  blackTextStyle,
                  {
                    fontFamily: FontFamily.poppinsBold,
                    fontSize: 16,
                  },
                ]}>
                {popupTitle}
              </Text>
              <Gap height={2} />
              <Text style={[greyTextStyle, {textAlign: 'center'}]}>
                {popupMessage}
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Popup;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  modalView: {
    width: '70%',
    position: 'absolute',
    backgroundColor: whiteColor,
    alignItems: 'center',
    padding: 16,
    borderRadius: 10,
  },
});
