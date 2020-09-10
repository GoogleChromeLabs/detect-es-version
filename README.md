# `detect-es-version`

<p align="center">
  <img src="https://raw.githubusercontent.com/GoogleChromeLabs/detect-es-version/master/demo.gif" alt="">
</p>

Given a package name, filepath, or string of code, returns the [ecma version](https://developer.mozilla.org/en-US/docs/Glossary/ECMAScript). You can try out the web app version [here](https://detect-es-version.glitch.me/)!

## Usage
```javascript
const { getEcmaVersion } = require('detect-es-version');
const ecmaVersion = getEcmaVersion('const foo = 123;');
console.log(ecmaVersion); // prints 2015
```

## API
### getPackageEcmaVersion(packageString, resolverOptions)
- `packageString` (`String`): A string representing a package. e.g. “react”, “react@16.13.1” to be pulled from npm.
- `resolverOptions` (`Object`): An options object to pass to [enhanced-resolve](https://github.com/webpack/enhanced-resolve#resolver-options). This can be used to control which entry points are analyzed.
- Returns (`Number`): The ecma version of the package. e.g. 2017.

### getLocalPackageEcmaVersion(packagePath, resolverOptions)
- `packagePath` (`String`): An absolute path to a package’s directory. The directory must contain an index file or package.json.
- `resolverOptions` (`Object`): An options object to pass to [enhanced-resolve](https://github.com/webpack/enhanced-resolve#resolver-options). This can be used to control which entry points are analyzed.
- Returns (`Number`): The ecma version of the package. e.g. 2017.
### getEntryPointEcmaVersion(entryPoint, resolverOptions)
- `entryPoint` (`String`): An absolute path to an entry point.
- `resolverOptions` (`Object`): An options object to pass to [enhanced-resolve](https://github.com/webpack/enhanced-resolve#resolver-options). This can be used to control which entry points are analyzed.
- Returns (`Number`): The ecma version of the package. e.g. 2017.
### getEcmaVersion(content)
- `code` (`String`|`Object`): The source code or AST to inspect
- Returns (`Number`): The ecma version of the source code or AST. e.g. 2017.
### isEcmaVersionModern(ecmaVersion)
- `ecmaVersion` (`Number`): A number representing an ECMA version. e.g.  5, 2015, or 2016
- Returns (`Boolean`): True if the ECMA version is considered modern; False otherwise
