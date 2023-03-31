import {FlatList, View, StyleSheet, Text} from "react-native";
import PlaceItem from "./PlaceItem";
import {Colors} from "../../constants/colors";

function PlacesList ({places}) {
    if (!places || places.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>No places has been added yet</Text>
            </View>
        );
    }
    return (
        <FlatList style={styles.list} data={places}
                  keyExtractor={(item) => item.id}
                  renderItem={({item}) => <PlaceItem place={item}/>}/>
    );
}

const styles = StyleSheet.create({
    list: {
        margin: 24
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        color: Colors.primary200
    }
})

export default PlacesList;