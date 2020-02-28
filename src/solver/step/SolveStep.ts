import { SolvingPuzzle } from "../SolvingPuzzle";



export interface SolveStep {

    solveStep(puzzle: SolvingPuzzle): void;

}