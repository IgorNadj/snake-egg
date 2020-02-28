import { expect } from 'chai';
import { Polyomino, PointInt } from 'polyomino';
import { GridCell, Neighbours, Puzzle } from '../../../src/Puzzle';
import { Set } from 'immutable';
import { SolvingPuzzle } from "../../../src/solver/SolvingPuzzle";
import { MarkAdjacentToSnake } from '../../../src/solver/step/MarkAdjacentToSnake';


describe("GrowSnakeOutOfPolyTunnel", () => {

  it("extends a snake out of a tunnel", () => {
    /*
    * Given puzzle:
    * 
    *   _ _ P _ _  
    *   . . . _ _
    *   _ _ P _ _
    * 
    * the only valid next move for the snake is to keep going right: 
    * 
    *   _ _ P _ _  
    *   . . . . _
    *   _ _ P _ _
    * 
    */
  });

});