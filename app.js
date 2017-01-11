#!/usr/bin/env node

const assert = require("assert")
const fs = require("fs")
const Path = require("path")
const program = require("commander")
const request = require("request")
const rword = require("random-word")

const alphabet = require("./alphabet.json")

const max = 10

program
    .version("0.0.1")
    .option("-w, --word [value]", "Specified word")
    .option("-v, --value <n>", "Specified value between 1 and 115", parseInt)
    .option("-r, --random", "Generate a random word in english")
    .option("-p, --path [value]", "Path to save sounds")
    .parse(process.argv)

function translate(word) {

    let out = []

    for (l of word)
        out.push(alphabet[l])

    return out
}

function normalize(arr) {

    let values = ""
    let sons = ""

    for (let i = 0; i < arr.length; i++) {

        values += '1';
        sons += arr[i]

        if (i < arr.length - 1) {
            values += '!'
            sons += '!'
        }
    }

    return { values, sons }
}

function compose(form, name) {

    request
        .post("http://www.r2d2translator.com/composeSongD2R2.php", (err, res, body) => {
            assert(!err)

            let path = `${name}.mp3`

            if (program.path)
                path = Path.join(program.path, path)

            download(body.replace(" &cle=", ""), path)
        })
        .form(form)
}

function download(id, path) {

    const file = fs.createWriteStream(path)
    const url = `http://www.r2d2translator.com/audio/${id}.MP3`

    console.log(url)

    request
        .get(url)
        .on("error", () => fs.unlink(path))
        .on("finish", () => file.close())
        .pipe(file)
}

if (program.value)
    compose({ values: '1', sons: program.value }, program.value)

else if (program.word)
    compose(normalize(translate(program.word)), program.word)

else if (program.random) {
    let word = rword()
    compose(normalize(word), word)
}