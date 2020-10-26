import React, { useRef, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native'
import { RNCamera } from 'react-native-camera'
import ImageEditor from '@react-native-community/image-editor'
import { openCamera } from 'react-native-image-crop-picker'
import ImagePicker from 'react-native-image-crop-picker'

const { width, height } = Dimensions.get('screen')

const App = () => {
  const ref = useRef(null)

  const [uriImage, setUriImage] = useState(null)

  const takePicture = async () => {
    if (ref.current) {
      const options = { width: 480, quality: 1, base64: false }
      const data = await ref.current.takePictureAsync(options)
      // const cropData = {
      //   offset: { x: 0, y: 0 },
      //   size: { width: width, height: 204 },
      //   displaySize: { width: width, height: 204 },
      // }
      // ImageEditor.cropImage(data.uri, cropData).then((url) => {
      //   Image.getSize(data.uri, (w, h) => {
      //     console.log('RES', w, h)
      //   })
      //   console.log('Cropped image uri', data)
      //   setUriImage(url)
      // })

      ImagePicker.openCropper({
        path: data.uri,
        width: 323,
        height: 204,
      }).then((image) => {
        console.log(image)
        setUriImage(image.path)
      })
    }
  }

  const openCameraCrop = () => {
    ImagePicker.openCamera({
      width: 323,
      height: 204,
      cropping: true,
    }).then((image) => {
      console.log(image)
      setUriImage(image.path)
    })
  }

  if (uriImage) return <Image source={{ uri: uriImage }} style={styles.image} />

  return (
    <View style={styles.container}>
      <RNCamera
        ref={ref}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      />
      <View
        style={{
          borderWidth: 1,
          zIndex: 100,
          borderColor: 'white',
          position: 'absolute',
          top: 0,
          left: 0,
          width: width,
          height: 204,
        }}
      ></View>
      <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity onPress={takePicture} style={styles.capture}>
          <Text style={{ fontSize: 14 }}> SNAP </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
})

export default App
