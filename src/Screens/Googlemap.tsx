import React, { useEffect, useRef } from 'react';
import MapView, { Callout, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { markers } from '../assets/markers';
import { useNavigation } from '@react-navigation/native';

const INITIAL_REGION = {
	latitude: 23.0497568,
	longitude: 72.5010724,
	latitudeDelta: 2,
	longitudeDelta: 2
};

export default function Googlemap() {
	const mapRef = useRef<any>(null);
	const navigation = useNavigation();

	useEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity onPress={focusMap}>
					<View style={{ padding: 10 }}>
						<Text style={{color:'#fff'}}>Focus</Text>
					</View>
				</TouchableOpacity>
			)
		});
	}, []);

	const focusMap = () => {
		const GreenBayStadium = {
			latitude: 23.032760844729836,
			longitude:72.46121848002076,
			latitudeDelta: 0.001,
			longitudeDelta: 0.001
		};

		mapRef.current?.animateToRegion(GreenBayStadium);
		// mapRef.current?.animateCamera({ center: GreenBayStadium, zoom: 10 }, { duration: 2000 });
	};

	const onMarkerSelected = (marker: any) => {
		// Alert.alert(marker.name);
	};

	const calloutPressed = (ev: any) => {
		console.log(ev);
	};

	const onRegionChange = (region: Region) => {
		console.log(region);
	};

	return (
		<View style={{ flex: 1 }}>
			<MapView
				style={StyleSheet.absoluteFillObject}
				mapType='hybrid'
				initialRegion={INITIAL_REGION}
				showsUserLocation
				showsMyLocationButton
				provider={PROVIDER_GOOGLE}
				ref={mapRef}
				onRegionChangeComplete={onRegionChange}
			>
				{markers.map((marker, index) => (
					<Marker
						key={index}
						title={marker.name}
						coordinate={marker}
						onPress={() => onMarkerSelected(marker)}
					>
						<Callout onPress={calloutPressed}>
							<View style={{ padding: 10 }}>
								<Text style={{ fontSize: 24 }}>{marker.name}</Text>
							</View>
						</Callout>
					</Marker>
				))}
			</MapView>
		</View>
	);
}