import {View, StyleSheet, Alert, Image, Text} from "react-native";
import OutlinedButton from "../UI/OutlinedButton";
import {Colors} from "../../constants/colors";
import {getCurrentPositionAsync} from "expo-location";
import {useForegroundPermissions} from "expo-location";
import {PermissionStatus} from "expo-image-picker";
import {getMapPreview} from "../../util/location";
import {useEffect, useState, useCallback} from "react";
import {useNavigation, useRoute} from "@react-navigation/native";

function LocationPicker() {

    const navigation = useNavigation();
    const route = useRoute();

    const [locationPermissionInformation, requestPermission] = useForegroundPermissions();
    const [pickedLocation, setPickedLocation] = useState();
    const mapPickedLocation = useCallback(
        route.params && {
            lat: route.params.pickedLat,
            lng: route.params.pickedLng,
        },
        [route.params]
    );

    useEffect(() => {
        if (mapPickedLocation) {
            setPickedLocation(mapPickedLocation)
        }
    }, [mapPickedLocation]);
    async function verifyPermissions() {
        if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const response = await requestPermission();
            console.log("permission granted")
            return response.granted;
        }

        if (locationPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert("Don't have permissions",
                "You need to grant location permissions to use this app");
            console.log("permission denied")
            return false;
        }

        return true;
    }

    async function getLocationHandler() {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return
        }

        const location = await getCurrentPositionAsync();
        console.log(location.coords.latitude)
        console.log(location.coords.longitude)



        setPickedLocation(
            {lat: location.coords.latitude,
                lng: location.coords.longitude});

    }

    function pickOnMapHandler() {
        navigation.navigate("Map");
    }

    let locationPreview = <Text>No Location picked yet</Text>

    if (pickedLocation) {
        locationPreview = <Image style={styles.mapPreviewImage}
            source={{uri: getMapPreview(pickedLocation.lat,
                    pickedLocation.lng)}}/>
    }

    return(
        <View>
            <View style={styles.mapPreview}>
                {locationPreview}
            </View>
            <View style={styles.actions}>
                <OutlinedButton icon="location" onPress={getLocationHandler}>
                    Locate user
                </OutlinedButton>
                <OutlinedButton icon="map" onPress={pickOnMapHandler}>
                    Pick on map
                </OutlinedButton>
            </View>
        </View>
    );
};

export default LocationPicker;

const styles = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4
    },
    actions: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    mapPreviewImage: {
        width: '100%',
        height: '100%',
        borderRadius: 4
    }

});
