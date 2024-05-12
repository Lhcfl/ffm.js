import type { TokenizerAndRendererExtension } from "marked";

const reg = /^([^\n]+?)\s+(検索|\[検索\]|\[search\])\s*($|\n)/;

export type TokenMfmSearch = {
	type: "mfm-search";
	raw: string;
	text: string;
};

export const mfmSearch: TokenizerAndRendererExtension = {
	name: "mfm-search",
	level: "block",
	start: (src) => src.match(reg)?.index,
	tokenizer: (src, _tokens): TokenMfmSearch | undefined => {
		const match = reg.exec(src);
		if (match) {
			console.log(src);
			const text = match[1].trim();
			if (!text) return undefined;
			return {
				type: "mfm-search",
				raw: match[0],
				text,
			};
		}
		return undefined;
	},
	renderer: (token) => token.raw,
};
