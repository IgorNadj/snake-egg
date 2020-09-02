import {Strategy} from "./Strategy";
import {SolvingPuzzle} from "../SolvingPuzzle";
import {OrthogonalDirections, OrthogonalTransforms} from "../../grid/Grid";
import {GridCell} from "../../Puzzle";


export class WrapCompletedPolyWithSnake implements Strategy {

    public solve(puzzle: SolvingPuzzle): SolvingPuzzle {

        for (const [size, region] of puzzle.completeRegions()) {

            for(const completedCell of region.cells) {

                for (const direction in OrthogonalDirections) {
                    const adjacentCell = completedCell.add(OrthogonalTransforms[direction]);

                    puzzle = puzzle.solve(adjacentCell.x, adjacentCell.y, GridCell.SNAKE);
                }
            }
        }

        return puzzle;
    }



}