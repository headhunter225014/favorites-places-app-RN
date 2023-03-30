import MapView, {Marker} from "react-native-maps";
import {Alert, StyleSheet} from "react-native";
import {useCallback, useLayoutEffect, useState} from "react";
import {Ionicons} from "@expo/vector-icons";
import IconButton from "../components/UI/IconButton";

function Map({navigation}) {
    const [selectedLocation, setSelectedLocation] = useState();
    const region = {
        latitude:  35.69216407958513,
        longitude:  -80.48377590723612,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }

    function selectLocationHandler(event) {
        const lat = event.nativeEvent.coordinate.latitude;
        const lng = event.nativeEvent.coordinate.longitude;

        setSelectedLocation({lat: lat, lng: lng});
    }

    const savePickedLocationHandler = useCallback(() => {
        if (!selectedLocation) {
            Alert.alert("No location Picked", "You have to pick a location by tapping at the map first");
            return;
        }

        navigation.navigate("AddPlace", {pickedLat: selectedLocation.lat, pickedLng: selectedLocation.lng});
    }, [navigation, selectedLocation]);

    useLayoutEffect(() => {
        navigation.setOptions({
        headerRight: ({tintColor}) =>
            <IconButton
                icon='save'
                size={24}
                color={tintColor}
                onPress={savePickedLocationHandler}/>
        }, [navigation, savePickedLocationHandler])
    });

    return (
        <MapView initialRegion={region} style={styles.map} onPress={selectLocationHandler}>
            {selectedLocation && <Marker title="Picked Location" coordinate={{latitude: selectedLocation.lat, longitude: selectedLocation.lng}}/>}
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
});
export default Map;