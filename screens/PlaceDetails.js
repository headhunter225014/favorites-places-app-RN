import {ScrollView, Image, View, StyleSheet, Text} from "react-native";
import OutlinedButton from "../components/UI/OutlinedButton";
import {Colors} from "../constants/colors";
import {useEffect} from "react";

function PlaceDetails({route}) {
    const selectedPlaceId = route.params.placeId
    function showOnMapHandler() {

    }

    useEffect(() => {

    }, [selectedPlaceId]);

    return (
        <ScrollView>
            <Image style={styles.image}/>
            <View style={styles.locationContainer}>
                <View style={styles.addressLocation}>
                    <Text style={styles.address}>Address</Text>
                </View>
                <OutlinedButton icon='map' onPress={showOnMapHandler}>
                    View on Map
                </OutlinedButton>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    image: {
        height: '35%',
        minHeight: 300,
        width: '100%'
    },
    locationContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    addressLocation: {
        padding: 20
    },
    address: {
        color: Colors.primary500,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16
     }

});

export default PlaceDetails;