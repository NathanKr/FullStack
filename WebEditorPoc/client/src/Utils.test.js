import Utils from "./Utils";

const tests = () => {
  //  it('*** this is a test :  check 1 equal 11',expect(11).toEqual(11));
  //  it("*** this is a test :  check 1 equal 11", expect(1).toEqual(1));
  //    it('*** this is a test :  check true is truthy',expect(true).toBeTruthy());
  it("test 3 ceo in list case not sensitive", expect(1).toEqual(1));
};



test("test f", () => {
  expect(Utils.f()).toBe(1);
});
