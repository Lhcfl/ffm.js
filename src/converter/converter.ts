import type { Token, Tokens } from "marked";
import type {
	FfmListItem,
	FfmTableCell,
	MfmInline,
	MfmNode,
} from "../types/index.js";
import type { TokenExtension } from "../extensions/index.js";

type TokenNonGeneric =
	| Tokens.Space
	| Tokens.Code
	| Tokens.Heading
	| Tokens.Table
	| Tokens.Hr
	| Tokens.Blockquote
	| Tokens.List
	| Tokens.ListItem
	| Tokens.Paragraph
	| Tokens.HTML
	| Tokens.Text
	| Tokens.Def
	| Tokens.Escape
	| Tokens.Tag
	| Tokens.Image
	| Tokens.Link
	| Tokens.Strong
	| Tokens.Em
	| Tokens.Codespan
	| Tokens.Br
	| Tokens.Del;

function convertTableCell(tokens: Tokens.TableCell[]): FfmTableCell[] {
	return tokens.map((t) => ({
		type: "tableCell",
		children: convert(t.tokens),
	}));
}

function asTokenNonGeneric(t: Token): t is TokenNonGeneric {
	return true;
}
function asTokenExtension(t: any): t is TokenExtension {
	return true;
}

function handleHtml(tokens: Token[]): Token[] {
	function top<T>(t: T[]) {
		return t.length > 0 ? t[t.length - 1] : undefined;
	}

	const tokenStack: {
		tag: string | null;
		tokens: Token[];
	}[] = [
		{
			tag: "",
			tokens: [],
		},
	];

	function pushStack(tag: string) {
		tokenStack.push({
			tag,
			tokens: [],
		});
	}

	function popStack(token: Token, type: string) {
		if (top(tokenStack)?.tag !== token.raw) {
			top(tokenStack)?.tokens.push(token);
			return;
		}
		const ts = tokenStack.pop()?.tokens;
		top(tokenStack)?.tokens.push({
			type,
			raw: "",
			tokens: ts,
		});
	}

	for (const token of tokens) {
		if (token.type === "html" || token.type === "mfm-html") {
			switch (token.raw.trim()) {
				case "<b>": {
					pushStack("</b>");
					break;
				}
				case "</b>": {
					popStack(token, "strong");
					break;
				}
				case "<i>": {
					pushStack("</i>");
					break;
				}
				case "</i>": {
					popStack(token, "em");
					break;
				}
				case "<s>": {
					pushStack("</s>");
					break;
				}
				case "</s>": {
					popStack(token, "del");
					break;
				}
				case "<center>": {
					pushStack("</center>");
					break;
				}
				case "</center>": {
					popStack(token, "mfm-center");
					break;
				}
				case "<small>": {
					pushStack("</small>");
					break;
				}
				case "</small>": {
					popStack(token, "mfm-small");
					break;
				}
				default: {
					top(tokenStack)?.tokens.push(token);
				}
			}
		} else {
			top(tokenStack)?.tokens.push(token);
		}
	}

	let res: Token[] = [];

	for (const { tag, tokens } of tokenStack) {
		if (tag != null)
			res.push({
				type: "text",
				raw: tag,
			});
		res = res.concat(tokens);
	}

	return res;
}

export function convert(tokens?: Token[]): MfmNode[] {
	const res: MfmNode[] = [];

	if (tokens == null) return [];

	tokens = handleHtml(tokens);

	function pushTextNode(text: string) {
		if (!text) return;
		res.push({
			type: "text",
			props: {
				text,
			},
		});
	}

	for (const token of tokens) {
		if (asTokenNonGeneric(token))
			switch (token.type) {
				case "space": {
					pushTextNode(" ");
					break;
				}
				case "code": {
					res.push({
						type: "blockCode",
						props: {
							code: token.text,
							lang: token.lang || null,
						},
					});
					break;
				}
				case "heading": {
					res.push({
						type: "heading",
						props: {
							depth: token.depth,
						},
						children: convert(token.tokens),
					});
					break;
				}
				case "table": {
					res.push({
						type: "table",
						props: {
							align: token.align,
						},
						header: convertTableCell(token.header),
						rows: token.rows.map((r) => convertTableCell(r)),
					});
					break;
				}
				case "hr": {
					res.push({
						type: "hr",
					});
					break;
				}
				case "blockquote": {
					res.push({
						type: "quote",
						children: convert(token.tokens),
					});
					break;
				}
				case "list": {
					res.push({
						type: "list",
						props: {
							ordered: token.ordered,
							start: token.start,
							loose: token.loose,
						},
						children: convert(token.items) as FfmListItem[],
					});
					break;
				}
				case "list_item": {
					res.push({
						type: "list-item",
						props: {
							task: token.task,
							checked: token.checked,
							loose: token.loose,
						},
						children: convert(token.tokens),
					});
					break;
				}
				case "paragraph": {
					res.push({
						type: "paragraph",
						children: convert(token.tokens),
					});
					break;
				}
				case "html": {
					pushTextNode(token.raw);
					break;
				}
				case "text": {
					pushTextNode(token.raw);
					break;
				}
				case "def": {
					// TODO
					break;
				}
				case "escape": {
					pushTextNode(token.text);
					break;
				}
				case "link": {
					res.push({
						type: "link",
						props: {
							url: token.href,
							silent: false, // TODO
						},
						children: convert(token.tokens) as MfmInline[],
					});
					break;
				}
				case "image": {
					// TODO
					pushTextNode(token.raw);
					break;
				}
				case "strong": {
					res.push({
						type: "bold",
						children: convert(token.tokens) as MfmInline[],
					});
					break;
				}
				case "em": {
					res.push({
						type: "italic",
						children: convert(token.tokens) as MfmInline[],
					});
					break;
				}
				case "codespan": {
					res.push({
						type: "inlineCode",
						props: {
							code: token.text,
						},
					});
					break;
				}
				case "br": {
					res.push({
						type: "br",
					});
					break;
				}
				case "del": {
					res.push({
						type: "strike",
						children: convert(token.tokens) as MfmInline[],
					});
					break;
				}
			}
		if (asTokenExtension(token))
			switch (token.type) {
				case "mfm-unicode-emoji": {
					res.push({
						type: "unicodeEmoji",
						props: {
							emoji: token.raw,
						},
					});
					break;
				}
				case "mfm-emoji-code": {
					res.push({
						type: "emojiCode",
						props: {
							name: token.code,
						},
					});
					break;
				}
				case "mfm-hashtag": {
					res.push({
						type: "hashtag",
						props: {
							hashtag: token.text,
						},
					});
					break;
				}
				case "mfm-mention": {
					res.push({
						type: "mention",
						props: {
							username: token.username,
							host: token.host,
							acct: token.raw,
						},
					});
					break;
				}
				case "mfm-plain": {
					res.push({
						type: "plain",
						children: [
							{
								type: "text",
								props: {
									text: token.text,
								},
							},
						],
					});
					break;
				}
				case "mfm-fn": {
					const dotIndex = token.tag.indexOf(".");
					const [name, argsStr] =
						dotIndex === -1
							? [token.tag, undefined]
							: [token.tag.slice(0, dotIndex), token.tag.slice(dotIndex + 1)];
					const argList = argsStr?.split(",");
					const args: Record<string, string | true> = {};
					if (argList)
						for (const arg of argList) {
							const [k, v] = arg.split("=");
							args[k] = v ?? true;
						}
					res.push({
						type: "fn",
						props: {
							name: name,
							args,
						},
						children: convert(token.tokens) as MfmInline[],
					});
					break;
				}
				case "mfm-math-block": {
					res.push({
						type: "mathBlock",
						props: {
							formula: token.code,
						},
					});
					break;
				}
				case "mfm-math-inline": {
					res.push({
						type: "mathInline",
						props: {
							formula: token.code,
						},
					});
					break;
				}
				case "mfm-html": {
					pushTextNode(token.raw);
					break;
				}
			}

		switch (token.type) {
			case "mfm-center": {
				res.push({
					type: "center",
					children: convert(token.tokens),
				});
				break;
			}
			case "mfm-small": {
				res.push({
					type: "small",
					children: convert(token.tokens),
				});
				break;
			}
		}
	}

	return res;
}
