import { LocationObject } from "expo-location";
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import * as Location from "expo-location";

export default function Index() {
  const [currentLocation, setCurrentLocation] = useState<LocationObject | null>(null);
  const [isAbsen, setIsAbsen] = useState(false);

  useEffect(() => {
    async function getLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      setCurrentLocation(location);
    }
    async function checkLocationStudent() {
      const response = await fetch(`https://script.google.com/macros/s/AKfycbyHHxB_PvxnD8g_o2OilYjuQusYR0KlpqrdKQ02XbGMAL4l46tXbc7iagqXfSYjZ4EGHw/exec?action=hitung-jarak&asal=${currentLocation?.coords.latitude}, ${currentLocation?.coords.longitude}&tujuan=-6.940576738588651, 107.57456772724115`)
      const json = await response.json();
      const distance = json.values;
      if (Number(distance) <= 5) {
        setIsAbsen(true);
      } else {
        setIsAbsen(false);
      }
      console.log(distance);
    }
    getLocation();
    checkLocationStudent();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 24 }}>Your location: </Text>
      <Text>{`${currentLocation?.coords.latitude} ${currentLocation?.coords.longitude}`}</Text>
      <Button title="absen" onPress={() => alert('hai')} disabled={!isAbsen} />
      {!isAbsen && (
        <View>
          <Text style={{ color: 'red' }}>Kamu sedang tidak dirumah,</Text>
          <Text style={{ color: 'red' }}>absen harus dirumah kocak</Text>
        </View>
      )}

    </View>
  );
}
