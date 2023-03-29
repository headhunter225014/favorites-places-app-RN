import MapView, {Marker} from "react-native-maps";
import {StyleSheet} from "react-native";

function Map() {
    const region = {
        latitude:  35.69216407958513,
        longitude:  -80.48377590723612,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }
    return (
        <MapView initialRegion={region} style={styles.map}></MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
});
export default Map;