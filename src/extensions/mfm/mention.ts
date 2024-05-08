import type { TokenizerAndRendererExtension } from "marked";

const reg = /@([a-zA-Z0-9_.\-]+)(@([a-zA-Z0-9_.\-]+))?/;
const rule = RegExp("^" + reg.source);

export type TokenMfmMention = {
	type: "mfm-mention";
	raw: string;
	username: string;
	host: string | null;
};

export const mfmMention: TokenizerAndRendererExtension = {
	name: "mfm-mention",
	level: "inline",
	start: (src) => src.match(reg)?.index,
	tokenizer: (src, _tokens) => {
		const match = rule.exec(src);
		if (match) {
			return {
				type: "mfm-mention",
				raw: match[0],
				username: match[1],
				host: match[3],
			};
		}
		return undefined;
	},
	renderer: (token) => token.raw,
};
