import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Counter from "components/Counter";

beforeEach(() => {
	localStorage.clear();
});

test("renders initial count of 0", () => {
	render(<Counter />);
	expect(screen.getByText("0")).toBeTruthy();
});

test("increments count when + button is clicked", async () => {
	render(<Counter />);
	const button = screen.getByRole("button", { name: /increment/i });

	await userEvent.click(button);
	expect(screen.getByText("1")).toBeTruthy();

	await userEvent.click(button);
	expect(screen.getByText("2")).toBeTruthy();
});

test("persists count to localStorage", async () => {
	render(<Counter />);
	const button = screen.getByRole("button", { name: /increment/i });

	await userEvent.click(button);
	await userEvent.click(button);
	await userEvent.click(button);

	expect(localStorage.getItem("counter")).toBe("3");
});

test("reset button is disabled when count is 0", () => {
	render(<Counter />);
	const resetBtn = screen.getByRole("button", { name: /reset/i });
	expect(resetBtn.getAttribute("disabled")).not.toBeNull();
});

test("reset button is enabled when count > 0", async () => {
	render(<Counter />);
	await userEvent.click(screen.getByRole("button", { name: /increment/i }));

	const resetBtn = screen.getByRole("button", { name: /reset/i });
	expect(resetBtn.getAttribute("disabled")).toBeNull();
});

test("reset sets count back to 0", async () => {
	render(<Counter />);

	await userEvent.click(screen.getByRole("button", { name: /increment/i }));
	await userEvent.click(screen.getByRole("button", { name: /increment/i }));
	await userEvent.click(screen.getByRole("button", { name: /increment/i }));

	expect(screen.getByText("3")).toBeTruthy();

	await userEvent.click(screen.getByRole("button", { name: /reset/i }));
	expect(screen.getByText("0")).toBeTruthy();
});

test("restores count from localStorage on mount", () => {
	localStorage.setItem("counter", "42");
	render(<Counter />);
	expect(screen.getByText("42")).toBeTruthy();
});
