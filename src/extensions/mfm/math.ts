import type { TokenizerAndRendererExtension } from "marked";

export type TokenMfmMath = {
	type: "mfm-math-block" | "mfm-math-inline";
	raw: string;
	code: string;
};

const mfmMathBlock: TokenizerAndRendererExtension = {
	name: "mfm-math-block",
	level: "block",
	start: (src) => src.match(/\\\[([\s\S]+?)\\\]/)?.index,
	tokenizer: (src, _tokens) => {
		const rule = /^\\\[([\s\S]+?)\\\]/;
		const match = rule.exec(src);
		if (match) {
			return {
				type: "mfm-math-block",
				raw: match[0],
				code: match[1],
			};
		}
		return undefined;
	},
	renderer: (token) => `$$${token.code}$$`,
};

const mfmMathInline: TokenizerAndRendererExtension = {
	name: "mfm-math-inline",
	level: "inline",
	start: (src) => src.match(/\\\(([\s\S]+?)\\\)/)?.index,
	tokenizer: (src, _tokens) => {
		const match = /^\\\(([\s\S]+?)\\\)/.exec(src);
		if (match) {
			return {
				type: "mfm-math-inline",
				raw: match[0],
				code: match[1],
			};
		}
		return undefined;
	},
	renderer: (token) => `$${token.code}$`,
};

export const mfmMath = [mfmMathBlock, mfmMathInline];
