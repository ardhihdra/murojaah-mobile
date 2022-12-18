import { Pressable, StyleSheet, Text, View } from 'react-native';

import { mainColor } from '@styles/Main.styles';

function FlatButton({ children, onPress, color='' }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View>
        <Text
          style={[
            styles.buttonText,
            {color: color || mainColor.primaryLight}
          ]}
        >
          {children}
        </Text>
      </View>
    </Pressable>
  );
}

export default FlatButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: 'center',
  },
});
