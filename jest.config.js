module.exports = {
   moduleNameMapper: {
      '.jest/(.*)$': '<rootDir>/.jest/$1',
   },
   moduleFileExtensions: [
      'js',
      'ts',
      'vue',
   ],
   transform: {
      '^.+\\.jsx?$': 'babel-jest',
      '^.*\\.vue$': 'vue-jest',
      '^.+\\.tsx?$': 'ts-jest',
   },
   testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
};
