module.exports = {
	presets: ['module:@react-native/babel-preset'],
	plugins: [
		'@babel/plugin-transform-export-namespace-from',
		'react-native-worklets/plugin',
		[
			'module-resolver',
			{
				root: ['./src'],
				extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
				alias: {
					'@components': './src/components',
					'@': './src',
					tests: './tests',
				},
			},
		],
	],
};
