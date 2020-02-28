import { expect } from 'chai';
import { Polyomino, PointInt } from 'polyomino';
import { GridCell, Neighbours, Puzzle } from '../../../src/Puzzle';
import { Set } from 'immutable';
import { SolvingPuzzle } from "../../../src/solver/SolvingPuzzle";
import { MarkAdjacentToSnake } from '../../../src/solver/step/MarkAdjacentToSnake';


describe("WrapsCompledPolyInSnake", () => {

  it("wraps completed poly in snake", () => {
    /*
    * Given puzzle:
    * 
    *   _ _ _ _ _  
    *   _ 2 2 _ _
    *   _ _ _ _ _
    * 
    * the 2 poly cannot have any adjacent poly or it will grow, so it must be snake: 
    * 
    *   _ . . _ _  
    *   . 2 2 . _
    *   _ . . _ _
    */
  });

});