import { expect } from 'chai';
import { Polyomino, PointInt } from 'polyomino';
import { GridCell, Neighbours, Puzzle } from '../../../src/Puzzle';
import { Set } from 'immutable';
import { SolvingPuzzle } from "../../../src/solver/SolvingPuzzle";
import { MarkAdjacentToSnake } from '../../../src/solver/step/MarkAdjacentToSnake';


describe("FillSnakeOuterCorners", () => {

  it("fills snake outer corners", () => {
    /*
    * Given puzzle:
    * 
    *   _ _ _ _ _
    *   _ . . . _  
    *   _ . _ _ _
    *   _ E _ _ _
    * 
    * the snake at the corner cant fork into other directions, so they must be poly: 
    * 
    *   _ P _ _ _
    *   P . . . _  
    *   _ . _ _ _
    *   _ E _ _ _
    */
  });

});