import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {layout, shadow} from '../../constant/style';
import {FocusAwareStatusBar, Header} from '../../components';
import {bgColor2, whiteColor} from '../../constant/theme';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const Offday = ({navigation}: any) => {
  return (
    <View style={layout.page}>
      <FocusAwareStatusBar
        backgroundColor={bgColor2}
        barStyle={'dark-content'}
      />
      <Header title="Off Day" onPress={() => navigation.goBack()} />
      <Text>Offday</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('OffdayCreate')}
        activeOpacity={0.8}
        style={[layout.FAB, shadow]}>
        <MaterialIcon name="plus" size={32} color={whiteColor} />
      </TouchableOpacity>
    </View>
  );
};

export default Offday;

const styles = StyleSheet.create({});
