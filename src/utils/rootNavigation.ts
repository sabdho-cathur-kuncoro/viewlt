// RootNavigation.js
import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();
// const isNavigationReadyRef = React.createRef();
// export const setRootNavigationReady = (value) => {
//   isNavigationReadyRef.current = value;
// }

export function navigate(name: string) {
  // if (isNavigationReadyRef.current && navigationRef.current) {
  //   navigationRef.current?.navigate(name);
  // }
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as never);
  }
}

// add other navigation functions that you need and export them
