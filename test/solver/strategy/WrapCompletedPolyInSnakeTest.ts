import { expect } from 'chai';
import {Grid, GridCell, HintedPuzzle, SolveCell, SolvingPuzzle} from "../../../src";
import {WrapCompletedPolyWithSnake} from "../../../src/solver/strategy/WrapCompletedPolyWithSnake";


describe("WrapsCompletedPolyInSnake", () => {

  it("wraps completed poly in snake", () => {
    /*
    * Given puzzle:
    * 
    *   _ _ _ _ _  
    *   _ 3 3 _ _
    *   _ _ 3 _ _
    *   _ _ _ _ _
    *
    * the poly cannot have any adjacent cell be poly or it will grow, so they must be snake:
    * 
    *   _ . . _ _  
    *   . 3 3 . _
    *   _ . 3 . _
    *   _ _ . _ _
    */
    const solveGrid: Grid<SolveCell> = new Grid(5, 4, [
      [null, null, null, null, null],
      [null, 3, 3, null, null],
      [null, null, 3, null, null],
      [null, null, null, null, null],
    ]);

    const puzzle = new SolvingPuzzle(new HintedPuzzle(5, 4, 5), solveGrid);

    const expectedSolveGrid = [
      [null, GridCell.SNAKE, GridCell.SNAKE, null, null],
      [GridCell.SNAKE, 3, 3, GridCell.SNAKE, null],
      [null, GridCell.SNAKE, 3, GridCell.SNAKE, null],
      [null, null, GridCell.SNAKE, null, null],
    ];

    const strategy = new WrapCompletedPolyWithSnake();

    const solved = strategy.solve(puzzle);

    expect(solved.getSolveGrid().toArray()).to.deep.equal(expectedSolveGrid);
  });

});