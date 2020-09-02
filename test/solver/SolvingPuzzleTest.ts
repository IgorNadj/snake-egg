import {expect} from 'chai';
import {GridCell} from '../../src/Puzzle';
import {Grid, HintedPuzzle, SolveCell, SolvingPuzzle} from "../../src";


describe("SolvingPuzzleTest", () => {

  it("regions works", () => {
    /*
      * Puzzle
      *
      *   1 _ _ _ _
      *   _ 3 3 _ _
      *   _ _ _ _ _
      *   _ P _ P _
      *
      * has 4 regions
      */
    const solveGrid = new Grid<SolveCell>(5, 4, [
      [1, null, null, null, null],
      [null, 3, 3, null, null],
      [null, null, null, null, null],
      [null, GridCell.POLY, null, GridCell.POLY, null],
    ]);

    const puzzle = new SolvingPuzzle(new HintedPuzzle(5, 4, 5), solveGrid);

    const regionsBySize = puzzle.regions();

    expect(regionsBySize.size).to.equal(3);

    expect(regionsBySize.get(1)).to.not.be.null;
    expect(regionsBySize.get(3)).to.not.be.null;
    expect(regionsBySize.get(GridCell.POLY)).to.not.be.null;

    const size3Regions = regionsBySize.get(3);

    if (size3Regions) {
      expect(size3Regions.size).to.equal(1);
    }

    const polyRegions = regionsBySize.get(GridCell.POLY);

    if (polyRegions) {
      expect(polyRegions.size).to.equal(2);
    }
  });

  it("completedRegions works", () => {
    /*
      * Puzzle
      *
      *   1 _ _ _ 2
      *   _ 3 _ _ 2
      *   _ _ 3 _ _
      *   _ P _ P _
      *
      * has two completed regions ("1" and "2")
      */
    const solveGrid = new Grid<SolveCell>(5, 4, [
      [1, null, null, null, 2],
      [null, 3, null, null, 2],
      [null, null, 3, null, null],
      [null, GridCell.POLY, null, GridCell.POLY, null],
    ]);

    const puzzle = new SolvingPuzzle(new HintedPuzzle(5, 4, 5), solveGrid);

    const completedRegionsBySize = puzzle.completeRegions();

    expect(completedRegionsBySize.size).to.equal(2);

    expect(completedRegionsBySize.get(1)).to.not.be.null;
    expect(completedRegionsBySize.get(2)).to.not.be.null;
  });

});