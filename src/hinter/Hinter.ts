import { Puzzle } from "../Puzzle";
import { HintedPuzzle, HintCell } from "./HintedPuzzle";
import { Grid } from "../Grid";


export class Hinter {

    public createHintedPuzzle(puzzle: Puzzle): HintedPuzzle {
        // Starting with all cells hinted, remove hints until the human solver cannot solve it
        // 
        // 1. For each cell, remove a hint
        //    1.1. If human solver can solve it, recurse
        //    1.2. If human solver cannot solve it, the parent is a candidate
        // 
        // 2. Pick candidate with fewest hints needed 
        return Hinter.createWithAllHints(puzzle);
    }

    // protected removeHint(hintedPuzzle: HintedPuzzle): HintedPuzzle {

    // }

    public static createWithAllHints(puzzle: Puzzle): HintedPuzzle {
        let hintGrid: Grid<HintCell> = new Grid(puzzle.width, puzzle.height);
        puzzle.placedPolyominos.forEach((poly) => {
            poly.getAbsolutePoints().forEach((point) => {
                hintGrid = hintGrid.set(point.x, point.y, poly.size);
            });
        });
        return new HintedPuzzle(puzzle.width, puzzle.height, puzzle.maxNumber, hintGrid);
    }

}