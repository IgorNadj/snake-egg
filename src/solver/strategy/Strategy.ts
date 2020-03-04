import { SolvingPuzzle } from "../SolvingPuzzle";



export interface Strategy {

    solve(puzzle: SolvingPuzzle): SolvingPuzzle;

}