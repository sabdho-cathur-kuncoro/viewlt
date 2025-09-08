import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {layout, shadow} from '../../constant/style';
import {FocusAwareStatusBar, Header} from '../../components';
import {bgColor2, whiteColor} from '../../constant/theme';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const Permit = ({navigation}: any) => {
  return (
    <View style={layout.page}>
      <FocusAwareStatusBar
        backgroundColor={bgColor2}
        barStyle={'dark-content'}
      />
      <Header title="Permit" onPress={() => navigation.goBack()} />
      <Text>Permit</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('PermitCreate')}
        activeOpacity={0.8}
        style={[layout.FAB, shadow]}>
        <MaterialIcon name="plus" size={32} color={whiteColor} />
      </TouchableOpacity>
    </View>
  );
};

export default Permit;

const styles = StyleSheet.create({});
