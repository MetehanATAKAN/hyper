// const StyleDictionary = require('style-dictionary');

// // You can use the .registerParser() method like this
// StyleDictionary.registerParser({
//     type: 'value',
//     transitive: true,
//     name: 'figma/web/flatten-properties',
//     matcher: ({ type }) => {
//         return ['typography', 'composition'].includes(type);
//     },
//     transformer: ({ value, name, type }) => {
//         if (!value) return;

//         const entries = Object.entries(value);

//         const flattendedValue = entries.reduce(
//             (acc, [key, v], index) =>
//                 `${acc ? `${acc}\n  ` : ''}--${name}-${StyleDictionary.transform['name/cti/kebab'].transformer(
//                     { path: [key] },
//                     { prefix: '' }
//                 )}: ${v}${index + 1 === entries.length ? '' : ';'}`,
//             `${name.includes(type) ? '' : `${type}-`}${name}-group;`
//         );

//         return flattendedValue;
//     },
//     // pattern: /\.json$/,
//     // parse: ({ contents, filePath }) => {
//     //     // Probably a good idea to wrap this in a try/catch block
//     //     try {
//     //         const object = JSON.parse(contents);
//     //         // You can now perform any modifications to the file content
//     //         // or perform any side-effects based on the file

//     //         // Here we are going to grab the filepath and turn it into a prefix.
//     //         // tokens/color/core.json will become 'color-core'. We will append this
//     //         // to all token names.
//     //         const pathParts = filePath
//     //             .replace(__dirname + '/tokens/', '')
//     //             .replace('.json', '')
//     //             .split('/')
//     //             .join('-');

//     //         console.log('----------------------------------------------', pathParts);
//     //         const output = {};

//     //         for (const key in object) {
//     //             console.log('-------------------KEY---------------------------', key);
//     //             console.log('-------------------object---------------------------', object);
//     //             if (object.hasOwnProperty(key)) {
//     //                 console.log('------------------TRUE---------------------------');
//     //                 const element = object[key];
//     //                 output[`${pathParts}-${key}`] = element;
//     //             }
//     //         }

//     //         return output;
//     //     } catch (error) {
//     //         console.log(error);
//     //     }
//     // },
// });

// // Or you can add parsers directly on the configuration object here like this:
// // StyleDictionary.extend({
// //   parsers: [{
// //     pattern: /\.json$/,
// //     parse: ({contents, filePath}) => {}
// //   }],
// //   source: [`tokens/**/*.json`],
// //   platforms: {
// //     css: {
// //       transformGroup: 'css',
// //       buildPath: 'build/',
// //       files: [{
// //         destination: 'variables.css',
// //         format: 'css/variables'
// //       }]
// //     }
// //   }
// // }).buildAllPlatforms();

// module.exports = {
//     // Or you can add parsers directly on the configuration object here like this:
//     // parsers: [{
//     //   pattern: /\.json$/,
//     //   parse: ({contents, filePath}) => {}
//     // }],
//     source: ['./src/style-dictionary/properties/**/*.json'],
//     platforms: {
//         scss: {
//             transformGroup: 'scss',
//             buildPath: './src/style2-dictionary-dist/',
//             files: [
//                 {
//                     destination: '_colors.scss',
//                     format: 'scss/variables',
//                     filter: {
//                         type: 'color',
//                     },
//                 },
//                 {
//                     destination: '_shadows.scss',
//                     format: 'scss/variables',
//                     filter: {
//                         type: 'boxShadow',
//                     },
//                 },
//                 {
//                     destination: '_fontFamilies.scss',
//                     format: 'scss/variables',
//                     filter: {
//                         type: 'fontFamilies',
//                     },
//                 },
//                 {
//                     destination: '_lineHeights.scss',
//                     format: 'scss/variables',
//                     filter: {
//                         type: 'lineHeights',
//                     },
//                 },
//                 {
//                     destination: '_fontWeights.scss',
//                     format: 'scss/variables',
//                     filter: {
//                         type: 'fontWeights',
//                     },
//                 },
//                 {
//                     destination: '_fontSizes.scss',
//                     format: 'scss/variables',
//                     filter: {
//                         type: 'fontSizes',
//                     },
//                 },
//                 {
//                     destination: '_sizes.scss',
//                     format: 'scss/variables',
//                     filter: {
//                         type: 'sizing',
//                     },
//                 },
//                 {
//                     destination: '_typography.scss',
//                     format: 'scss/variables',
//                     filter: {
//                         type: 'typography',
//                     },
//                 },
//                 {
//                     destination: '_textCase.scss',
//                     format: 'scss/variables',
//                     filter: {
//                         type: 'textCase',
//                     },
//                 },
//                 {
//                     destination: '_textDecoration.scss',
//                     format: 'scss/variables',
//                     filter: {
//                         type: 'textDecoration',
//                     },
//                 },
//                 {
//                     destination: '_borderRadius.scss',
//                     format: 'scss/variables',
//                     filter: {
//                         type: 'borderRadius',
//                     },
//                 },
//                 {
//                     destination: '_borderWidth.scss',
//                     format: 'scss/variables',
//                     filter: {
//                         type: 'borderWidth',
//                     },
//                 },
//                 {
//                     destination: '_opacity.scss',
//                     format: 'scss/variables',
//                     filter: {
//                         type: 'opacity',
//                     },
//                 },
//                 {
//                     destination: '_spacing.scss',
//                     format: 'scss/variables',
//                     filter: {
//                         type: 'spacing',
//                     },
//                 },
//             ],
//         },
//     },
// };
const SD = require('style-dictionary');
const { dtcgParser } = require('./parser');
const { attributeCti, typeCubicBezier, typeFontFamily } = require('./transforms');

['scss'].forEach((name) => {
    // Replace "attribute/cti" with custom
    const attributeCtiTransformIndex = SD.transformGroup[name].findIndex((v) => v === 'attribute/cti');
    SD.transformGroup[name].splice(attributeCtiTransformIndex, 1, 'dtcg/attribute/cti');

    // Append custom transforms
    SD.transformGroup[name] = [...SD.transformGroup[name], 'dtcg/type/css/cubicBezier', 'dtcg/type/css/fontFamily'];
});

module.exports = {
    parsers: [dtcgParser],
    transform: {
        [attributeCti.name]: attributeCti,
        [typeCubicBezier.name]: typeCubicBezier,
        [typeFontFamily.name]: typeFontFamily,
    },
    source: [`./src/style-dictionary/properties/**/*.json`],
    platforms: {
        scss: {
            transformGroup: 'scss',
            buildPath: './src/style2-dictionary-dist/',
            files: [
                {
                    destination: '_colors.scss',
                    format: 'scss/variables',
                    filter: {
                        type: 'color',
                    },
                },
                {
                    destination: '_shadows.scss',
                    format: 'scss/variables',
                    filter: {
                        type: 'boxShadow',
                    },
                },
                {
                    destination: '_fontFamilies.scss',
                    format: 'scss/variables',
                    filter: {
                        type: 'fontFamilies',
                    },
                },
                {
                    destination: '_lineHeights.scss',
                    format: 'scss/variables',
                    filter: {
                        type: 'lineHeights',
                    },
                },
                {
                    destination: '_fontWeights.scss',
                    format: 'scss/variables',
                    filter: {
                        type: 'fontWeights',
                    },
                },
                {
                    destination: '_fontSizes.scss',
                    format: 'scss/variables',
                    filter: {
                        type: 'fontSizes',
                    },
                },
                {
                    destination: '_sizes.scss',
                    format: 'scss/variables',
                    filter: {
                        type: 'sizing',
                    },
                },
                {
                    destination: '_typography.scss',
                    format: 'scss/variables',
                    filter: {
                        type: 'typography',
                    },
                },
                {
                    destination: '_textCase.scss',
                    format: 'scss/variables',
                    filter: {
                        type: 'textCase',
                    },
                },
                {
                    destination: '_textDecoration.scss',
                    format: 'scss/variables',
                    filter: {
                        type: 'textDecoration',
                    },
                },
                {
                    destination: '_borderRadius.scss',
                    format: 'scss/variables',
                    filter: {
                        type: 'borderRadius',
                    },
                },
                {
                    destination: '_borderWidth.scss',
                    format: 'scss/variables',
                    filter: {
                        type: 'borderWidth',
                    },
                },
                {
                    destination: '_opacity.scss',
                    format: 'scss/variables',
                    filter: {
                        type: 'opacity',
                    },
                },
                {
                    destination: '_spacing.scss',
                    format: 'scss/variables',
                    filter: {
                        type: 'spacing',
                    },
                },
            ],
        },
    },
};
