# FFM.js - Fast MFM-compatible standard markdown parser

> :warning: FFM.js is still in early development, please do not use it in production

FFM.js consists of [Marked](https://github.com/markedjs/marked/) with the MFM extension and the MFM AST converter

### The grammatical difference between MFM and FFM

- **`MfmFn`**

  Both MFM and FFM will truncate `fn` iterations with more than 20 layers. For performance reasons, FFM.js will select the part after parse and discard the part before. MFM discards the part in the middle.

  Please refer to the corresponding output of `evil.md` after `yarn test`

- **`MfmMention`**

  FFM.js now supports dots(`.`) in usernames.

- **`MfmUrl`**

  For now, only `MfmLink` will be parsed, 

- **`MfmLink`**

  `MfmLink.props.silent` is temporarily always `false`

- **`FfmParagraph`**

  Unlike MfM which preserves line breaks, FFM replaces line breaks with `<p>`(`FfmParagraph`) or `<br>`(`FfmBr`)

- **Other supports**

  FFM supports all [GFM](https://github.github.com/gfm/) syntax
