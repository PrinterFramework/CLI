"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatName = void 0;
function formatName(_fileName) {
    var fileName = _fileName.replaceAll('.ts', '').replaceAll('.tsx', '').replaceAll('[', '').replaceAll(']', '');
    var name = fileName;
    if (fileName.indexOf('.') !== -1) {
        name = fileName.split('.').map(function (word) { return word[0].toUpperCase() + word.substring(1); }).join('');
    }
    else if (fileName.indexOf('-') !== -1) {
        name = fileName.split('-').map(function (word) { return word[0].toUpperCase() + word.substring(1); }).join('');
    }
    else {
        name = name[0].toUpperCase() + name.substring(1);
    }
    return name;
}
exports.formatName = formatName;
//# sourceMappingURL=nomenclature.js.map