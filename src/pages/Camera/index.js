import React, { useEffect } from 'react';
import { View } from 'react-native';
import Orientation from 'react-native-orientation';
import BarcodeScan from '../../components/barcodeScanner'

// import { Container } from './styles';

export default function Camera() {

  useEffect(() => {
    const initial = Orientation.getInitialOrientation();
    Orientation.lockToLandscapeLeft()
    if (initial === 'PORTRAIT') {
      console.tron.log('PORTRAIT', initial)
    } else {
      console.tron.log('NAO PORTRAIT', initial)
      // do something else
    }
  }, [])
  return (
    <BarcodeScan />
  );
}
