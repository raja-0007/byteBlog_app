import { View, Text, Pressable, StyleSheet, Image, Alert, Linking, Platform } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';

export default function AddImage({image, setImage, setActive}) {
    const [mediaPermission, requestMediaPermission] = ImagePicker.useMediaLibraryPermissions();
    
    const openAppSettings = () => {
        if (Platform.OS === 'ios') {
            Linking.openURL('app-settings:');
        } else {
            Linking.openSettings();
        }
    };

    const pickImage = async () => {
        try {
            if(!mediaPermission?.granted) {
                const permissions = await requestMediaPermission();
                console.log(permissions);
                
                if(!permissions.granted) {
                    if(!permissions.canAskAgain) {
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
                        );
                    }
                    return;
                }
            }
            
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });
    
            console.log(result);
    
            if (!result.canceled) {
                setImage(result.assets[0].uri);
            }
        } catch (error) {
            console.error('Error picking image:', error);
            Alert.alert('Error', 'Failed to pick image. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            {image ? (
                <View style={styles.previewContainer}>
                    <View style={styles.previewCard}>
                        <Text style={styles.previewTitle}>Image Preview</Text>
                        <Image source={{uri:image}} style={styles.image} />
                        <View style={styles.buttonRow}>
                            <Pressable 
                                onPress={pickImage}
                                style={styles.changeButton}
                            >
                                <MaterialIcons name="edit" size={20} color="white" />
                                <Text style={styles.changeButtonText}>Change</Text>
                            </Pressable>
                            <Pressable 
                                onPress={()=>setImage(null)}
                                style={styles.removeButton}
                            >
                                <MaterialIcons name="delete-outline" size={20} color="#4b5563" />
                                <Text style={styles.removeButtonText}>Remove</Text>
                            </Pressable>
                        </View>
                    </View>
                    
                    {/* Next Step Button */}
                    <View style={styles.nextStepContainer}>
                        <View style={styles.divider} />
                        <Pressable 
                            onPress={() => {
                                // This will be passed from parent to switch tabs
                                if (typeof setActive === 'function') {
                                    setActive('text');
                                }
                            }}
                            style={styles.nextButton}
                        >
                            <MaterialIcons name="article" size={24} color="white" />
                            <Text style={styles.nextButtonText}>Add Content & Publish</Text>
                            <MaterialIcons name="arrow-forward" size={24} color="white" />
                        </Pressable>
                        <Text style={styles.nextStepHint}>
                            Image added! Now add your blog content to publish
                        </Text>
                    </View>
                </View>
            ) : (
                <View style={styles.uploadContainer}>
                    <View style={styles.infoBox}>
                        <MaterialIcons name="info-outline" size={24} color="#f97316" />
                        <Text style={styles.infoText}>
                          Upload a square image (1:1 ratio) for best results
                        </Text>
                    </View>
                    
                    <Pressable 
                        onPress={pickImage} 
                        style={styles.uploadCard}
                    >
                        <View style={styles.iconCircle}>
                            <MaterialCommunityIcons name="image-plus" size={80} color="#f97316" />
                        </View>
                        <Text style={styles.uploadTitle}>Add Cover Image</Text>
                        <Text style={styles.uploadSubtitle}>
                          Click to select an image from your gallery
                        </Text>
                    </Pressable>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        flex: 1,
        backgroundColor: '#f9fafb',
        alignItems: 'center',
        justifyContent: 'center',
    },
    previewContainer: {
        width: '100%',
        alignItems: 'center',
    },
    previewCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        width: '100%',
        maxWidth: 400,
    },
    previewTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: 16,
        textAlign: 'center',
    },
    image: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: 12,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 16,
    },
    changeButton: {
        flex: 1,
        backgroundColor: '#f97316',
        paddingVertical: 12,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    changeButtonText: {
        color: 'white',
        fontWeight: '600',
    },
    removeButton: {
        flex: 1,
        backgroundColor: '#e5e7eb',
        paddingVertical: 12,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    removeButtonText: {
        color: '#4b5563',
        fontWeight: '600',
    },
    nextStepContainer: {
        width: '100%',
        maxWidth: 400,
        marginTop: 32,
        alignItems: 'center',
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: '#e5e7eb',
        marginBottom: 24,
    },
    nextButton: {
        backgroundColor: '#10b981',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        width: '100%',
        shadowColor: '#10b981',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    nextButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    nextStepHint: {
        marginTop: 12,
        color: '#6b7280',
        fontSize: 14,
        textAlign: 'center',
    },
    uploadContainer: {
        width: '100%',
        alignItems: 'center',
    },
    infoBox: {
        backgroundColor: '#fff7ed',
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: '#fdba74',
        borderRadius: 16,
        padding: 24,
        marginBottom: 16,
        alignItems: 'center',
    },
    infoText: {
        textAlign: 'center',
        color: '#ea580c',
        fontSize: 14,
        marginTop: 8,
        lineHeight: 20,
    },
    uploadCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 32,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        alignItems: 'center',
        width: '100%',
        maxWidth: 400,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    iconCircle: {
        backgroundColor: '#fed7aa',
        borderRadius: 100,
        padding: 24,
        marginBottom: 16,
    },
    uploadTitle: {
        color: '#1f2937',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 8,
    },
    uploadSubtitle: {
        color: '#6b7280',
        textAlign: 'center',
        fontSize: 14,
    },
})
