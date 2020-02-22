"use strict";
exports.__esModule = true;
var polyomino_1 = require("polyomino");
var Puzzle_1 = require("./Puzzle");
var immutable_1 = require("immutable");
var Generator = /** @class */ (function () {
    function Generator() {
    }
    Generator.prototype.generate = function (width, height, maxNumber) {
        var _this = this;
        console.log('Start');
        // 1. Starting with biggest, place shape into fist space
        //    1.1. if valid, continue with next biggest shape
        //         1.1.1. if this is the biggest shape, check if puzzle valid
        //    1.2. if not valid, choose next space
        //         1.2.1. if no spaces left, move back up to larger shape and continue
        // ------------------------------------------------------------
        /*
         *  3 . . 4 4
         *  3 3 . 4 .
         *  . . . 4 .
         *  . 2 2 . .
         *  . . . . 1
         */
        var puzzle = new Puzzle_1.Puzzle(width, height, maxNumber);
        // 1. Starting with biggest, place shape into fist space
        for (var size = maxNumber; size >= 1; size--) {
            var polyominos = polyomino_1.Polyomino.get(size);
            polyominos.forEach(function (polyomino) {
                var variants = _this.variants(polyomino);
                variants.forEach(function (variant) {
                    // const puzzlePlaced = placeVariant(puzzle, variant, width, height);
                });
                // 1.1. if valid, continue with next biggest shape
                // const isIntermediatePuzzleValid = isIntermediatePuzzleValid();
            });
        }
        // for (let size = 1; size <= 9; size++) {
        // 	const polyominos = Polyomino.get(size);
        // 	console.log(size, polyominos.first().render(), polyominos.first().toString());
        // 	allPolyominos[size] = polyominos;
        // }
        // const x = new Polyomino.get(4);
        return puzzle;
    };
    Generator.prototype.variants = function (polyomino) {
        var variants = immutable_1.Set();
        polyomino.rotations().forEach(function (rotation) {
            var reflections = rotation.reflections();
            reflections.forEach(function (reflection) {
                variants.add(reflection);
            });
        });
        return variants;
    };
    return Generator;
}());
exports.Generator = Generator;
