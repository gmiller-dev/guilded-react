import { GuildedRose } from "./GuildedRose";
import "@testing-library/dom"
import "@testing-library/jest-dom"
import {render, screen} from "@testing-library/react";

describe("Guilded Rose", () => {
    it("should render", async () => {
        //Arange
        render(<GuildedRose />);
        //Assert
        expect(screen.getByRole('heading', {level: 2}).textContent).toBe('Welcome to the Guilded Rose')
    })
});