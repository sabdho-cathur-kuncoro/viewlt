import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {layout, shadow} from '../../constant/style';
import {FocusAwareStatusBar, Header} from '../../components';
import {bgColor2, primaryColor, whiteColor} from '../../constant/theme';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const SickLeave = ({navigation}: any) => {
  return (
    <View style={layout.page}>
      <FocusAwareStatusBar
        backgroundColor={bgColor2}
        barStyle={'dark-content'}
      />
      <Header title="Sick Leave" onPress={() => navigation.goBack()} />
      <Text>SickLeave</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('SickLeaveCreate')}
        activeOpacity={0.8}
        style={[layout.FAB, shadow]}>
        <MaterialIcon name="plus" size={32} color={whiteColor} />
      </TouchableOpacity>
    </View>
  );
};

export default SickLeave;

const styles = StyleSheet.create({});
