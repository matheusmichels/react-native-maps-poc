import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInputProps, View } from 'react-native';
import {
  NativeViewGestureHandlerProperties,
  TextInput,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/EvilIcons';

export type SearchProps = NativeViewGestureHandlerProperties &
  TextInputProps & { onSearch(text: string): void };

export default function Search({ onSearch, ...props }: SearchProps) {
  const [text, setText] = useState<string>('');

  useEffect(() => {
    // debouncing text change
    const timer = setTimeout(() => onSearch(text), 500);
    return () => clearTimeout(timer);
  }, [text]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={(value) => setText(value)}
        autoCorrect={false}
        {...props}
      ></TextInput>

      <Icon name="search" size={30} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    height: 50,
    width: '70%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 5,
  },
  input: {
    height: '100%',
    width: '100%',
    fontSize: 20,
    paddingHorizontal: 10,
    marginRight: 5,
    backgroundColor: '#fff',
  },
});
