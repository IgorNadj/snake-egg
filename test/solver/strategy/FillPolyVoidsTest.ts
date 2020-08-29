import { expect } from 'chai';


describe.skip("FillPolyVoids", () => {

  it("fills corner spaces that cant contain snake", () => {
    /*
    * Given puzzle:
    * 
    *   _ P _ _
    *   _ _ _ .
    *   _ _ . . 
    * 
    * the snake cant ever reach the top left corner, so it must be a poly: 
    * 
    *   P P _ _
    *   _ _ _ .
    *   _ _ . . 
    */
  });

  it("fills poly holes that cant contain snake", () => {
    /*
    * Given puzzle:
    * 
    *   P P P .
    *   P _ P .
    *   _ _ _ . 
    * 
    * the snake cant ever reach the middle of the poly, so it must be filled: 
    * 
    *   P P P .
    *   P P P .
    *   _ _ _ . 
    */
  });

});