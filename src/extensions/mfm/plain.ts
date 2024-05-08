import type { TokenizerAndRendererExtension } from "marked";

export type TokenMfmPlain = {
	type: "mfm-plain";
	raw: string;
	text: string;
};

export const mfmPlain: TokenizerAndRendererExtension = {
	name: "mfm-plain",
	level: "inline",
	start: (src) => src.match(/<plain>([\s\S]*?)<\/plain>/)?.index,
	tokenizer: (src, _tokens) => {
		const rule = /^<plain>([\s\S]*?)<\/plain>/;
		const match = rule.exec(src);
		if (match) {
			return {
				type: "mfm-plain",
				raw: match[0],
				text: match[1],
			};
		}
		return undefined;
	},
	renderer: (token) => (token.text as string).replaceAll("\n", "<br>"),
};
