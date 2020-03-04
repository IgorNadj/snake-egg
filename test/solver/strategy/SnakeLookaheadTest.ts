import { expect } from 'chai';


describe("SnakeLookahead", () => {

  it("knows when snake cant move in a direction if it will hit an egg", () => {
    /*
    * Given puzzle:
    * 
    *   _ _ . _
    *   _ _ _ _
    *   P _ _ _ 
    * 
    * the snake cant move left (up to 4 steps needed) because it will loop on itself,
    * so we can mark the left space as poly: 
    * 
    *   _ P . _
    *   _ _ _ _
    *   P _ _ _ 
    */
  });

});