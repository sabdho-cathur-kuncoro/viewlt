/* eslint-disable react-native/no-inline-styles */
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import {
  blackRGBAColor,
  blackTextStyle,
  FontFamily,
  primaryTextStyle,
  redTextStyle,
  subTextStyle,
  whiteColor,
} from '../../constant/theme';
import Gap from '../Gap';
import {layout} from '../../constant/style';

type modalConfirmType = {
  visible?: boolean;
  isAlert?: boolean;
  isApprove?: boolean;
  confirmText?: string;
  isSubConfirm?: boolean;
  subConfirmText?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onClose?: () => void;
  onConfirm?: () => void;
  onTapBackground?: () => void;
};

const ModalConfirmation = ({
  visible,
  isAlert = false,
  isApprove = false,
  confirmText,
  isSubConfirm = false,
  subConfirmText,
  value,
  onChangeText,
  onClose,
  onConfirm,
  onTapBackground,
}: modalConfirmType) => {
  const WIDTH = useWindowDimensions().width;
  return (
    <Modal visible={visible} animationType={'fade'} transparent={true}>
      <Pressable style={styles.modalContainer} onPress={onTapBackground}>
        <TouchableWithoutFeedback>
          <View style={[styles.modalContent, {minHeight: WIDTH / 2.5}]}>
            <Gap height={16} />
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={[
                  blackTextStyle,
                  {
                    textAlign: 'center',
                    fontFamily: FontFamily.poppinsMedium,
                  },
                ]}>
                {confirmText}?
              </Text>
              {isSubConfirm && (
                <Text
                  style={[redTextStyle, {fontSize: 10, textAlign: 'center'}]}>
                  {subConfirmText}
                </Text>
              )}
            </View>
            <Gap height={16} />
            {isApprove && (
              <View style={{marginBottom: 24, paddingHorizontal: 8}}>
                <Text style={[blackTextStyle, {fontSize: 12}]}>
                  Remark{' '}
                  <Text style={[subTextStyle, {fontSize: 12}]}>(Optional)</Text>
                </Text>
                <Gap height={4} />
                <TextInput
                  value={value}
                  onChangeText={onChangeText}
                  multiline={true}
                  style={[
                    layout.inputContainer,
                    blackTextStyle,
                    {
                      height: 70,
                      fontSize: 12,
                      textAlignVertical: 'top',
                      paddingTop: 8,
                    },
                  ]}
                />
              </View>
            )}
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginBottom: 8,
              }}>
              <Pressable style={styles.btnContainer} onPress={onClose}>
                <Text
                  style={[
                    subTextStyle,
                    {fontFamily: FontFamily.poppinsMedium},
                  ]}>
                  Cancel
                </Text>
              </Pressable>
              <Pressable style={styles.btnContainer} onPress={onConfirm}>
                <Text
                  style={[
                    isAlert === true ? redTextStyle : primaryTextStyle,
                    {fontFamily: FontFamily.poppinsMedium},
                  ]}>
                  Yes
                </Text>
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Pressable>
    </Modal>
  );
};

export default ModalConfirmation;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: blackRGBAColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    width: '75%',
    justifyContent: 'center',
    backgroundColor: whiteColor,
    borderRadius: 10,
    padding: 8,
  },
  btnContainer: {
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
