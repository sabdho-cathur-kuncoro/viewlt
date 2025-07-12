/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {layout} from '../../constant/style';
import {
  Button,
  FocusAwareStatusBar,
  Gap,
  Header,
  ModalConfirmation,
} from '../../components';
import {
  bgColor2,
  blackColor,
  blackTextStyle,
  primaryColor,
  primaryTextStyle,
  whiteColor,
  whiteRGBAColor,
} from '../../constant/theme';
import {coc, homeShelf, secShelf} from '../../assets';
import IcMaterialCom from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAppDispatch} from '../../redux/hooks';
import useCamera from '../../hooks/useCamera';
import {
  Camera,
  useCameraDevice,
  useCameraFormat,
} from 'react-native-vision-camera';
import {postReportStoreVisitAction} from '../../redux/action/storeVisit';
import {setToast} from '../../redux/action/global';
// import CameraView from '../../components/CameraView';

const ReportPhoto = ({navigation, route}: any) => {
  const {reportType, store_id} = route.params ?? {};
  const {photoList, camera, isCameraActive, isCameraReady, actions} =
    useCamera();
  const [isConfirmVisible, setIsConfirmVisible] = useState<boolean>(false);
  const [isSelectedPhotoVisible, setIsSelectedPhotoVisible] =
    useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string>('');
  const device = useCameraDevice('back');
  const format = useCameraFormat(device, [
    {photoAspectRatio: 4 / 3},
    {photoResolution: {width: 1280, height: 720}},
  ]);
  const {width, height} = useWindowDimensions();
  const dispatch = useAppDispatch();

  const onInitialized = useCallback(() => {
    console.log('Camera initialized!');
    actions.onSetIsCameraReady(true);
  }, [isCameraReady]);

  async function onHandleSubmit() {
    try {
      // console.log(photoList);
      if (photoList?.length === 0) {
        setIsConfirmVisible(false);
        dispatch(
          setToast({
            toastVisible: true,
            toastType: 'warning',
            toastMessage: 'Photo cannot be empty',
            toastDuration: 3000,
          }),
        );
      } else {
        setIsConfirmVisible(false);
        await dispatch(
          postReportStoreVisitAction(photoList, navigation, reportType),
        );
      }
    } catch (err) {
      console.log(err);
    }
  }

  if (reportType === 1) {
    return (
      <View style={layout.page}>
        <FocusAwareStatusBar
          backgroundColor={bgColor2}
          barStyle={'dark-content'}
        />
        <Header title={'Homeshelf'} onPress={() => navigation.goBack()} />
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{paddingHorizontal: 16, paddingBottom: 80}}>
          <View
            style={{
              width: '47%',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <View style={[styles.cardContainer, {minHeight: height * 0.2}]}>
              <Image
                source={homeShelf}
                style={{width: 80, height: 80}}
                resizeMode="contain"
              />
            </View>
          </View>
          <Gap height={24} />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => actions.onSetIsCameraActive(true)}
            style={styles.btnAddPhoto}>
            <View
              style={{
                width: '80%',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <IcMaterialCom name="camera" size={24} color={primaryColor} />
              <Gap width={8} />
              <Text style={[primaryTextStyle]}>Photo Product</Text>
            </View>
            <View style={{width: '20%', alignItems: 'flex-end'}}>
              <IcMaterialCom name="plus" size={24} color={primaryColor} />
            </View>
          </TouchableOpacity>
          <Gap height={16} />
          <View style={styles.containerPhoto}>
            {photoList?.map((photo: any, index: any) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    setSelectedPhoto(photo.file_photo);
                    setTimeout(() => {
                      setIsSelectedPhotoVisible(true);
                    }, 500);
                  }}
                  key={index}
                  style={{
                    width: width * 0.44,
                    height: width * 0.4,
                    marginBottom: 10,
                    borderRadius: 4,
                  }}>
                  <Image
                    source={{uri: `data:image/jpeg;base64,${photo.file_photo}`}}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 4,
                    }}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
        {/* // NOTE: FOOTER */}
        <View style={styles.footer}>
          <View style={{width: '60%', alignSelf: 'center'}}>
            <Button title="Save" onPress={() => setIsConfirmVisible(true)} />
          </View>
        </View>
        {/* // NOTE: MODAL CAMERA */}
        <Modal
          visible={isCameraActive}
          animationType="slide"
          onDismiss={() => actions.onSetIsCameraActive(false)}>
          <View style={{flex: 1}}>
            {device ? (
              <Camera
                ref={camera}
                photo={true}
                style={StyleSheet.absoluteFill}
                device={device}
                format={format}
                isActive={isCameraActive}
                onInitialized={onInitialized}
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  backgroundColor: bgColor2,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={[blackTextStyle, {fontSize: 24}]}>
                  No Camera Device
                </Text>
              </View>
            )}
          </View>
          {isCameraReady ? (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => actions.onTakePhoto(store_id)}
              style={styles.btnCamera}>
              <IcMaterialCom name="camera" size={32} color={blackColor} />
            </TouchableOpacity>
          ) : (
            <></>
          )}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              actions.onSetIsCameraActive(false);
            }}
            style={styles.btnCloseModal}>
            <IcMaterialCom name="close" size={24} color={blackColor} />
          </TouchableOpacity>
        </Modal>
        {/* // NOTE: MODAL VIEW PHOTO */}
        <Modal
          visible={isSelectedPhotoVisible}
          animationType="fade"
          transparent
          onDismiss={() => setIsSelectedPhotoVisible(false)}>
          <View style={styles.modalViewContainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setIsSelectedPhotoVisible(false)}
              style={{
                width: width * 0.8,
                height: height * 0.8,
                borderRadius: 10,
              }}>
              <Image
                source={{uri: `data:image/jpeg;base64,${selectedPhoto}`}}
                style={{width: '100%', height: '100%', borderRadius: 10}}
                resizeMode="cover"
              />
            </TouchableOpacity>
            <Gap height={16} />
            <View style={{width: '60%', alignSelf: 'center'}}>
              <Button
                title="Close"
                titleColor={primaryColor}
                bgColor={whiteColor}
                onPress={() => setIsSelectedPhotoVisible(false)}
              />
            </View>
          </View>
        </Modal>
        <ModalConfirmation
          visible={isConfirmVisible}
          confirmText="Save this report"
          onClose={() => setIsConfirmVisible(false)}
          onTapBackground={() => setIsConfirmVisible(false)}
          onConfirm={onHandleSubmit}
        />
      </View>
    );
  }
  if (reportType === 2) {
    return (
      <View style={layout.page}>
        <FocusAwareStatusBar
          backgroundColor={bgColor2}
          barStyle={'dark-content'}
        />
        <Header title={'COC Cashier'} onPress={() => navigation.goBack()} />
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{paddingHorizontal: 16, paddingBottom: 50}}>
          <View
            style={{
              width: '47%',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <View style={[styles.cardContainer, {minHeight: height * 0.2}]}>
              <Image
                source={coc}
                style={{width: 80, height: 80}}
                resizeMode="contain"
              />
            </View>
          </View>
          <Gap height={24} />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => actions.onSetIsCameraActive(true)}
            style={styles.btnAddPhoto}>
            <View
              style={{
                width: '80%',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <IcMaterialCom name="camera" size={24} color={primaryColor} />
              <Gap width={8} />
              <Text style={[primaryTextStyle]}>Photo Product</Text>
            </View>
            <View style={{width: '20%', alignItems: 'flex-end'}}>
              <IcMaterialCom name="plus" size={24} color={primaryColor} />
            </View>
          </TouchableOpacity>
          <Gap height={16} />
          <View style={styles.containerPhoto}>
            {photoList?.map((photo: any, index: any) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    setSelectedPhoto(photo.file_photo);
                    setTimeout(() => {
                      setIsSelectedPhotoVisible(true);
                    }, 500);
                  }}
                  key={index}
                  style={{
                    width: width * 0.44,
                    height: width * 0.4,
                    marginBottom: 10,
                    borderRadius: 4,
                  }}>
                  <Image
                    source={{uri: `data:image/jpeg;base64,${photo.file_photo}`}}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 4,
                    }}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
        {/* // NOTE: FOOTER */}
        <View style={styles.footer}>
          <View style={{width: '60%', alignSelf: 'center'}}>
            <Button title="Save" onPress={() => setIsConfirmVisible(true)} />
          </View>
        </View>
        {/* // NOTE: MODAL CAMERA */}
        <Modal
          visible={isCameraActive}
          animationType="slide"
          onDismiss={() => actions.onSetIsCameraActive(false)}>
          <View style={{flex: 1}}>
            {device ? (
              <Camera
                ref={camera}
                photo={true}
                style={StyleSheet.absoluteFill}
                device={device}
                format={format}
                isActive={isCameraActive}
                onInitialized={onInitialized}
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  backgroundColor: bgColor2,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={[blackTextStyle, {fontSize: 24}]}>
                  No Camera Device
                </Text>
              </View>
            )}
          </View>
          {isCameraReady ? (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => actions.onTakePhoto(store_id)}
              style={styles.btnCamera}>
              <IcMaterialCom name="camera" size={32} color={blackColor} />
            </TouchableOpacity>
          ) : (
            <></>
          )}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              actions.onSetIsCameraActive(false);
            }}
            style={styles.btnCloseModal}>
            <IcMaterialCom name="close" size={24} color={blackColor} />
          </TouchableOpacity>
        </Modal>
        {/* // NOTE: MODAL VIEW PHOTO */}
        <Modal
          visible={isSelectedPhotoVisible}
          animationType="fade"
          transparent
          onDismiss={() => setIsSelectedPhotoVisible(false)}>
          <View style={styles.modalViewContainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setIsSelectedPhotoVisible(false)}
              style={{
                width: width * 0.8,
                height: height * 0.8,
                borderRadius: 10,
              }}>
              <Image
                source={{uri: `data:image/jpeg;base64,${selectedPhoto}`}}
                style={{width: '100%', height: '100%', borderRadius: 10}}
                resizeMode="cover"
              />
            </TouchableOpacity>
            <Gap height={16} />
            <View style={{width: '60%', alignSelf: 'center'}}>
              <Button
                title="Close"
                titleColor={primaryColor}
                bgColor={whiteColor}
                onPress={() => setIsSelectedPhotoVisible(false)}
              />
            </View>
          </View>
        </Modal>
        <ModalConfirmation
          visible={isConfirmVisible}
          confirmText="Save this report"
          onClose={() => setIsConfirmVisible(false)}
          onTapBackground={() => setIsConfirmVisible(false)}
          onConfirm={onHandleSubmit}
        />
      </View>
    );
  }
  if (reportType === 3) {
    return (
      <View style={layout.page}>
        <FocusAwareStatusBar
          backgroundColor={bgColor2}
          barStyle={'dark-content'}
        />
        <Header
          title={'Secondary Display'}
          onPress={() => navigation.goBack()}
        />
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{paddingHorizontal: 16, paddingBottom: 50}}>
          <View
            style={{
              width: '47%',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <View style={[styles.cardContainer, {minHeight: height * 0.2}]}>
              <Image
                source={secShelf}
                style={{width: 80, height: 80}}
                resizeMode="contain"
              />
            </View>
          </View>
          <Gap height={24} />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => actions.onSetIsCameraActive(true)}
            style={styles.btnAddPhoto}>
            <View
              style={{
                width: '80%',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <IcMaterialCom name="camera" size={24} color={primaryColor} />
              <Gap width={8} />
              <Text style={[primaryTextStyle]}>Photo Product</Text>
            </View>
            <View style={{width: '20%', alignItems: 'flex-end'}}>
              <IcMaterialCom name="plus" size={24} color={primaryColor} />
            </View>
          </TouchableOpacity>
          <Gap height={16} />
          <View style={styles.containerPhoto}>
            {photoList?.map((photo: any, index: any) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    setSelectedPhoto(photo.file_photo);
                    setTimeout(() => {
                      setIsSelectedPhotoVisible(true);
                    }, 500);
                  }}
                  key={index}
                  style={{
                    width: width * 0.44,
                    height: width * 0.4,
                    marginBottom: 10,
                    borderRadius: 4,
                  }}>
                  <Image
                    source={{uri: `data:image/jpeg;base64,${photo.file_photo}`}}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 4,
                    }}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
        {/* // NOTE: FOOTER */}
        <View style={styles.footer}>
          <View style={{width: '60%', alignSelf: 'center'}}>
            <Button title="Save" onPress={() => setIsConfirmVisible(true)} />
          </View>
        </View>
        {/* // NOTE: MODAL CAMERA */}
        <Modal
          visible={isCameraActive}
          animationType="slide"
          onDismiss={() => actions.onSetIsCameraActive(false)}>
          <View style={{flex: 1}}>
            {device ? (
              <Camera
                ref={camera}
                photo={true}
                style={StyleSheet.absoluteFill}
                device={device}
                format={format}
                isActive={isCameraActive}
                onInitialized={onInitialized}
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  backgroundColor: bgColor2,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={[blackTextStyle, {fontSize: 24}]}>
                  No Camera Device
                </Text>
              </View>
            )}
          </View>
          {isCameraReady ? (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => actions.onTakePhoto(store_id)}
              style={styles.btnCamera}>
              <IcMaterialCom name="camera" size={32} color={blackColor} />
            </TouchableOpacity>
          ) : (
            <></>
          )}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              actions.onSetIsCameraActive(false);
            }}
            style={styles.btnCloseModal}>
            <IcMaterialCom name="close" size={24} color={blackColor} />
          </TouchableOpacity>
        </Modal>
        {/* // NOTE: MODAL VIEW PHOTO */}
        <Modal
          visible={isSelectedPhotoVisible}
          animationType="fade"
          transparent
          onDismiss={() => setIsSelectedPhotoVisible(false)}>
          <View style={styles.modalViewContainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setIsSelectedPhotoVisible(false)}
              style={{
                width: width * 0.8,
                height: height * 0.8,
                borderRadius: 10,
              }}>
              <Image
                source={{uri: `data:image/jpeg;base64,${selectedPhoto}`}}
                style={{width: '100%', height: '100%', borderRadius: 10}}
                resizeMode="cover"
              />
            </TouchableOpacity>
            <Gap height={16} />
            <View style={{width: '60%', alignSelf: 'center'}}>
              <Button
                title="Close"
                titleColor={primaryColor}
                bgColor={whiteColor}
                onPress={() => setIsSelectedPhotoVisible(false)}
              />
            </View>
          </View>
        </Modal>
        <ModalConfirmation
          visible={isConfirmVisible}
          confirmText="Save this report"
          onClose={() => setIsConfirmVisible(false)}
          onTapBackground={() => setIsConfirmVisible(false)}
          onConfirm={onHandleSubmit}
        />
      </View>
    );
  }
  return (
    <View style={layout.page}>
      <FocusAwareStatusBar
        backgroundColor={bgColor2}
        barStyle={'dark-content'}
      />
      <Header
        title={
          reportType === 1
            ? 'Homeshelf'
            : reportType === 2
            ? 'COC Cashier'
            : 'Secondary Display'
        }
        onPress={() => navigation.goBack()}
      />
      <Text>ReportPhoto</Text>
    </View>
  );
};

export default ReportPhoto;

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: whiteColor,
    borderRadius: 24,
  },
  btnAddPhoto: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: whiteColor,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: primaryColor,
  },
  btnCamera: {
    width: 64,
    height: 64,
    borderRadius: 64 / 2,
    backgroundColor: whiteColor,
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerPhoto: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footer: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    paddingVertical: 4,
    backgroundColor: bgColor2,
  },
  btnCloseModal: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: whiteRGBAColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalViewContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
