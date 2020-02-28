import { expect } from 'chai';
import { Polyomino, PointInt } from 'polyomino';
import { GridCell, Neighbours, Puzzle } from '../../../src/Puzzle';
import { Set } from 'immutable';
import { SolvingPuzzle } from "../../../src/solver/SolvingPuzzle";
import { MarkAdjacentToSnake } from '../../../src/solver/step/MarkAdjacentToSnake';


describe("GrowSnakeThatCanOnlyMoveInOneValidDirection", () => {

  it("grows snake segments that must grow in a certain direction", () => {
    /*
    * Given puzzle:
    * 
    *   _ P P _ _  
    *   _ . . _ _
    *   _ . _ _ _
    *   _ . _ _ _
    * 
    * the only valid next move for the snake is to keep going right: 
    * 
    *   _ P P _ _  
    *   _ . . . _
    *   _ . _ _ _
    *   _ . _ _ _
    * 
    */
  });

});