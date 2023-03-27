import {View, Button, Alert, Image, Text, StyleSheet} from "react-native";
import {launchCameraAsync, useCameraPermissions, PermissionStatus} from "expo-image-picker";
import {useState} from "react";
import {Colors} from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";
function ImagePicker() {
    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();
    const [pickedImage, setPickedImage] = useState();
    async function verifyPermissions() {
        if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const response = await requestPermission();

            return response.granted;
        }

        if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert("Don't have permissions",
                "You need to grant camera permissions to use this app");

            return false;
        }

       return true;
    }

    async function takeImageHandler() {
        const hasPermission = await verifyPermissions();

        if (!hasPermission) {
            return;
        }

        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5
        });
        setPickedImage(image.assets[0].uri);
    }

    let imagePreview = <Text>No image taken yet</Text>

    if (pickedImage) {
        imagePreview = <Image style={styles.image} source={{uri: pickedImage}}/>
    }

    return (
        <View>
            <View style={styles.imagePreview}>
                {imagePreview}
            </View>

            <OutlinedButton onPress={takeImageHandler}
                            icon="camera">Take an image
            </OutlinedButton>
        </View>
    );
}

const styles = StyleSheet.create({
    imagePreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4
    },
    image: {
        width: '100%',
        height: '100%'
    }
})

export default ImagePicker;