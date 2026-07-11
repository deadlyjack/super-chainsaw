import { useCallback, useEffect, useState } from "react";
import "./Counter.scss";

export default function Counter() {
	const [count, setCount] = useState(() => {
		const saved = localStorage.getItem("counter");
		return saved ? Number.parseInt(saved, 10) : 0;
	});
	const [animating, setAnimating] = useState(false);

	useEffect(() => {
		localStorage.setItem("counter", String(count));
	}, [count]);

	const increment = useCallback(() => {
		setCount((c) => c + 1);
		setAnimating(true);
		setTimeout(() => setAnimating(false), 150);
	}, []);

	const reset = useCallback(() => {
		setCount(0);
	}, []);

	return (
		<div className="counter">
			<div
				className={`counter__value ${animating ? "counter__value--pop" : ""}`}
			>
				{count}
			</div>
			<button
				type="button"
				className="counter__button"
				onClick={increment}
				aria-label="Increment"
			>
				+
			</button>
			<button
				type="button"
				className="counter__reset"
				onClick={reset}
				disabled={count === 0}
				aria-label="Reset count"
			>
				Reset
			</button>
		</div>
	);
}
