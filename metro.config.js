const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add support for .js, .jsx, .ts, .tsx extensions
config.resolver.sourceExts.push('js', 'jsx', 'ts', 'tsx');

module.exports = config;
