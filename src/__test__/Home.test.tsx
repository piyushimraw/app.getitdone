import { expect, test } from "vitest";
import { render, screen, within } from "@testing-library/react";
import Home from "../app/page";

test("home", () => {
  render(<Home />);
  const main = within(screen.getByTestId("main"));
  expect(main.getByTestId("heading")).toBeDefined();
});
