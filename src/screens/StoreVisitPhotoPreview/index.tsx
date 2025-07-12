/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {layout} from '../../constant/style';
import {storage} from '../../utils/storage';
import {postStoreVisitAction} from '../../redux/action/storeVisit';
import {useAppDispatch} from '../../redux/hooks';
import {Button, FocusAwareStatusBar, Header} from '../../components';
import {bgColor2, primaryColor} from '../../constant/theme';

const StoreVisitPhotoPreview = ({navigation, route}: any) => {
  const {store, base64} = route.params ?? {};

  const dispatch = useAppDispatch();

  async function onHandleSubmit() {
    try {
      // console.log(submitData);
      const sales_id = await storage.getString('salesId');
      const username = await storage.getString('username');
      const data = {
        sales_id,
        store_id: store?.store_id,
        file_photo_visit: base64,
        created_by: username,
      };
      await dispatch(postStoreVisitAction(data, navigation));
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <View style={layout.page}>
      <FocusAwareStatusBar
        backgroundColor={bgColor2}
        barStyle={'dark-content'}
      />
      <Header title="Store Photo" onPress={() => navigation.goBack()} />
      <View style={{flex: 0.9}}>
        <Image
          source={{uri: `data:image/jpeg;base64,${base64}`}}
          style={{
            width: '100%',
            height: '100%',
          }}
          resizeMode="cover"
        />
      </View>
      <View style={styles.footer}>
        <View style={{width: '40%'}}>
          <Button
            title={'Retake Photo'}
            titleColor={primaryColor}
            borderWidth={1}
            borderColor={primaryColor}
            bgColor={'transparent'}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
        <View style={{width: '58%'}}>
          <Button title={'Send Store Visit'} onPress={onHandleSubmit} />
        </View>
      </View>
    </View>
  );
};

export default StoreVisitPhotoPreview;

const styles = StyleSheet.create({
  footer: {
    flex: 0.1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: bgColor2,
  },
});
