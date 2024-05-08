import type { TokenizerAndRendererExtension } from "marked";

const reg = /#([^( \u3000\t.,!?'"，！？‘’“”#:\/\[\]【】()「」（）<>)]+)/;
const rule = RegExp("^" + reg.source);

export type TokenMfmHashtag = {
	type: "mfm-hashtag";
	raw: string;
	text: string;
};

export const mfmHashtag: TokenizerAndRendererExtension = {
	name: "mfm-hashtag",
	level: "inline",
	start: (src) => src.match(reg)?.index,
	tokenizer: (src, _tokens) => {
		const match = rule.exec(src);
		if (match) {
			return {
				type: "mfm-hashtag",
				raw: match[0],
				text: match[1],
			};
		}
		return undefined;
	},
	renderer: (token) => token.raw,
};
