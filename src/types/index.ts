export type MfmBlock =
	| MfmQuote
	| MfmSearch
	| MfmCodeBlock
	| MfmMathBlock
	| MfmCenter
	| MfmSmall;

export type MfmQuote = {
	type: "quote";
	props?: Record<string, unknown>;
	children: MfmNode[];
};
export type MfmSearch = {
	type: "search";
	props: {
		query: string;
		content: string;
	};
	children?: [];
};
export type MfmCodeBlock = {
	type: "blockCode";
	props: {
		code: string;
		lang: string | null;
	};
	children?: [];
};
export type MfmMathBlock = {
	type: "mathBlock";
	props: {
		formula: string;
	};
	children?: [];
};
export type MfmCenter = {
	type: "center";
	props?: Record<string, unknown>;
	children: MfmNode[];
};
export type MfmInline =
	| MfmUnicodeEmoji
	| MfmEmojiCode
	| MfmBold
	| MfmItalic
	| MfmStrike
	| MfmInlineCode
	| MfmMathInline
	| MfmMention
	| MfmHashtag
	| MfmUrl
	| MfmLink
	| MfmFn
	| MfmPlain
	| MfmText;
export type MfmUnicodeEmoji = {
	type: "unicodeEmoji";
	props: {
		emoji: string;
	};
	children?: [];
};
export type MfmEmojiCode = {
	type: "emojiCode";
	props: {
		name: string;
	};
	children?: [];
};
export type MfmBold = {
	type: "bold";
	props?: Record<string, unknown>;
	children: MfmInline[];
};
export type MfmSmall = {
	type: "small";
	props?: Record<string, unknown>;
	children: MfmNode[];
};
export type MfmItalic = {
	type: "italic";
	props?: Record<string, unknown>;
	children: MfmInline[];
};
export type MfmStrike = {
	type: "strike";
	props?: Record<string, unknown>;
	children: MfmInline[];
};
export type MfmInlineCode = {
	type: "inlineCode";
	props: {
		code: string;
	};
	children?: [];
};
export type MfmMathInline = {
	type: "mathInline";
	props: {
		formula: string;
	};
	children?: [];
};
export type MfmMention = {
	type: "mention";
	props: {
		username: string;
		host: string | null;
		acct: string;
	};
	children?: [];
};
export type MfmHashtag = {
	type: "hashtag";
	props: {
		hashtag: string;
	};
	children?: [];
};
export type MfmUrl = {
	type: "url";
	props: {
		url: string;
		brackets?: boolean;
	};
	children?: [];
};
export type MfmLink = {
	type: "link";
	props: {
		silent: boolean;
		url: string;
	};
	children: MfmInline[];
};
export type MfmFn = {
	type: "fn";
	props: {
		name: string;
		args: Record<string, string | true>;
	};
	children: MfmInline[];
};
export type MfmPlain = {
	type: "plain";
	props?: Record<string, unknown>;
	children: MfmText[];
};
export type MfmText = {
	type: "text";
	props: {
		text: string;
	};
	children?: [];
};

export type FfmHeading = {
	type: "heading";
	props: {
		depth: number;
	};
	children: MfmNode[];
};
export type FfmTableCell = {
	type: "tableCell";
	children: MfmNode[];
};
export type FfmTable = {
	type: "table";
	props: {
		align: Array<"center" | "left" | "right" | null>;
	};
	header: FfmTableCell[];
	rows: FfmTableCell[][];
};
export type FfmHr = {
	type: "hr";
};
export type FfmList = {
	type: "list";
	props: {
		ordered: boolean;
		start: number | "";
		loose: boolean;
	};
	children: FfmListItem[];
};
export type FfmListItem = {
	type: "list-item";
	props: {
		task: boolean;
		checked?: boolean | undefined;
		loose: boolean;
	};
	children: MfmNode[];
};
export type FfmParagraph = {
	type: "paragraph";
	children: MfmNode[];
};
export type FfmBr = {
	type: "br";
};

export type FfmNode =
	| FfmHeading
	| FfmTable
	| FfmTableCell
	| FfmHr
	| FfmList
	| FfmListItem
	| FfmParagraph
	| FfmBr;

export type MfmNode = MfmBlock | MfmInline | FfmNode;
