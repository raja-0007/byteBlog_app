import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import axios from 'axios';
import { useUserContext } from '@/hooks/useCurrentUser';
import { LinearGradient } from 'expo-linear-gradient';

const Register = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const { setCurrentUser } = useUserContext();
    const [emailError, setEmailError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async () => {
        if (!email.includes('@') || !email.includes('.')) {
            setEmailError('Please enter a valid email address.');
            return;
        }

        setEmailError('');
        setIsLoading(true);

        try {
            const response = await axios.post(`${process.env.EXPO_PUBLIC_BASE_URL}/signup`, { 
                username: username.toLowerCase(), 
                email: email.toLowerCase(), 
                password 
            });
            
            console.log(response.data);
            
            if (response.data.status !== 'signup successful') {
                alert(response.data.status);
            } else {
                console.log(response.data);
                setCurrentUser(response.data);
                router.replace('(tabs)');
            }
        } catch (error) {
            alert('Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1"
        >
            <ScrollView 
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View className="flex-1 justify-center items-center px-6">
                    <LinearGradient
                        colors={['#FFFFFF', '#FFF0F5', '#FFE4E1', '#FFDAB9']}
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            height: '100%',
                            zIndex: -1,
                        }}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                    />
                    
                    {/* Header Section */}
                    <View className="mb-10 items-center">
                        <Text className="text-4xl font-bold text-gray-800 mb-2">Create Account</Text>
                        <Text className="text-base text-gray-600">Sign up to get started</Text>
                    </View>

                    {/* Form Container */}
                    <View className="w-full max-w-md">
                        {/* Username Input */}
                        <View className="mb-5">
                            <Text className="text-sm font-semibold text-gray-700 mb-2 ml-1">Username</Text>
                            <TextInput
                                className="w-full p-4 bg-white border-2 border-gray-200 rounded-2xl shadow-sm"
                                placeholder="Choose a username"
                                placeholderTextColor="#9CA3AF"
                                autoCapitalize="none"
                                value={username.toLowerCase()}
                                onChangeText={setUsername}
                            />
                        </View>

                        {/* Email Input */}
                        <View className="mb-5">
                            <Text className="text-sm font-semibold text-gray-700 mb-2 ml-1">Email</Text>
                            <TextInput
                                className={`w-full p-4 bg-white border-2 ${
                                    emailError ? 'border-red-400' : 'border-gray-200'
                                } rounded-2xl shadow-sm`}
                                placeholder="Enter your email"
                                placeholderTextColor="#9CA3AF"
                                keyboardType="email-address"
                                inputMode='email'
                                autoCapitalize="none"
                                value={email.toLowerCase()}
                                onChangeText={setEmail}
                            />
                            {emailError && (
                                <Text className="text-red-500 mt-2 ml-1 text-sm">{emailError}</Text>
                            )}
                        </View>

                        {/* Password Input */}
                        <View className="mb-6">
                            <Text className="text-sm font-semibold text-gray-700 mb-2 ml-1">Password</Text>
                            <TextInput
                                className="w-full p-4 bg-white border-2 border-gray-200 rounded-2xl shadow-sm"
                                placeholder="Create a password"
                                placeholderTextColor="#9CA3AF"
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                            />
                        </View>

                        {/* Register Button */}
                        <TouchableOpacity
                            className={`w-full p-4 rounded-2xl items-center shadow-lg mb-4 ${
                                isLoading ? 'bg-orange-300' : 'bg-orange-500'
                            }`}
                            onPress={handleRegister}
                            disabled={isLoading}
                            activeOpacity={0.8}
                        >
                            <Text className="text-white font-bold text-lg">
                                {isLoading ? 'Creating Account...' : 'Register'}
                            </Text>
                        </TouchableOpacity>

                        {/* Divider */}
                        <View className="flex-row items-center my-6">
                            <View className="flex-1 h-px bg-gray-300" />
                            <Text className="mx-4 text-gray-500 text-sm">OR</Text>
                            <View className="flex-1 h-px bg-gray-300" />
                        </View>

                        {/* Login Link */}
                        <TouchableOpacity 
                            onPress={() => router.push('/authentication/login')} 
                            className="items-center py-3"
                            activeOpacity={0.7}
                        >
                            <Text className="text-gray-700 text-base">
                                Already have an account?{' '}
                                <Text className="text-violet-600 font-bold">Sign In</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default Register;