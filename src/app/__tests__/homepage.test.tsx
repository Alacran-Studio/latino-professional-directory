import { render, screen, within } from "@testing-library/react";
import HomePage from "../page";

describe("Homepage", () => {
  it("Renders headings and tagline", () => {
    render(<HomePage />);

    const heading = screen.getAllByRole("heading", { level: 1 })[0];

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Latino Professional Directory");

    // Check for tagline
    expect(
      screen.getByText(/find local events and online career resources/i)
    ).toBeInTheDocument();

    // Check for Learn More button
    expect(screen.getByText(/learn more/i)).toBeInTheDocument();
  });
});
