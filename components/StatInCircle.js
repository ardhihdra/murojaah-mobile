import { StyleSheet } from 'react-native';
import { Image, Text, View } from 'react-native';

export default function StatInCircle({
  title,
  value,
  color
}) {
  return (
    <View style={{ width: 100, height: 100, margin: 10 }}>
      <Text style={[styles.title,{color: color}]}>{title}</Text>
      <Text style={[styles.value,{color: color}]}>{value}</Text>
      <Image source={require('../assets/image/circle-calligraphy.png')} style={{width: 100, height: 100}}/>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    alignSelf: 'center',
    textAlign: 'center',
    height: 40,
    fontFamily: 'open-sans-bold'
  },
  value: {
    position: 'absolute',
    top: 76,
    left: 0,
    fontSize: 20,
    alignSelf: 'center',
    textAlign: 'center',
    width: '100%',
    fontFamily: 'open-sans-bold'
  }
})