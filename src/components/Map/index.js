import React, { Component } from 'react'
import { View } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import Search from '../Search'
import Direction from '../Direction'
import { getPixelSize } from '../utils'
import maikerImage from '../../assets/marker.png'
import { LocationBox, LocationText } from './styles'

class Map extends Component {

   state = {
      region: null,
      destination: null,
   }

   async componentDidMount() {
      navigator.geolocation.getCurrentPosition(
         ({ coords: { latitude, longitude } }) => {
            this.setState({
               region: {
                  latitude,
                  longitude,
                  latitudeDelta: 0.0143,
                  longitudeDelta: 0.0134,
               }
            });
         }, // sucsses
         () => { }, // error
         {
            timeout: 2000,
            enableHighAccuracy: true,
            maximumAge: 1000,
         }
      )
   }

   handleLocationSelected = (data, { geometry }) => {
      const { location: { lat: latitude, lng: longitude } } = geometry;
      this.setState({
         destination: {
            latitude,
            longitude,
            title: data.structured_formatting.main_text,
         }
      })
   }

   render() {
      const { region, destination } = this.state
      return (
         <View style={{ flex: 1 }}>
            <MapView
               style={{ flex: 1 }}
               provider={PROVIDER_GOOGLE}
               region={region}
               showsUserLocation
               loadingEnabled
               showsMyLocationButton
               ref={el => (this.mapView = el)}
            >
               {destination && (
                  <>
                     <Direction
                        origin={region}
                        destination={destination}
                        onReady={result => {
                           this.mapView.fitToCoordinates(result.coordinates, {
                              edgePadding: {
                                 top: getPixelSize(50),
                                 bottom: getPixelSize(50),
                                 left: getPixelSize(50),
                                 right: getPixelSize(50)
                              }
                           })
                        }}
                     />
                     <Marker
                        coordinate={destination}
                        anchor={{ x: 0, y: 0 }}
                        image={maikerImage}
                     >
                        <LocationBox>
                           <LocationText>{destination.title}</LocationText>
                        </LocationBox>
                     </Marker>
                  </>
               )}
            </MapView>
            <Search onLocationSelected={this.handleLocationSelected} />
         </View>
      )
   }
}

export default Map;