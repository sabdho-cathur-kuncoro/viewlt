import * as React from 'react';
import {StatusBar, StatusBarProps} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

type Props = React.JSX.IntrinsicAttributes &
  React.JSX.IntrinsicClassAttributes<StatusBar> &
  Readonly<StatusBarProps>;

function FocusAwareStatusBar(props: Props) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}

export default FocusAwareStatusBar;
