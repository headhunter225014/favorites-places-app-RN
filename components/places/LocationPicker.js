import {View, StyleSheet, Alert} from "react-native";
import OutlinedButton from "../UI/OutlinedButton";
import {Colors} from "../../constants/colors";
import {getCurrentPositionAsync} from "expo-location";
import {useForegroundPermissions} from "expo-location";
import {PermissionStatus} from "expo-image-picker";
function LocationPicker() {

    const [locationPermissionInformation, requestPermission] = useForegroundPermissions();
    async function verifyPermissions() {
        if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const response = await requestPermission();

            return response.granted;
        }

        if (locationPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert("Don't have permissions",
                "You need to grant location permissions to use this app");

            return false;
        }

        return true;
    }

    async function getLocationHandler() {
        const hasPermission = await verifyPermissions();
        const location = await getCurrentPositionAsync();
    }

    function pickOnMapHandler() {

    }

    return(
        <View>
            <View style={styles.mapPreview}>

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
    }

});
