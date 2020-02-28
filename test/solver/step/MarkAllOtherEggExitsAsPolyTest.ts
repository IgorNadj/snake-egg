import { expect } from 'chai';
import { Polyomino, PointInt } from 'polyomino';
import { GridCell, Neighbours, Puzzle } from '../../../src/Puzzle';
import { Set } from 'immutable';
import { SolvingPuzzle } from "../../../src/solver/SolvingPuzzle";
import { MarkAdjacentToSnake } from '../../../src/solver/step/MarkAdjacentToSnake';


describe("MarkAllOtherEggExitsAsPoly", () => {

  it("marks all other egg exists as poly", () => {
    /*
    * Given puzzle:
    * 
    *   _ _ _  
    *   E . _
    *   _ _ _
    * 
    * It knows that an egg can only have one snake going in/out, so it marks the rest
    * as poly: 
    * 
    *   P _ _  
    *   E . _
    *   P _ _
    */
  });

});