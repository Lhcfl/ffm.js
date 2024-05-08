import type { Token, TokenizerAndRendererExtension } from "marked";

export type TokenMfmFn = {
	type: "mfm-fn";
	tag: "string";
	tokens: Token[];
};

export const mfmFn: TokenizerAndRendererExtension = {
	name: "mfm-fn",
	level: "inline",
	start(src) {
		return src.match(/\$\[/)?.index;
	},
	tokenizer(src, _tokens) {
		const rule = /^\$\[([^ ]+) /;
		const match = rule.exec(src);
		if (!match) return undefined;

		const MAX_LEVEL = 20;
		let i = 0;
		let overflow = false;
		let level = 0;
		const position: number[] = [];

		let ignoreInCode = false;
		while (level > 0 || i === 0) {
			if (i >= src.length) {
				return {
					type: "text",
					raw:
						position.length > 0
							? src.slice(0, position[position.length - 1])
							: src,
					text: "",
				};
			}
			if (src[i] === "`") {
				ignoreInCode = !ignoreInCode;
			} else if (src[i] + src[i + 1] === "$[" && !ignoreInCode) {
				if (position.length > MAX_LEVEL) {
					overflow = true;
				} else {
					level++;
				}
				position.push(i + 2);
				i++;
			} else if (src[i] === "]" && !ignoreInCode) {
				position.pop();
				level--;
			}
			i++;
		}

		if (overflow) {
			const ret = src.slice(0, position[position.length - 1]);
			return {
				type: "text",
				state: "overflowed",
				raw: ret,
				text: "",
			};
		}

		// const raw = src.slice(0, i);
		const tag = match[1];
		const text = src.slice(2 + tag.length + 1, i - 1);

		const token = {
			type: "mfm-fn",
			// not a good idea
			raw: { length: text.length + 2 + tag.length + 1 } as string,
			tag,
			tokens: [],
		};

		this.lexer.inline(text, token.tokens);
		return token;
	},
	renderer(token) {
		return `<span class="mfm mfm-fn _mfm_${
			token.tag
		}_">${this.parser.parseInline(token.tokens!)}</span>`;
	},
};
