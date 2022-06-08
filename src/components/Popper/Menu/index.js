import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import styles from "./Menu.module.scss";

import { Wrapper as PopperWrapper } from "~/components/Popper";
import RenderItem from "./renderItem";
import Header from "./Header";
import { useState } from "react";

const cx = classNames.bind(styles);

const defaultOnChange = () => {};

function Menu({ children, items = [], onChange = defaultOnChange }) {
	const [history, setHistory] = useState([{ data: items }]);
	const current = history[history.length - 1];

	const renderItem = () => {
		return current.data.map((item, index) => {
			const isParent = !!item.children;
			return (
				<RenderItem
					key={index}
					data={item}
					onClick={() => {
						if (isParent) {
							setHistory((prev) => [...prev, item.children]);
						}else{
							onChange()
						}
					}}
				></RenderItem>
			);
		});
	};
	return (
		<Tippy
			interactive
			delay={[0, 500]}
			placement="bottom-end"
			render={(attrs) => (
				<div className={cx("menu-list")} tabIndex="-1" {...attrs}>
					<PopperWrapper className={cx("menu-popper")}>
						{history.length > 1 && (
							<Header
								title="Language"
								onBack={() => {
									setHistory((prev) =>
										prev.slice(0, prev.length - 1)
									);
								}}
							></Header>
						)}
						{renderItem()}
					</PopperWrapper>
				</div>
			)}
			onHidden={() =>
				setHistory((prev) => prev.slice(0, 1))
			}
		>
			{children}
		</Tippy>
	);
}

export default Menu;
