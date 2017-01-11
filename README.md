# r2d2-translator

> Translate a word to R2D2 native language

## Install

Download and extract this repository. Open a terminal and type this command line :

```
$ npm install -g
```

## Usage

```
Usage: r2d2-translator [options]

Options:

-h, --help          output usage information
-V, --version       output the version number
-w, --word [value]  Specified word
-v, --value <n>     Specified value between 1 and 115
-r, --random        Generate a random word in english
-p, --path [value]  Path to save sounds
```

## Examples

To download the translation of the word "pizza" :
```
$ r2d2-translator -w pizza -p ./mp3s/
```

To download the 155'th letter
```
$ r2d2-translator -v 115 -p ./mp3s/
```

To download a random word in english
```
$ r2d2-translator -r -p ./mp3s/
```
