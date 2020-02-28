import { expect } from 'chai';
import { Polyomino, PointInt } from 'polyomino';
import { GridCell, Neighbours, Puzzle } from '../../../src/Puzzle';
import { Set } from 'immutable';
import { SolvingPuzzle } from "../../../src/solver/SolvingPuzzle";
import { MarkAdjacentToSnake } from '../../../src/solver/step/MarkAdjacentToSnake';


describe("WrapCompletedPolyWithSnake", () => {

  it("wraps poly that has hit its size / max with poly", () => {
    /*
    * Given puzzle:
    * 
    *   _ _ _ _ _
    *   _ 4 4 _ _  
    *   _ _ 4 _ _
    *   _ _ 4 _ _
    *   _ _ _ _ _
    * 
    * the adjacent cells must be snake: 
    * 
    *   _ . . _ _
    *   . 4 4 . _  
    *   _ . 4 . _
    *   _ . 4 . _
    *   _ _ . _ _
    */
  });

});