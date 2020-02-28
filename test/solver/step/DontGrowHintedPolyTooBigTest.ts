import { expect } from 'chai';
import { Polyomino, PointInt } from 'polyomino';
import { GridCell, Neighbours, Puzzle } from '../../../src/Puzzle';
import { Set } from 'immutable';
import { SolvingPuzzle } from "../../../src/solver/SolvingPuzzle";
import { MarkAdjacentToSnake } from '../../../src/solver/step/MarkAdjacentToSnake';


describe("DontGrowHintedPolyTooBig", () => {

  it("knows when a hinted poly cannot grow in a certain direction, and fills with snake", () => {
    /*
    * Given puzzle:
    * 
    *   _ _ _ _ _  
    *   _ 2 _ P P
    *   _ _ _ _ _
    * 
    * the space between the 2 and the poly cannot be poly, or the 2 size poly will grow 
    * beyond a 2, so it must be snake: 
    * 
    *   _ _ _ _ _  
    *   _ 2 . P P
    *   _ _ _ _ _
    */
  });

});