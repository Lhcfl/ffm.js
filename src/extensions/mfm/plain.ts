import type { TokenizerAndRendererExtension } from "marked";

export type TokenMfmPlain = {
	type: "mfm-plain";
	raw: string;
	text: string;
};

export const mfmPlain: TokenizerAndRendererExtension = {
	name: "mfm-plain",
	level: "inline",
	start: (src) => src.match(/<plain>/)?.index,
	tokenizer: (src, _tokens) => {
		const rule = /^<plain>([\s\S]*?)<\/plain>/;
		const match = rule.exec(src);
		if (match) {
			let text = match[1];
			try {
				text = JSON.parse(match[1]);
			} catch(_e) {
				return undefined;
			}

			let l = 0;
			let r = undefined;
			if (text[0] === "\n") l = 1;
			if (text[text.length - 1] === "\n") r = -1;
			if (l !== 0 || r !== 0) {
				text = text.slice(l, r);
			} 
			return {
				type: "mfm-plain",
				raw: match[0],
				text,
			};
		}
		return undefined;
	},
	renderer: (token) => (token.text as string).replaceAll("\n", "<br>"),
};
