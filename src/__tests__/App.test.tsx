import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("renders theme toggle button", () => {
	render(<App />);
	const toggle = screen.getByRole("button", { name: /toggle theme/i });
	expect(toggle).toBeTruthy();
});

test("renders Counter component", () => {
	render(<App />);
	expect(screen.getByText("0")).toBeTruthy();
});

test("theme toggle switches between sun and moon icons", async () => {
	render(<App />);
	const toggle = screen.getByRole("button", { name: /toggle theme/i });

	const hasMoon =
		toggle.querySelector("svg")?.getAttribute("viewBox") === "0 0 24 24";
	expect(hasMoon).toBe(true);

	await userEvent.click(toggle);

	const hasSun =
		toggle.querySelector("svg")?.getAttribute("viewBox") === "0 0 24 24";
	expect(hasSun).toBe(true);
});
