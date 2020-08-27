Cold-start Benchmarks

| File (size) | Tokenizer | AST | Parseable |
|-------------|-----------|-----|-----------|
| bowser.es2015.js (1.908 KB) | 3ms | 5ms | 1ms |
| bowser.js (25.812 KB) | 44ms | 72ms | 46ms |
| domlette.es2015.js (0.386 KB) | 8ms | 1ms | 0ms |
| domlette.js (0.401 KB) | 0ms | 1ms | 1ms |
| react-dom.development.js (883.826 KB) | 54ms | 334ms | 77ms |
| react-dom.production.min.js (119.029 KB) | 20ms | 176ms | 37ms |
| react.development.js (62.557 KB) | 1ms | 26ms | 11ms |
| react.production.min.js (6.7 KB) | 0ms | 8ms | 2ms |
| swr-index.js (18.34 KB) | 2ms | 28ms | 5ms |
| toybox-js-render-component.js (2.818 KB) | 0ms | 2ms | 0ms |
| ts-trapper.js (1.493 KB) | 0ms | 1ms | 0ms |
| vue.common.dev.js (332.233 KB) | 17ms | 164ms | 30ms |
| vue.common.prod.js (93.509 KB) | 6ms | 122ms | 21ms |
| vue.esm.browser.js (327.481 KB) | 64ms | 247ms | 1ms |
| vue.esm.browser.min.js (92.971 KB) | 19ms | 159ms | 0ms |
| vue.runtime.common.dev.js (231.585 KB) | 7ms | 133ms | 25ms |
| vue.runtime.common.prod.js (64.714 KB) | 8ms | 98ms | 14ms |
| vue.runtime.esm.js (235.774 KB) | 7ms | 114ms | 24ms |

Warm-run Benchmarks  
Benchmarking getEcmaVersion for bowser.es2015.js (1.908 KB)  
  getEcmaVersionTokenizer x 33,784 ops/sec ±3.44% (85 runs sampled)  
    Mean runtime: 0.03ms  
  getEcmaVersionAST x 1,897 ops/sec ±16.42% (79 runs sampled)  
    Mean runtime: 0.53ms  
  getEcmaVersionParseable x 14,482 ops/sec ±4.16% (76 runs sampled)  
    Mean runtime: 0.07ms  
  Fastest implementation: getEcmaVersionTokenizer  
Benchmarking getEcmaVersion for bowser.js (25.812 KB)  
  getEcmaVersionTokenizer x 441 ops/sec ±4.28% (74 runs sampled)  
    Mean runtime: 2.27ms  
  getEcmaVersionAST x 29.23 ops/sec ±5.58% (45 runs sampled)  
    Mean runtime: 34.22ms  
  getEcmaVersionParseable x 211 ops/sec ±4.43% (67 runs sampled)  
    Mean runtime: 4.74ms  
  Fastest implementation: getEcmaVersionTokenizer  
Benchmarking getEcmaVersion for domlette.es2015.js (0.386 KB)  
  getEcmaVersionTokenizer x 29,034 ops/sec ±3.71% (78 runs sampled)  
    Mean runtime: 0.03ms  
  getEcmaVersionAST x 1,903 ops/sec ±3.72% (80 runs sampled)  
    Mean runtime: 0.53ms  
  getEcmaVersionParseable x 20,316 ops/sec ±3.52% (78 runs sampled)  
    Mean runtime: 0.05ms  
  Fastest implementation: getEcmaVersionTokenizer  
Benchmarking getEcmaVersion for domlette.js (0.401 KB)  
  getEcmaVersionTokenizer x 26,967 ops/sec ±3.26% (80 runs sampled)  
    Mean runtime: 0.04ms  
  getEcmaVersionAST x 1,458 ops/sec ±3.80% (76 runs sampled)  
    Mean runtime: 0.69ms  
  getEcmaVersionParseable x 10,803 ops/sec ±3.41% (80 runs sampled)  
    Mean runtime: 0.09ms  
  Fastest implementation: getEcmaVersionTokenizer  
Benchmarking getEcmaVersion for react-dom.development.js (883.826 KB)  
  getEcmaVersionTokenizer x 56.11 ops/sec ±3.04% (58 runs sampled)  
    Mean runtime: 17.82ms  
  getEcmaVersionAST x 3.34 ops/sec ±6.79% (13 runs sampled)  
    Mean runtime: 299.42ms  
  getEcmaVersionParseable x 21.19 ops/sec ±4.44% (39 runs sampled)  
    Mean runtime: 47.2ms  
  Fastest implementation: getEcmaVersionTokenizer  
Benchmarking getEcmaVersion for react-dom.production.min.js (119.029 KB)  
  getEcmaVersionTokenizer x 130 ops/sec ±2.93% (67 runs sampled)  
    Mean runtime: 7.67ms  
  getEcmaVersionAST x 5.97 ops/sec ±3.75% (19 runs sampled)  
    Mean runtime: 167.59ms  
  getEcmaVersionParseable x 51.92 ops/sec ±1.36% (66 runs sampled)  
    Mean runtime: 19.26ms  
  Fastest implementation: getEcmaVersionTokenizer  
Benchmarking getEcmaVersion for react.development.js (62.557 KB)  
  getEcmaVersionTokenizer x 866 ops/sec ±0.56% (91 runs sampled)  
    Mean runtime: 1.15ms  
  getEcmaVersionAST x 49.84 ops/sec ±1.55% (64 runs sampled)  
    Mean runtime: 20.06ms  
  getEcmaVersionParseable x 319 ops/sec ±3.73% (81 runs sampled)  
    Mean runtime: 3.13ms  
  Fastest implementation: getEcmaVersionTokenizer  
Benchmarking getEcmaVersion for react.production.min.js (6.7 KB)  
  getEcmaVersionTokenizer x 2,387 ops/sec ±3.49% (81 runs sampled)  
    Mean runtime: 0.42ms  
  getEcmaVersionAST x 121 ops/sec ±2.03% (77 runs sampled)  
    Mean runtime: 8.24ms  
  getEcmaVersionParseable x 1,007 ops/sec ±0.98% (91 runs sampled)  
    Mean runtime: 0.99ms  
  Fastest implementation: getEcmaVersionTokenizer  
Benchmarking getEcmaVersion for swr-index.js (18.34 KB)  
  getEcmaVersionTokenizer x 857 ops/sec ±0.91% (92 runs sampled)  
    Mean runtime: 1.17ms  
  getEcmaVersionAST x 40.79 ops/sec ±1.46% (54 runs sampled)  
    Mean runtime: 24.51ms  
  getEcmaVersionParseable x 321 ops/sec ±0.95% (84 runs sampled)  
    Mean runtime: 3.12ms  
  Fastest implementation: getEcmaVersionTokenizer  
Benchmarking getEcmaVersion for toybox-js-render-component.js (2.818 KB)  
  getEcmaVersionTokenizer x 15,399 ops/sec ±0.45% (92 runs sampled)  
    Mean runtime: 0.06ms  
  getEcmaVersionAST x 988 ops/sec ±1.04% (92 runs sampled)  
    Mean runtime: 1.01ms  
  getEcmaVersionParseable x 6,848 ops/sec ±0.70% (94 runs sampled)  
    Mean runtime: 0.15ms  
  Fastest implementation: getEcmaVersionTokenizer  
Benchmarking getEcmaVersion for ts-trapper.js (1.493 KB)  
  getEcmaVersionTokenizer x 34,092 ops/sec ±0.61% (90 runs sampled)  
    Mean runtime: 0.03ms  
  getEcmaVersionAST x 3,457 ops/sec ±0.79% (93 runs sampled)  
    Mean runtime: 0.29ms  
  getEcmaVersionParseable x 18,186 ops/sec ±0.68% (93 runs sampled)  
    Mean runtime: 0.05ms  
  Fastest implementation: getEcmaVersionTokenizer  
Benchmarking getEcmaVersion for vue.common.dev.js (332.233 KB)  
  getEcmaVersionTokenizer x 106 ops/sec ±2.86% (76 runs sampled)  
    Mean runtime: 9.4ms  
  getEcmaVersionAST x 5.18 ops/sec ±6.09% (17 runs sampled)  
    Mean runtime: 192.92ms  
  getEcmaVersionParseable x 36.90 ops/sec ±4.42% (48 runs sampled)  
    Mean runtime: 27.1ms  
  Fastest implementation: getEcmaVersionTokenizer  
Benchmarking getEcmaVersion for vue.common.prod.js (93.509 KB)  
  getEcmaVersionTokenizer x 139 ops/sec ±4.39% (69 runs sampled)  
    Mean runtime: 7.18ms  
  getEcmaVersionAST x 6.51 ops/sec ±5.11% (21 runs sampled)  
    Mean runtime: 153.71ms  
  getEcmaVersionParseable x 49.99 ops/sec ±4.47% (52 runs sampled)  
    Mean runtime: 20ms  
  Fastest implementation: getEcmaVersionTokenizer  
Benchmarking getEcmaVersion for vue.esm.browser.js (327.481 KB)  
  getEcmaVersionTokenizer x 98.07 ops/sec ±4.94% (63 runs sampled)  
    Mean runtime: 10.2ms  
  getEcmaVersionAST x 5.15 ops/sec ±7.02% (17 runs sampled)  
    Mean runtime: 194.3ms  
  getEcmaVersionParseable x 17,617 ops/sec ±3.98% (76 runs sampled)  
    Mean runtime: 0.06ms  
  Fastest implementation: getEcmaVersionParseable  
Benchmarking getEcmaVersion for vue.esm.browser.min.js (92.971 KB)  
  getEcmaVersionTokenizer x 158 ops/sec ±3.75% (73 runs sampled)  
    Mean runtime: 6.31ms  
  getEcmaVersionAST x 6.92 ops/sec ±4.31% (22 runs sampled)  
    Mean runtime: 144.57ms  
  getEcmaVersionParseable x 8,195 ops/sec ±3.48% (77 runs sampled)  
    Mean runtime: 0.12ms  
  Fastest implementation: getEcmaVersionParseable  
Benchmarking getEcmaVersion for vue.runtime.common.dev.js (231.585 KB)  
  getEcmaVersionTokenizer x 144 ops/sec ±3.66% (73 runs sampled)  
    Mean runtime: 6.96ms  
  getEcmaVersionAST x 7.90 ops/sec ±4.85% (24 runs sampled)  
    Mean runtime: 126.62ms  
  getEcmaVersionParseable x 53.47 ops/sec ±4.46% (57 runs sampled)  
    Mean runtime: 18.7ms  
  Fastest implementation: getEcmaVersionTokenizer  
Benchmarking getEcmaVersion for vue.runtime.common.prod.js (64.714 KB)  
  getEcmaVersionTokenizer x 217 ops/sec ±3.21% (73 runs sampled)  
    Mean runtime: 4.61ms  
  getEcmaVersionAST x 9.05 ops/sec ±6.40% (27 runs sampled)  
    Mean runtime: 110.56ms  
  getEcmaVersionParseable x 77.44 ops/sec ±4.19% (66 runs sampled)  
    Mean runtime: 12.91ms  
  Fastest implementation: getEcmaVersionTokenizer  
Benchmarking getEcmaVersion for vue.runtime.esm.js (235.774 KB)  
  getEcmaVersionTokenizer x 144 ops/sec ±3.62% (72 runs sampled)  
    Mean runtime: 6.95ms  
  getEcmaVersionAST x 7.62 ops/sec ±5.57% (23 runs sampled)  
    Mean runtime: 131.3ms  
  getEcmaVersionParseable x 58.52 ops/sec ±3.43% (61 runs sampled)  
    Mean runtime: 17.09ms  
  Fastest implementation: getEcmaVersionTokenizer  
