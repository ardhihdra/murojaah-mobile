import { Pressable, StyleSheet, Text, View } from 'react-native';

import { mainColor } from '@styles/Main.styles';

function MainButton({ flat, children, onPress, disabled, style }) {
  let colorStyle = flat ?
    { backgroundColor: 'transparent' }
    :{ backgroundColor: disabled ? mainColor.grey: mainColor.secondary }

  return (
    <Pressable
      android_ripple={{ color: '#ccc' }}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        colorStyle,
        style || {}
      ]}
      onPress={disabled ? () => null: onPress}
    >
      <View>
        <Text style={flat ? [styles.buttonFlatText,]: styles.buttonText}>
          {children}
        </Text>
      </View>
    </Pressable>
  );
}

export default MainButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  buttonFlatText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
