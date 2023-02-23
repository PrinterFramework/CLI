"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findMatches = exports.typeMatcher = exports.actionMatcher = exports.selectorMatcher = exports.functionMatcher = exports.effectMatcher = exports.stateMatcher = exports.superagentMatcher = exports.BraceMatcher2 = exports.BraceMatcher = exports.DispatchMatcher = exports.ReduxOptionalMatcher = exports.ReduxMatcher = exports.ImportMatcher = exports.SliceMatcher = void 0;
exports.SliceMatcher = /^(?=.*export)(?=.*createSlice).*$/gmi;
exports.ImportMatcher = /^(?=.*import)(?=.*from).*$/gmi;
exports.ReduxMatcher = /^(?=.*import)(?=.*from)(?=.*useSelector)(?=.*useDispatch).*$/gmi;
exports.ReduxOptionalMatcher = /^(?=.*import)(?=.*from)(?=.*useSelector|useDispatch).*$/gmi;
exports.DispatchMatcher = /^(?=.*const)(?=.*dispatch)(?=.*useDispatch).*$/gmi;
exports.BraceMatcher = /^(?=.*\[).*$/gmi;
exports.BraceMatcher2 = /^(?=.*{).*$/gmi;
function superagentMatcher(type) {
    return new RegExp("^(?=.*import)(?=.*".concat(type, ")(?=.*from).*$"), 'gmi');
}
exports.superagentMatcher = superagentMatcher;
function stateMatcher() {
    return new RegExp('^(?=.*import)(?=.*useState)(?=.*from).*$', 'gmi');
}
exports.stateMatcher = stateMatcher;
function effectMatcher() {
    return new RegExp('^(?=.*import)(?=.*useEffect)(?=.*from).*$', 'gmi');
}
exports.effectMatcher = effectMatcher;
function functionMatcher(name) {
    return new RegExp("^(?=.*function)(?=.*".concat(name, ").*$"), 'gmi');
}
exports.functionMatcher = functionMatcher;
function selectorMatcher(name) {
    return new RegExp("^(?=.*".concat(name, " =)(?=.*useSelector).*$"), 'gmi');
}
exports.selectorMatcher = selectorMatcher;
function actionMatcher(name) {
    return new RegExp("^(?=.*import)(?=.*".concat(name.join('|'), ")(?=.*from).*$"), 'gmi');
}
exports.actionMatcher = actionMatcher;
function typeMatcher(name) {
    return new RegExp("^(?=.*import)(?=.*".concat(name, ")(?=.*from).*$"), 'gmi');
}
exports.typeMatcher = typeMatcher;
function findMatches(text, pattern) {
    var matchingLines = [];
    var allLines = text.split('\n');
    for (var i = 0; i < allLines.length; i++) {
        if (allLines[i].match(pattern)) {
            matchingLines.push(i);
        }
    }
    return matchingLines;
}
exports.findMatches = findMatches;
//# sourceMappingURL=match.js.map