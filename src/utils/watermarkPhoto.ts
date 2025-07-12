import Marker, {
  ImageFormat,
  TextBackgroundType,
} from 'react-native-image-marker';
import {whiteColor} from '../constant/theme';

export async function presenceMarker(
  photoPath: string,
  loc: any,
  type: number,
  date: string,
  time: string,
  name: string,
  id: string,
) {
  try {
    let path = '';
    const options = {
      backgroundImage: {
        src: {uri: `file://${photoPath}`},
        scale: 1,
        rotate: 0,
      },
      // support multiple texts
      watermarkTexts: [
        {
          text: `[${id}] ${name.toUpperCase()}${'\n'}${date} ${time}${'\n'}${
            loc?.lat
          }, ${loc?.lng}${'\n'}`,
          positionOptions: {
            X: '12%',
            Y: '88%',
          },
          style: {
            color: whiteColor,
            fontSize: 30,
            fontName: 'Poppins',
            textBackgroundStyle: {
              padding: '2% 10%',
              type: TextBackgroundType.stretchX,
              color: 'transparent',
            },
          },
        },
      ],
      scale: 1,
      quality: 100,
      filename: `${type === 1 ? 'ClockIn' : 'ClockOut'}-${date}`,
      saveFormat: ImageFormat.jpg,
      maxSize: 1000,
    };

    path = await Marker.markText(options);
    return path;
  } catch (err) {
    console.log(err);
    throw new Error('Cannot mark the image');
  }
}

export async function storeVisitMarker(data: any) {
  try {
    let path = '';
    const options = {
      backgroundImage: {
        src: {uri: `file://${data.photoPath}`},
        scale: 1,
        rotate: 0,
      },
      // support multiple texts
      watermarkTexts: [
        {
          text: `[${data.userid}] ${data.name.toUpperCase()}${'\n'}${
            data.store_name
          } - ${data.city_name}${'\n'}${data.date} ${data.time}${'\n'}${
            data?.loc?.lat
          }, ${data?.loc?.lng}${'\n'}`,
          positionOptions: {
            X: '12%',
            Y: '85%',
          },
          style: {
            color: whiteColor,
            fontSize: 30,
            fontName: 'Poppins',
            textBackgroundStyle: {
              padding: '2% 10%',
              type: TextBackgroundType.stretchX,
              color: '#3d3b3b',
            },
          },
        },
      ],
      scale: 1,
      quality: 100,
      filename: `store-visit-${data?.date}`,
      saveFormat: ImageFormat.jpg,
      maxSize: 1000,
    };

    path = await Marker.markText(options);
    return path;
  } catch (err) {
    console.log(err);
    throw new Error('Cannot mark the image');
  }
}
