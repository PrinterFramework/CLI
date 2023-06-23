"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SliceTemplate = void 0;
function SliceTemplate(name) {
    return "import { createSlice } from \"@reduxjs/toolkit\";\n\nexport const ".concat(name, "InitialState = {\n\n}\n\nexport const ").concat(name, "Slice = createSlice({\n    name: '").concat(name, "',\n    initialState: ").concat(name, "InitialState,\n    reducers: {\n\n    },\n});\n\nexport const { } = ").concat(name, "Slice.actions;");
}
exports.SliceTemplate = SliceTemplate;
//# sourceMappingURL=slice.js.map