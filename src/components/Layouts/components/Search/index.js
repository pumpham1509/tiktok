import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HTippy from "@tippyjs/react/headless";
import axios from "axios";

import styles from "./Search.module.scss";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import {
	faMagnifyingGlass,
	faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import "tippy.js/dist/tippy.css";

import { Wrapper as PopperWrapper } from "~/components/Popper";
import AccountItem from "~/components/AccountItem";
import { useDebounce } from "~/Hooks";

const cx = classNames.bind(styles);

function Search() {
	const [inputSearch, setInputSearch] = useState("");
	const [searchResult, setSearchResult] = useState([]);
	const [showResult, setShowResult] = useState(true);
	const [loading, setLoading] = useState(false);

	const inputSearchRef = useRef();
    const debounce = useDebounce(inputSearch, 500)

	useEffect(() => {
		if (!debounce.trim()) {
			setSearchResult([]);
			return;
		}
		setLoading(true);
		axios(
			`https://tiktok.fullstack.edu.vn/api/users/search`,{
                params:{
                    q: debounce,
                    type: "less"
                }
            }
		)
			.then((res) => {
				setSearchResult(res.data.data);
				setLoading(false);
			})
			.catch(() => {
				setLoading(false);
			});
	}, [debounce]);

	const handleSearch = (value) => setInputSearch(value);

	const handleClear = () => {
		setInputSearch("");
		setSearchResult([]);
		inputSearchRef.current.focus();
	};

	const handleClickOutside = () => {
		setShowResult(false);
	};
	return (
		<HTippy
			interactive
			visible={showResult && searchResult.length > 0}
			render={(attrs) => (
				<div className={cx("search-result")} tabIndex="-1" {...attrs}>
					<PopperWrapper>
						<h4 className={cx("search-title")}>Acount Item</h4>
						{searchResult.map((result) => (
							<AccountItem
								key={result.id}
								data={result}
							></AccountItem>
						))}
					</PopperWrapper>
				</div>
			)}
			onClickOutside={handleClickOutside}
		>
			<div className={cx("search")}>
				<input
					ref={inputSearchRef}
					className={cx("search-input")}
					placeholder="Search account or video"
					spellCheck={false}
					onChange={(e) => handleSearch(e.target.value)}
					value={inputSearch}
					onFocus={() => setShowResult(true)}
				/>
				{!!inputSearch && !loading && (
					<button className={cx("clear")} onClick={handleClear}>
						<FontAwesomeIcon icon={faCircleXmark}></FontAwesomeIcon>
					</button>
				)}
				{loading && (
					<FontAwesomeIcon
						className={cx("loading")}
						icon={faSpinner}
					></FontAwesomeIcon>
				)}
				<button className={cx("search-btn")}>
					<FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
				</button>
			</div>
		</HTippy>
	);
}

export default Search;
