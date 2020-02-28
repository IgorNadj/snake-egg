import { expect } from 'chai';
import { Polyomino, PointInt } from 'polyomino';
import { GridCell, Neighbours, Puzzle } from '../../../src/Puzzle';
import { Set } from 'immutable';
import { SolvingPuzzle } from "../../../src/solver/SolvingPuzzle";
import { MarkAdjacentToSnake } from '../../../src/solver/step/MarkAdjacentToSnake';


describe("WrapSnakeStraightSegments", () => {

  it("wraps straight lengths of snake with poly", () => {
    /*
    * Given puzzle:
    * 
    *   _ _ _ _ _
    *   _ _ . _ _  
    *   _ _ . _ _
    *   _ _ . _ _
    *   _ _ . _ _
    *   _ _ _ _ _
    * 
    * the adjacent cells next to a straight segment must be poly: 
    * 
    *   _ _ _ _ _
    *   _ _ . _ _  
    *   _ P . P _
    *   _ P . P _
    *   _ _ . _ _
    *   _ _ _ _ _
    */
  });

});