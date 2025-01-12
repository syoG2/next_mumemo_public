import { ExBlockObjectResponse, ExPartialBlockObjectResponse } from '@/components/notion/notion';
import { RichText } from '@/components/notion/richText/richText';
import type { CodeBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { FC } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import styles from './code.module.css';
import { Mermaid } from './mermaid';


const languageMap: { [key: string]: string; } = {
  "abap": 'abap',
  "agda": 'agda',
  "arduino": 'arduino',
  "ascii art": 'asciidoc',
  "assembly": 'assembly',
  "bash": 'bash',
  "basic": 'basic',
  "bnf": 'bnf',
  "c": 'c',
  "c#": 'csharp',
  "c++": 'cpp',
  "clojure": 'clojure',
  "coffeescript": 'coffeescript',
  "coq": 'coq',
  "css": 'css',
  "dart": 'dart',
  "dhall": 'dhall',
  "diff": 'diff',
  "docker": 'dockerfile',
  "ebnf": 'ebnf',
  "elixir": 'elixir',
  "elm": 'elm',
  "erlang": 'erlang',
  "f#": 'fsharp',
  "flow": 'flow',
  "fortran": 'fortran',
  "gherkin": 'gherkin',
  "glsl": 'glsl',
  "go": 'go',
  "graphql": 'graphql',
  "groovy": 'groovy',
  "haskell": 'haskell',
  "hcl": 'hcl',
  "html": 'htmlbars',
  "idris": 'idris',
  "java": 'java',
  "javascript": 'javascript',
  "json": 'json',
  "julia": 'julia',
  "kotlin": 'kotlin',
  "latex": 'latex',
  "less": 'less',
  "lisp": 'lisp',
  "livescript": 'livescript',
  "llvm ir": 'llvm',
  "lua": 'lua',
  "makefile": 'makefile',
  "markdown": 'markdown',
  "markup": 'markup',
  "matlab": 'matlab',
  "mathematica": 'mathematica',
  "mermaid": 'mermaid',
  "nix": 'nix',
  "notion formula": 'notion',
  "objective-c": 'objectivec',
  "ocaml": 'ocaml',
  "pascal": 'pascal',
  "perl": 'perl',
  "php": 'php',
  "plain text": 'plaintext',
  "powershell": 'powershell',
  "prolog": 'prolog',
  "protobuf": 'protobuf',
  "purescript": 'purescript',
  "python": 'python',
  "r": 'r',
  "racket": 'racket',
  "reason": 'reasonml',
  "ruby": 'ruby',
  "rust": 'rust',
  "sass": 'sass',
  "scala": 'scala',
  "scheme": 'scheme',
  "scss": 'scss',
  "shell": 'shell',
  "solidity": 'solidity',
  "sql": 'sql',
  "swift": 'swift',
  "toml": 'toml',
  "typeacript": 'typescript',
  "vb.net": 'vbnet',
  "verilog": 'verilog',
  "vhdl": 'vhdl',
  "visual basic": 'visualbasic',
  "webassembly": 'wasm',
  "xml": 'xml',
  "yaml": 'yaml',
}

type Props = {
  block: CodeBlockObjectResponse,
  nestBlocks: (ExPartialBlockObjectResponse | ExBlockObjectResponse)[],
};

export const Code: FC<Props> = ({ block, nestBlocks }) => {
  return (
    <div>
      <div className={styles.caption}>language: {block.code.language}</div>
      <SyntaxHighlighter language={languageMap[block.code.language]} style={vs2015}>
        {block.code.rich_text.reduce((pre, cur) => pre + cur.plain_text, "")}
      </SyntaxHighlighter>
      {block.code.language === "mermaid" &&
        <Mermaid chart={block.code.rich_text.reduce((pre, cur) => pre + cur.plain_text, "")} />
      }
      {block.code.caption.length !== 0 &&
        <div className={styles.caption}>
          caption:
          <RichText text={block.code.caption} />
        </div>
      }
    </div>
  );
};