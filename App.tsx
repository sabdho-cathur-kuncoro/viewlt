/* eslint-disable react-native/no-inline-styles */
import {LogBox, SafeAreaView} from 'react-native';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import Router from './src/router';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {useAppSelector} from './src/redux/hooks';
import {LoadingGlobal, Popup, Toast} from './src/components';
// import {notifService} from './src/utils/notifeeConfig';
// import {localForegroundNotif} from './src/utils/pushNotif';

LogBox.ignoreAllLogs();
// notifService.createChannel();

const AppMain = () => {
  const {isLoading, toastVisible, popupVisible} = useAppSelector(
    state => state.globalReducer,
  );

  // useEffect(() => {
  //   const unsubscribe = localForegroundNotif();
  //   return unsubscribe;
  // }, []);
  return (
    <NavigationContainer>
      <SafeAreaView style={{flex: 1}}>
        {isLoading && <LoadingGlobal />}
        {toastVisible && <Toast />}
        {popupVisible && <Popup />}
        <Router />
      </SafeAreaView>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <AppMain />
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
