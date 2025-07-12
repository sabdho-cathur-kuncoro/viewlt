/* eslint-disable react-hooks/exhaustive-deps */
import {useCallback, useRef, useState} from 'react';
import {Camera} from 'react-native-vision-camera';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import RNFS from 'react-native-fs';
import {useAppDispatch} from '../redux/hooks';
import {setToast} from '../redux/action/global';
import {storage} from '../utils/storage';

type photoListType = {
  sales_id: string;
  store_id: string;
  created_by: string;
  file_photo: string;
};

const useCamera = () => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [photoList, setPhotoList] = useState<photoListType[]>([]);
  const [isCameraReady, setIsCameraReady] = useState<boolean>(false);
  const camera = useRef<Camera>(null);

  const dispatch = useAppDispatch();

  const actions = {
    onSetPhotoList: useCallback(
      (val: any) => {
        setPhotoList(val);
      },
      [photoList, isCameraReady, camera],
    ),
    onTakePhoto: useCallback(
      (store_id: any) => {
        takePhotoAction(store_id);
      },
      [photoList, isCameraReady],
    ),
    onSetIsCameraReady: useCallback(
      (val: boolean) => {
        setIsCameraReady(val);
      },
      [isCameraReady],
    ),
    onSetIsCameraActive: useCallback(
      (val: boolean) => {
        setIsCameraActive(val);
      },
      [isCameraActive],
    ),
  };

  async function takePhotoAction(store_id: any) {
    try {
      if (camera.current && isCameraReady) {
        try {
          const sales_id = storage.getString('salesId');
          const dataList = {
            sales_id,
            store_id,
            created_by: sales_id,
          };
          const photo = await camera.current.takePhoto();
          // NOTE: RESIZE
          const result = await ImageResizer.createResizedImage(
            photo?.path,
            800,
            800,
            'JPEG',
            80,
            90,
            undefined,
            false,
          );
          // NOTE: GENERATE BASE64
          const base64 = await RNFS.readFile(result?.path, 'base64');
          const checkQTYPhoto = photoList.length;
          if (checkQTYPhoto === 0) {
            actions.onSetPhotoList([{...dataList, file_photo: base64}]);
          } else {
            actions.onSetPhotoList((prevState: photoListType[]) => [
              ...prevState,
              {...dataList, file_photo: base64},
            ]);
          }
        } catch (error) {
          dispatch(
            setToast({
              toastVisible: true,
              toastType: 'warning',
              toastMessage: `Error taking photo: ${error}`,
              toastDuration: 4000,
            }),
          );
        }
      } else {
        dispatch(
          setToast({
            toastVisible: true,
            toastType: 'warning',
            toastMessage: 'Camera is not ready or ref is missing.',
            toastDuration: 4000,
          }),
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      actions.onSetIsCameraActive(false);
    }
  }

  return {camera, isCameraReady, isCameraActive, photoList, actions};
};

export default useCamera;
