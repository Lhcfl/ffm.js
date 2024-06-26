import { Marked } from "marked";
import extensions from "./extensions/index.js";
import { convert as _c } from "./converter/converter.js";

export const parser = new Marked();

parser.use({
	breaks: true,
});
parser.use(...extensions);

export type * from "./types/index.js";

/**
 * Convert Marked.lexer result to MFM ast tree
 */
export const convert = _c;

/**
 * Raw extensions.
 * usage:
 * ```
 * marked.use(...FfmExtension);
 * ```
 */
export const FfmExtension = extensions;

/**
 * MFM Plain is special. It is neither an inline element nor a block element.
 * It simply skips the parsing of the middle part.
 * Therefore, we must preprocess it and escape line breaks
 * In this way we can safely parse it as an inline element
 */
function handleMfmPlain(text: string) {
	if (text.match(/<plain>/) == null) return text;
	return text.replaceAll(
		/<plain>([\s\S]*?)<\/plain>/g,
		(_, content) => `<plain>${JSON.stringify(content)}</plain>`,
	);
}

/**
 * Parse MfM text to MfM AST tree
 * @param text
 * @returns
 */
export function parse(text: string) {
	return convert(parser.lexer(handleMfmPlain(text)));
}
