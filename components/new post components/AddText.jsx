import { View, Text, TextInput, StyleSheet, Pressable, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function AddText({ postData, setPostData, submitHandler }) {
  
  const changeHandler = (e, label) => {
    setPostData({ ...postData, [label]: e.nativeEvent.text });
  };

  const isFormValid = postData.title.trim() && postData.description.trim() && postData.content.trim();

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="px-6 py-6 flex flex-col">
        
        {/* Header Section */}
        <View className="bg-white- rounded-2xl p- mb-6 shadow-sm- border- border-gray-100">
          <View className="flex flex-row items-center mb-3">
            <View className="bg-orange-100 rounded-full p-2 mr-3">
              <MaterialIcons name="create" size={24} color="#f97316" />
            </View>
            <View>
              <Text className="text-xl font-bold text-gray-800">Create Your Blog</Text>
              <Text className="text-sm text-gray-500">Share your thoughts with the world</Text>
            </View>
          </View>
        </View>

        {/* Title Input */}
        <View className="mb-4">
          <Text className="text-sm font-semibold text-gray-700 mb-2 ml-1">Blog Title *</Text>
          <TextInput
            value={postData.title}
            onChange={(e) => changeHandler(e, 'title')}
            placeholder="Enter an engaging title..."
            placeholderTextColor="#9ca3af"
            className="border-2 border-gray-200 rounded-xl p-4 bg-white text-gray-800 text-lg shadow-sm"
          />
        </View>

        {/* Description Input */}
        <View className="mb-4">
          <Text className="text-sm font-semibold text-gray-700 mb- ml-1">Introduction *</Text>
          <Text className="text-xs text-gray-500 mb-2 ml-1">A brief intro to hook your readers</Text>
          <TextInput
            multiline
            style={styles.textInput}
            value={postData.description}
            onChange={(e) => changeHandler(e, 'description')}
            placeholder="Write a compelling introduction that summarizes your blog..."
            placeholderTextColor="#9ca3af"
            className="border-2 border-gray-200 rounded-xl p-4 h-28 bg-white text-gray-800 shadow-sm"
          />
        </View>

        {/* Content Input */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-gray-700 mb- ml-1">Blog Content *</Text>
          <Text className="text-xs text-gray-500 mb-2 ml-1">Share your story, insights, or knowledge</Text>
          

          <TextInput
            multiline
            style={[styles.textInput, { minHeight: 300, maxHeight:350 }]}
            value={postData.content}
            onChange={(e) => changeHandler(e, 'content')}
            placeholder="Start writing your blog content here...&#10;&#10;You can write multiple paragraphs, share your experiences, provide tips, or tell your story."
            placeholderTextColor="#9ca3af"
            className="border-2 border-gray-200 rounded-xl p-4 bg-white text-gray-800 shadow-sm"
          />
        </View>

        {/* Submit Button */}
        <Pressable 
          className={`p-4 rounded-xl flex flex-row items-center justify-center gap-2 shadow-md mb-6 ${
            isFormValid ? 'bg-orange-500 active:bg-orange-600' : 'bg-gray-300'
          }`}
          onPress={submitHandler}
          disabled={!isFormValid}
        >
          <MaterialIcons name="publish" size={24} color="white" />
          <Text className="text-white font-bold text-lg">Publish Blog</Text>
        </Pressable>

        {!isFormValid && (
          <Text className="text-center text-gray-500 text-sm mb-4">
            Please fill in all required fields
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    textAlignVertical: 'top',
  },
});