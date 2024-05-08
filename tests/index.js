import parser, { convert } from "../built/index.js";
import fs from "node:fs";
import mfm from "mfm-js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

fs.mkdirSync(__dirname + "/built", { recursive: true });

// init
parser.parse("foo");

function test_a_text(text, name) {
  {
    const st = new Date();
    const _lexer = parser.lexer(text)
    const _ast = convert(_lexer);
    const ed = new Date();
    const ast = JSON.stringify(_ast, undefined, "  ");
    fs.writeFileSync(__dirname + "/built/"+ name + "-marked.tmp.json", ast);
    fs.writeFileSync(__dirname + "/built/"+ name + "-marked-lexer.tmp.json", JSON.stringify(_lexer, undefined, "  "));
    fs.writeFileSync(__dirname + "/built/"+ name + "-marked.html", parser.parse(text));
  
    console.log("---------");
    console.log("Testcase:", name);
    console.log("Marked Time(ms):", ed - st);
  }
  
  {
    const st = new Date();
    const ast = mfm.parse(text);
    const ed = new Date();
    fs.writeFileSync(__dirname + "/built/"+ name + "-mfm.tmp.json", JSON.stringify(ast, undefined, "  "));
    console.log("Mfm Time(ms):", ed - st);
  }
    
}

for (const filename of fs.readdirSync(__dirname + "/testcases")) {
  const txt = fs.readFileSync(__dirname + "/testcases/" + filename).toString();
  test_a_text(txt, filename);
}


