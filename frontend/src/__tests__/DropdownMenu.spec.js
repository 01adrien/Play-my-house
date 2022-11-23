import { fireEvent, render, screen } from "@testing-library/react";
import { items } from "./fixtures/menuItems";
import DropdownMenu from "../components/nav/DropdownMenu";

describe("Dropdown menu", () => {
  it("should display the correct category of instruments when hover on", () => {
    render(<DropdownMenu />);
  });
});
