import { expect } from 'chai';
import { Polyomino, PointInt } from 'polyomino';
import { GridCell, Neighbours, Puzzle } from '../../../src/Puzzle';
import { Set } from 'immutable';
import { SolvingPuzzle } from "../../../src/solver/SolvingPuzzle";
import { MarkAdjacentToSnake } from '../../../src/solver/step/MarkAdjacentToSnake';


describe("FillSnakeInnerCorners", () => {

  it("fills snake inner corners", () => {
    /*
    * Given puzzle:
    * 
    *   _ . . . _  
    *   _ . _ _ _
    *   _ . _ _ _
    *   _ E _ _ _
    * 
    * the snake cant loop back on itself so the inner corner must be poly: 
    * 
    *   _ . . . _  
    *   _ . P _ _
    *   _ . _ _ _
    *   _ E _ _ _
    */
  });

});