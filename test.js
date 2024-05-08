import parser, { convert } from "./built/index.js";
import fs from "fs";
import mfm from "mfm-js";

const text = `miao **bold** <plain>www not **bold**</plain> *italic* <plain>www not **italic**</plain> <plain>**text**
test block: <plain>
** the block **
</plain>

som<b>e*t*e</b>xt
br 😆😮🎉:douni_tear:

@linca
<center>@linca.we@stelpolva.moe</center>
@ooo@ovo.st

<center>some
<center>te<del>ww</del>wxt</center>
again</center>

<center>
\`\`\`html
<center>sth</center>
\`\`\`
</center>

#hashtag is hashtag #末日时在做什么

<small>
小字
</small>

https://google.com
<https://google.com>

***big***

a \\( math \\) b
\\[
e^{i\\pi}=-1  
\\]
`;

{
  const st = new Date();
  const _lexer = parser.lexer(text)
  const _ast = convert(_lexer);
  const ed = new Date();
  const ast = JSON.stringify(_ast, undefined, "  ");
  // console.log(ast);
  fs.writeFileSync("marked.tmp.json", ast);
  fs.writeFileSync("marked-lexer.tmp.json", JSON.stringify(_lexer, undefined, "  "));
  // console.log("HTML:", parser.parse(text));

  console.log("---------");
  console.log("Marked Time(ms):", ed - st);
}

{
  const st = new Date();
  const ast = mfm.parse(text);
  const ed = new Date();
  fs.writeFileSync("mfm.tmp.json", JSON.stringify(ast, undefined, "  "));
  console.log("Mfm Time(ms):", ed - st);
}


