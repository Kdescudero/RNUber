import React from 'react'
import MapViewDirections from 'react-native-maps-directions'

const Directions = ({ destination, origin, onReady }) => (
   <MapViewDirections 
      destination={destination}
      origin={origin}
      onReady={onReady}
      apikey='AIzaSyBM_div2FvPXzjnVGSyV3odgPupkjN3ogA'
      strokeWidth={3}
      strokeColor='#222'
   />
);

export default Directions;