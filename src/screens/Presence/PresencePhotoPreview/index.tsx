/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {bgColor2, primaryColor} from '../../../constant/theme';
import {Button, FocusAwareStatusBar, Header} from '../../../components';
import {useAppDispatch} from '../../../redux/hooks';
import {presenceAction} from '../../../redux/action/attendance';
import {storage} from '../../../utils/storage';

const PresencePhotoPreview = ({navigation, route}: any) => {
  const {type, base64, loc} = route.params ?? {};
  const dispatch = useAppDispatch();

  async function onHandleSubmit() {
    try {
      const salesId = storage.getString('salesId');
      let submitData = {};
      if (type === 1) {
        submitData = {
          sales_id: salesId,
          absent_code: 'P',
          incoming_latitude: loc?.lat,
          incoming_longitude: loc?.lng,
          incoming_file_photo: base64.toString(),
          created_by: salesId,
        };
      } else {
        submitData = {
          sales_id: salesId,
          absent_code: 'P',
          repeat_latitude: loc?.lat,
          repeat_longitude: loc?.lng,
          repeat_file_photo: base64.toString(),
          updated_by: salesId,
        };
      }
      dispatch(presenceAction(submitData, type, navigation));
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <View style={styles.page}>
      <FocusAwareStatusBar
        backgroundColor={bgColor2}
        barStyle={'dark-content'}
      />
      <Header
        title={type === 1 ? 'Clock In' : 'Clock Out'}
        onPress={() => navigation.goBack()}
      />
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
        <View style={{width: '49%'}}>
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
        <View style={{width: '49%'}}>
          <Button
            title={`Send Clock ${type === 1 ? 'In' : 'Out'}`}
            onPress={onHandleSubmit}
          />
        </View>
      </View>
    </View>
  );
};

export default PresencePhotoPreview;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'transparent',
  },
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
