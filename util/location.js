import {API_KEY} from "../API/api";
export function getMapPreview (lat, lng) {
    //const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=35.69213987762374,-80.4837797752711&zoom=14&size=200x100&maptype=satellite&markers=color:red%7Clabel:S%7C35.69213987762374,-80.4837797752711&key=AIzaSyBhJmv9TXK8EcavzVbPhVrDu1J0vZ-YPco`;
    const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=500x250&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${API_KEY}`;
    return imagePreviewUrl;
}