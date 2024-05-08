import type { MarkedExtension } from "marked";
import { mfmPlain } from "./plain.js";
import { mfmEmoji } from "./emoji.js";
import { mfmMention } from "./mention.js";
import { mfmHTML } from "./html.js";
import { mfmHashtag } from "./hashtag.js";
import { mfmMath } from "./math.js";
import { mfmFn } from "./fn.js";

const mfmExtension: MarkedExtension = {
	extensions: [
		mfmPlain,
		...mfmEmoji,
		mfmMention,
		mfmHTML,
		mfmHashtag,
		...mfmMath,
		mfmFn,
	],
};

export default mfmExtension;
