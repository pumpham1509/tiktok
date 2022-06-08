import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from "./AccountItem.module.scss";

const cx = classNames.bind(styles);

function AccountItem() {
	return (
		<div className={cx("wrapper")}>
			<img
				className={cx("avatar")}
				src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/6c27246710a0a15fb658c6eb296be95d~c5_300x300.webp?x-expires=1654592400&x-signature=WmXttqjm%2BZr9vPZt2dbkMvLoOpU%3D"
				alt="Avatar"
			/>
			<div className={cx("info")}>
				<p className={cx("name")}>
					<span>Pham Van Hao</span>
					<FontAwesomeIcon className={cx("check")} icon={faCircleCheck}></FontAwesomeIcon>
				</p>
				<span className={cx("user-name")}>PhamVanHao</span>
			</div>
		</div>
	);
}

export default AccountItem;
