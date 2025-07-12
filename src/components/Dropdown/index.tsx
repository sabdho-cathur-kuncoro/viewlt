/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  Text,
  Modal,
  View,
  useWindowDimensions,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import IcMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  blackTextStyle,
  borderColor,
  FontFamily,
  greySecondaryColor,
} from '../../constant/theme';

const Dropdown = ({
  visible,
  data,
  height = 40,
  borderWidth = 1,
  changeModalVisibility,
  setData,
  label,
  setLabel,
}: any) => {
  const WIDTH = useWindowDimensions().width;
  const HEIGHT = useWindowDimensions().height;

  const onPressItem = (option: any, labelChoose: any) => {
    changeModalVisibility(false);
    setData(option);
    setLabel(labelChoose);
  };

  const option = data?.map((item: any, index: any) => {
    return (
      <TouchableOpacity
        style={styles.option}
        key={index}
        onPress={() => onPressItem(item.value, item.label)}>
        <Text style={[blackTextStyle, styles.text]}>{item.label}</Text>
      </TouchableOpacity>
    );
  });
  return (
    <>
      <Pressable
        onPress={() => changeModalVisibility(true)}
        style={[
          styles.dropdownContainer,
          {height: height, borderWidth: borderWidth},
        ]}>
        <Text style={[blackTextStyle, styles.labelDropdown]}>{label}</Text>
        <IcMaterial
          name={'chevron-down'}
          size={22}
          color={greySecondaryColor}
        />
      </Pressable>
      <Modal
        transparent={true}
        animationType={'fade'}
        visible={visible}
        onRequestClose={() => changeModalVisibility(false)}>
        <Pressable
          style={styles.container}
          onPress={() => changeModalVisibility(false)}>
          <View
            style={[
              styles.modal,
              {width: WIDTH - 30, minHeight: 100, maxHeight: HEIGHT / 2},
            ]}>
            <ScrollView persistentScrollbar={true}>{option}</ScrollView>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  dropdownContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: borderColor,
    borderRadius: 8,
    padding: 8,
  },
  labelDropdown: {
    fontSize: 12,
    fontFamily: FontFamily.poppinsMedium,
  },
  modal: {
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  option: {
    alignItems: 'flex-start',
    marginBottom: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: borderColor,
  },
  text: {
    fontSize: 16,
    fontFamily: FontFamily.poppinsSemiBold,
  },
});
