import {FlatList, View, StyleSheet, Text} from "react-native";
import PlaceItem from "./PlaceItem";
import {Colors} from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";
import {useNavigation} from "@react-navigation/native";

function PlacesList ({places}) {
    const navigation = useNavigation();
    if (!places || places.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>No places has been added yet</Text>
                <OutlinedButton onPress={() => {
                    navigation.navigate('AddPlace')
                 }
                }>
                    Add new place
                </OutlinedButton>
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