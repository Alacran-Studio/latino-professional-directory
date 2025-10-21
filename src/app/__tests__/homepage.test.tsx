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
      screen.getByText(/find your community and thrive as a professional/i)
    ).toBeInTheDocument();

    // Check for value proposition
    expect(
      screen.getByText(/discover organizations and events/i)
    ).toBeInTheDocument();
  });
});
