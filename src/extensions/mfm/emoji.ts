import type { TokenizerAndRendererExtension } from "marked";
import emojiRegex from "emoji-regex";

const EmojiRegex = RegExp(emojiRegex().source);
const EmojiRegexStart = RegExp(`^(${emojiRegex().source})`);

export type TokenMfmEmojiCode = {
	type: "mfm-emoji-code";
	raw: string;
	code: string;
};
export type TokenMfmUnicodeEmoji = {
	type: "mfm-unicode-emoji";
	raw: string;
};

const mfmEmojiCode: TokenizerAndRendererExtension = {
	name: "mfm-emoji-code",
	level: "inline",
	start: (src) => src.match(/:([a-zA-Z0-9_+-]+):/)?.index,
	tokenizer: (src, _tokens) => {
		const rule = /^:([a-zA-Z0-9_+-]+):/;
		const match = rule.exec(src);
		if (match) {
			return {
				type: "mfm-emoji-code",
				raw: match[0],
				code: match[1],
			};
		}
		return undefined;
	},
	renderer: (token) => token.raw,
};

const mfmUnicodeEmoji: TokenizerAndRendererExtension = {
	name: "mfm-unicode-emoji",
	level: "inline",
	start: (src) => src.match(EmojiRegex)?.index,
	tokenizer: (src, _tokens) => {
		const match = EmojiRegexStart.exec(src);
		if (match) {
			return {
				type: "mfm-unicode-emoji",
				raw: match[0],
			};
		}
		return undefined;
	},
	renderer: (token) => token.raw,
};

export const mfmEmoji = [mfmEmojiCode, mfmUnicodeEmoji];
