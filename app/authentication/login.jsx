import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { router } from 'expo-router';
import { useUserContext } from '@/hooks/useCurrentUser';


const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const {setCurrentUser} = useUserContext()

  const handleLogin = async() => {
    
    console.log('Email:', email, 'Password:', password);
    if (!email.includes('@') || !email.includes('.')) {
        setEmailError('Please enter a valid email address.');
        return;
      }
      
      setEmailError('');

      const response = await axios.post(`${process.env.EXPO_PUBLIC_BASE_URL}/login`, {email: email.toLocaleLowerCase(), password})
      console.log(response.data)
      if(response.data.status !== 'authenticated'){
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
      <Text className="text-2xl font-bold text-black mb-5">Login</Text>
      <TextInput
        className={`w-full p-3 border border-gray-300 rounded-lg ${emailError ? 'mb-0' : 'mb-4'}`}
        placeholder="Email"
        keyboardType="email-address"
        inputMode='email'
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
        onPress={handleLogin}
      >
        <Text className="text-white font-semibold">Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/authentication/register')} className="mt-4">
        <Text className="text-violet-500 font-semibold">Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
