import {View} from 'react-native';
import React from 'react';

type gapType = {
  width?: number;
  height?: number;
};

const Gap = ({width, height}: gapType) => {
  return <View style={[{width: width, height: height}]} />;
};

export default Gap;
