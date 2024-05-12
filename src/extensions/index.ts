import type { TokenMfmEmojiCode, TokenMfmUnicodeEmoji } from "./mfm/emoji.js";
import type { TokenMfmFn } from "./mfm/fn.js";
import type { TokenMfmHashtag } from "./mfm/hashtag.js";
import type { TokenMfmHtml } from "./mfm/html.js";
import type { TokenMfmMath } from "./mfm/math.js";
import type { TokenMfmMention } from "./mfm/mention.js";
import mfmExtension from "./mfm/mfm.js";
import type { TokenMfmPlain } from "./mfm/plain.js";
import type { TokenMfmSearch } from "./mfm/search.js";

export default [mfmExtension];

export type TokenExtension =
	| TokenMfmEmojiCode
	| TokenMfmUnicodeEmoji
	| TokenMfmFn
	| TokenMfmHashtag
	| TokenMfmHtml
	| TokenMfmMath
	| TokenMfmMention
	| TokenMfmSearch
	| TokenMfmPlain;
