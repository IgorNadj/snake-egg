import { expect } from 'chai';
import { Polyomino, PointInt } from 'polyomino';
import { GridCell, Neighbours, Puzzle } from '../../../src/Puzzle';
import { Set } from 'immutable';
import { SolvingPuzzle } from "../../../src/solver/SolvingPuzzle";
import { MarkAdjacentToSnake } from '../../../src/solver/step/MarkAdjacentToSnake';


describe("FillsSpaceBetweenTwoSnakes", () => {

  it("fills any space between two snakes separated by one cell", () => {
    /*
    * Given puzzle:
    * 
    *   E . . _ _  
    *   _ _ _ _ _
    *   E . . _ _
    * 
    * the snake cannot touch too early: 
    * 
    *   E . . _ _  
    *   P P _ _ _
    *   E . . _ _
    * 
    * TODO: a human can detect too early by most of the board not being completed...
    */
  });

});