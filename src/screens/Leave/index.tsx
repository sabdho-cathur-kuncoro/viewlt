import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {FocusAwareStatusBar, Header} from '../../components';
import {bgColor2, whiteColor} from '../../constant/theme';
import {layout, shadow} from '../../constant/style';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const Leave = ({navigation}: any) => {
  return (
    <View style={layout.page}>
      <FocusAwareStatusBar
        backgroundColor={bgColor2}
        barStyle={'dark-content'}
      />
      <Header title="Leave" onPress={() => navigation.goBack()} />
      <Text>Leave</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('LeaveCreate')}
        activeOpacity={0.8}
        style={[layout.FAB, shadow]}>
        <MaterialIcon name="plus" size={32} color={whiteColor} />
      </TouchableOpacity>
    </View>
  );
};

export default Leave;

const styles = StyleSheet.create({});
