"use strict";
exports.__esModule = true;
var Puzzle = /** @class */ (function () {
    function Puzzle(width, height, maxNumber) {
        this.width = width;
        this.height = height;
        this.maxNumber = maxNumber;
        this.grid = Array(height).fill(null).map(function () { return Array(width).fill(null); });
    }
    Puzzle.prototype.getGrid = function () {
        return this.grid;
    };
    Puzzle.prototype.getWidth = function () {
        return this.width;
    };
    Puzzle.prototype.getHeight = function () {
        return this.height;
    };
    Puzzle.prototype.getMaxNumber = function () {
        return this.maxNumber;
    };
    Puzzle.prototype.placePolyomino = function () {
    };
    return Puzzle;
}());
exports.Puzzle = Puzzle;
