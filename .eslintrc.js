module.exports = {
"parser": 'babel-eslint',
"env": {
    "browser": true,
    "commonjs": true,
     "es6":true
},
"extends":["eslint:recommended"],
"parserOptions":{
    "ecmadeatures":{
        "experementalObjectRestSpread":true,
        "jsx":true
    },
    "sourceType": "module"
},
"rules": {
    "indent":["error",2],
    "linebreak-style":["error", "unix"],
    "quotes":["error", "single"],
    "semi": ["error", "alway"],
    "no-console": ["warn", {"allow":["info", "error"]}]
}
};