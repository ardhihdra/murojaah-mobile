// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.assetExts.push('cjs');
defaultConfig.resolver.sourceExts.push('cjs');
defaultConfig.resolver.sourceExts.push('json');
defaultConfig.resolver.sourceExts.push('js');
defaultConfig.resolver.sourceExts.push('jsx');
defaultConfig.resolver.sourceExts.push('ts');
defaultConfig.resolver.sourceExts.push('tsx');
defaultConfig.resolver.sourceExts.push('png');

module.exports = defaultConfig;