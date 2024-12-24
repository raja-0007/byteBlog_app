import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import axios from 'axios';
import { useUserContext } from '@/hooks/useCurrentUser';


const Register = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState(''); // Added state for username
    const { setCurrentUser } = useUserContext()
    const [emailError, setEmailError] = useState('');


    const handleRegister = async () => {
        console.log('Email:', email, 'Password:', password);
        if (!email.includes('@') || !email.includes('.')) {
            setEmailError('Please enter a valid email address.');
            return;
        }

        setEmailError('');

        const response = await axios.post(`${process.env.EXPO_PUBLIC_BASE_URL}/signup`, { email: email.toLocaleLowerCase(), password })
        console.log(response.data)
        if (response.data.status !== 'signup successful') {
            alert(response.data.status)
        }
        else {
            console.log(response.data)
            setCurrentUser(response.data)
            router.replace('(tabs)')
        }
    };

    return (
        <View className="flex-1 justify-center items-center px-5 bg-white">
            <Text className="text-2xl font-bold text-black mb-5">Register</Text>
            <TextInput
                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                className={`w-full p-3 border border-gray-300 rounded-lg ${emailError ? 'mb-0' : 'mb-4'}`}
                placeholder="Email"
                keyboardType="email-address"
                value={email.toLocaleLowerCase()}
                onChangeText={setEmail}
            />
            {emailError ? <Text className="text-red-500 mb-4 mt-0 p-0 text-sm">{emailError}</Text> : null}

            <TextInput
                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity
                className="w-full bg-orange-500 p-4 rounded-lg items-center"
                onPress={handleRegister}
            >
                <Text className="text-white font-semibold">Register</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/authentication/login')} className="mt-4">
                <Text className="text-violet-500 font-semibold">Already have an account? Login</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Register;
