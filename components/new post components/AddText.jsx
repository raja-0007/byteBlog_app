import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native'
import React from 'react'

export default function AddText({ postData, setPostData, submitHandler }) {
  
  const changeHandler = (e, label) => {
    setPostData({ ...postData, [label]: e.nativeEvent.text });
  };

  return (
    <View className="px-6 py-8 bg-gray-50 flex h-full flex-col items-center">
      
      {/* Header */}
      <Text className="text-center text-gray-600 text-sm leading-5 mb-4">
        ✨ Fill in the details for your blog post. 
      </Text>

      {/* Title Input */}
      <TextInput
        value={postData.title}
        onChange={(e) => changeHandler(e, 'title')}
        placeholder="Enter Blog Title"
        className="border border-gray-300 rounded-lg p-4 mb-3 h-14 w-full shadow-sm bg-white text-gray-700"
      />

      {/* Caption Input */}
      <TextInput
        multiline
        style={styles.textInput}
        value={postData.caption}
        onChange={(e) => changeHandler(e, 'caption')}
        placeholder="Write a caption..."
        className="border border-gray-300 rounded-lg p-4 h-16 w-full shadow-sm bg-white text-gray-700"
      />

      {/* Blog Content Section */}
      <View className="w-full p-4 rounded-lg bg-white shadow-sm mt-4 border border-gray-200">
        <Text className="text-gray-600 text-base font-medium mb-3">📖 Blog Content</Text>

        {/* Description Input */}
        <TextInput
          multiline
          style={styles.textInput}
          value={postData.description}
          onChange={(e) => changeHandler(e, 'description')}
          placeholder="Short description about your blog..."
          className="border border-gray-300 rounded-lg p-4 mb-4 h-20 w-full bg-gray-50 text-gray-700"
        />

        {/* Content Input */}
        <TextInput
          multiline
          style={[styles.textInput, { height: 250 }]}
          value={postData.content}
          onChange={(e) => changeHandler(e, 'content')}
          placeholder="Start writing your blog here..."
          className="border border-gray-300 rounded-lg p-4 w-full bg-gray-50 text-gray-700"
        />
      </View>

      {/* Submit Button */}
      <Pressable 
        className="mt-6 bg-orange-500 p-4 rounded-lg w-36 flex items-center shadow-md active:bg-orange-600"
        onPress={submitHandler}
      >
        <Text className="text-white font-semibold text-lg">Post</Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    textAlignVertical: 'top',
  },
});
