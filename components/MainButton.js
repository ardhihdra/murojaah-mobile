import { Pressable, StyleSheet, Text, View } from 'react-native';

import { mainColor, mainShadow } from '@styles/Main.styles';

function MainButton({ flat, children, onPress, disabled, style, color }) {
  let colorStyle = flat ?
    { backgroundColor: 'transparent', borderWidth:2, borderColor: color || 'black' }
    :{ backgroundColor: disabled ? mainColor.grey: color || mainColor.secondary }

  return (
    <Pressable
      android_ripple={{ color: '#ccc' }}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        colorStyle,
        !flat && mainShadow,
        style || {}
      ]}
      onPress={disabled ? () => null: onPress}
    >
      <View>
        <Text style={flat ? [styles.buttonFlatText,color && {color}]: styles.buttonText}>
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
    paddingVertical: 10,
    paddingHorizontal: 12,
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
