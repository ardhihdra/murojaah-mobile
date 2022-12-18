import { StyleSheet } from "react-native"

export const mainFont = {
	primary: 'open-sans',
	primaryBold: 'open-sans-bold',
}

export const mainBorder = {
	borderWidth: 1,
	borderRadius: 50,
	borderColor: '#ccc',
}

export const mainColor = {
	primary: '#116530',
	secondary: '#18A558',
	tertiary: '#21B6A8',
	primaryLight: '#d9ffe7',
	neon: '#A3EBB1',
	white: '#FFFFFF',
	black: '#100F0F',
	misty: '#C3CEDA',
	blueGray: '#738FA7',
	darkGreen: '#0F3D3E',
	yellow: '#ECF87F',
	darkGrey: '#404452',
	primary100: '#f9beda',
  primary500: '#c30b64',
  primary800: '#610440',
  error100: '#fcdcbf',
  error500: '#f37c13',
}

export const buttonPressed = {
	opacity: .25
}

export const mainShadow = {
	elevation: 2,
	shadowColor: 'black',
	shadowOpacity: .25,
	shadowOffset: { width: 0, height: 1 },
	shadowRadius: 2,
}

export const mainSpace = {
	m: {margin: 8},
	mLg: {margin: 16},
	mr: {marginRight: 8},
	mrLg: {marginRight: 16},
	mx: {marginRight:8, marginLeft:8},
	mxLg: {marginRight:16, marginLeft:16}
}

const mainStyles = StyleSheet.create({
	textInput: {
		...mainBorder,
		padding: 12,
	},
	heading: {
		fontSize: 28,
		fontWeight: '600',
		fontFamily: mainFont.primaryBold
	},
	buttonPressed
})

export default mainStyles