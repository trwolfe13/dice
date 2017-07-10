import { NodeType } from "../../src/ast/node-type";
import { Token, TokenType } from "../../src/lexer";
import * as Parser from "../../src/parser";
import { MockLexer } from "../helpers/mock-lexer";

describe("DiceParser", () => {
    describe("parseCriticalModifier", () => {
        it("can correctly parse a critical modifier (c).", () => {
            const lexer = new MockLexer([
                new Token(TokenType.Identifier, 0, "c")
            ]);
            const parser = new Parser.DiceParser(lexer);
            const mod = parser.parseCriticalModifier();
            expect(mod.type).toBe(NodeType.Critical);
            expect(mod.getAttribute("type")).toBe("success");
        });
        it("can correctly parse a critical modifier (cs).", () => {
            const lexer = new MockLexer([
                new Token(TokenType.Identifier, 0, "cs")
            ]);
            const parser = new Parser.DiceParser(lexer);
            const mod = parser.parseCriticalModifier();
            expect(mod.type).toBe(NodeType.Critical);
            expect(mod.getAttribute("type")).toBe("success");
        });
        it("can correctly parse a critical modifier (cf).", () => {
            const lexer = new MockLexer([
                new Token(TokenType.Identifier, 0, "cf")
            ]);
            const parser = new Parser.DiceParser(lexer);
            const mod = parser.parseCriticalModifier();
            expect(mod.type).toBe(NodeType.Critical);
            expect(mod.getAttribute("type")).toBe("failure");
        });
        it("can correctly parse a critical modifier with a compare point(cf<3).", () => {
            const lexer = new MockLexer([
                new Token(TokenType.Identifier, 0, "cf"),
                new Token(TokenType.Less, 2, "<"),
                new Token(TokenType.Integer, 3, "3")
            ]);
            const parser = new Parser.DiceParser(lexer);
            const mod = parser.parseCriticalModifier();
            expect(mod.type).toBe(NodeType.Critical);
            expect(mod.getAttribute("type")).toBe("failure");
            expect(mod.getChildCount()).toBe(1);
            expect(mod.getChild(0).type).toBe(NodeType.Less);
        });
    });
});