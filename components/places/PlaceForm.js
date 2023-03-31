import {View, Text, ScrollView, TextInput, StyleSheet} from "react-native";
import {useCallback, useState} from "react";
import {Colors} from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import ButtonCustom from "../UI/ButtonCustom";
import {Place} from "../../models/place";

function PlaceForm({onCreatePlace}) {
    const [enteredTitle, setEnteredTitle] = useState('');
    const [pickedLocation, setPickedLocation] = useState();
    const [selectImage, setSelectedImage] = useState();
    function changeTitleHandler(enteredText) {
        setEnteredTitle(enteredText)
    }

    function savePlaceHandler() {
        console.log(pickedLocation)
        const placeData = new Place(
            enteredTitle, selectImage, pickedLocation);
        onCreatePlace(placeData);
    }

    function onImageTaken(imageUri) {
        setSelectedImage(imageUri);
    }

    const  onLocationPick = useCallback((location) => {
        setPickedLocation(location);
    }, []);

    return (
        <ScrollView style={styles.form}>
            <View>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.input}
                           onChangeText={changeTitleHandler}
                           value={enteredTitle}/>
            </View>
            <ImagePicker onImageTaken={onImageTaken}/>
            <LocationPicker onLocationPick={onLocationPick}/>
            <ButtonCustom onPress={savePlaceHandler}>
                Add Place
            </ButtonCustom>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 24,
    },
    label: {
        fontWeight: "bold",
        marginBottom: 4,
        color: Colors.primary500,
        fontSize: 20,
        textAlign: 'center'
    },
    input: {
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 2,
        backgroundColor: Colors.primary100,
        borderRadius: 6
    }
})

export default PlaceForm;