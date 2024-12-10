import { View, Text, Pressable, StyleSheet, Image, Alert, Linking } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';


export default function AddImage({image, setImage}) {

    const [mediaPermission, requestMediaPermission] = ImagePicker.useMediaLibraryPermissions();
    

    const openAppSettings = () => {
        Linking.openSettings();
      };

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        if(!mediaPermission.granted) {
            const permissions = await requestMediaPermission()
            console.log(permissions)
            if(!permissions.canAskAgain){
                Alert.alert(
                    'Permission Required',
                    'You have denied media library permissions. Please enable storage/media permissions manually in the app settings.',
                    [
                      {
                        text: 'Cancel',
                        style: 'cancel',
                      },
                      {
                        text: 'Open Settings',
                        onPress: openAppSettings,
                      },
                    ]
                  );            }
        }
        else {
            let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images', 'videos'],
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
        }
        
      };

    return (
        <View className="p-5 flex-col flex h-full relative items-center justify-start gap-5">
            
            {image ? <>
            <Text className="underline font-medium">preview</Text>
            <Image source={{uri:image}} style={styles.image} className='rounded-md' />
            <Text onPress={()=>setImage(null)}>undo</Text>
            </>
            :
            <>
            <Text className="text-center px-24 mb-5 mt-20 text-yellow-500 text-sm leading-3">*Add images describing your blog. please upload square fit images</Text>
            <Pressable onPress={pickImage} className="shadow-lg shadow-gray-300 p-5 rounded-lg" style={styles.addimgdiv}>
                <MaterialCommunityIcons name="image-plus" size={194} color="#E3CCCC" />
                <Text className="text-[#E3CCCC] text-center">click to add images</Text>
            </Pressable>
            </>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    addimgdiv:{
        boxShadow:'0px 0px 4px silver'
    },
    image: {
        width: 300,
        height: 300,
      },
})