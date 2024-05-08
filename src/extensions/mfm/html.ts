import type {
	RendererThis,
	Token,
	TokenizerAndRendererExtension,
} from "marked";

const keep = Symbol();

export type TokenMfmHtml = {
	type: "mfm-html";
	raw: string;
	tag: string;
};

interface HtmlTags {
	[key: string]:
		| typeof keep
		| ((token: TokenMfmHtml, renderer: RendererThis) => string);
}

const BlockTags: HtmlTags = {
	center: (token) =>
		token.raw === "<center>" ? `<div style="text-align: center;">` : "</div>",
};

const makeReg = (tags: HtmlTags) =>
	Object.keys(tags)
		.map((tag) => `<\\/?${tag}>`)
		.join("|");

const reg = RegExp(makeReg(BlockTags));
const rule = RegExp(`^(${makeReg(BlockTags)})`);

export const mfmHTML: TokenizerAndRendererExtension = {
	name: "mfm-html",
	level: "block",
	start: (src) => src.match(reg)?.index,
	tokenizer(src, _tokens) {
		const tagReg = /<\/?([a-zA-Z]+)>/;
		const match = rule.exec(src);
		if (match) {
			const tag = tagReg.exec(match[0]);
			if (!tag) return undefined;
			const res: TokenMfmHtml = {
				type: "mfm-html",
				raw: match[0],
				tag: tag[1],
			};
			return res;
		}
		return undefined;
	},
	renderer(token) {
		const fn = BlockTags[token.tag];
		return fn === keep ? token.raw : fn(token as TokenMfmHtml, this);
	},
};
