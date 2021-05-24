import dataUtilities from "../util/data.util";

test('group by property (array => object hash)', () => {
    let result = dataUtilities.groupBy([
        { a: "left", b: "no" },
        { a: "left", b: "yes"},
        { a: "right", b: "yes"}], i => i.a);

    expect(result).toStrictEqual({
        "left": [{ a: "left", b: "no" },{ a: "left", b: "yes"}],
        "right": [{ a: "right", b: "yes"}]
    })
});