import MapView, {Marker} from "react-native-maps";
import {Alert, StyleSheet} from "react-native";
import {useCallback, useLayoutEffect, useState} from "react";
import {Ionicons} from "@expo/vector-icons";
import IconButton from "../components/UI/IconButton";
import {init} from "../util/database";

function Map({navigation, route}) {
    const initialLocation =
        route.params && {lat: route.params.initialLat, lng: route.params.initialLng};

    const [selectedLocation, setSelectedLocation] = useState(initialLocation);



    const region = {
        latitude:  initialLocation ? initialLocation.lat : 35.69216407958513,
        longitude:  initialLocation ? initialLocation.lng : -80.48377590723612,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }

    function selectLocationHandler(event) {
        if (initialLocation) {
            return;
        }
        
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
        if (initialLocation) {
            return;
        }

        navigation.setOptions({
        headerRight: ({tintColor}) =>
            <IconButton
                icon='save'
                size={24}
                color={tintColor}
                onPress={savePickedLocationHandler}/>
        })
    }, [navigation, savePickedLocationHandler, initialLocation]);

    return (
        <MapView initialRegion={region} style={styles.map} onPress={selectLocationHandler}>
            {selectedLocation &&
                <Marker title="Picked Location"
                        coordinate={{
                            latitude: selectedLocation.lat,
                            longitude: selectedLocation.lng}}
                />}
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
});
export default Map;