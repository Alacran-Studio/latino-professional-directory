import { render, screen, within } from "@testing-library/react";
import HomePage from "../page";

describe("Homepage", () => {
  it("Renders headings", () => {
    render(<HomePage />);

    const heading = screen.getAllByRole("heading", { level: 1 })[0];
    const subheading = screen.getAllByRole("heading", { level: 2 })[0];

    expect(heading).toBeInTheDocument();
    expect(subheading).toBeInTheDocument();

    expect(heading).toHaveTextContent(
      "Latiné Professional Development Directory"
    );
    expect(subheading).toHaveTextContent(/find your community/i);
  });
});
