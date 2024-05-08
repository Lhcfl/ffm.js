import { Marked } from "marked";
import extensions from "./extensions/index.js";
import { convert as _c } from "./converter/converter.js";

const parser = new Marked();

parser.use({
	breaks: true,
});
parser.use(...extensions);

export default parser;

export type * from "./types/index.js";

export const convert = _c;
