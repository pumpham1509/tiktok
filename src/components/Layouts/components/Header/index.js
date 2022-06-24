import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react";

import styles from "./Header.module.scss";
import images from "~/assets/images";
import {
	faCircleQuestion,
	faKeyboard,
	faUser,
} from "@fortawesome/free-regular-svg-icons";
import {
	faCoins,
	faEarthAsia,
	faEllipsisVertical,
	faGear,
	faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import "tippy.js/dist/tippy.css";

import Button from "~/components/Button";
import Menu from "~/components/Popper/Menu";
import { UploadIcon, MessageIcon } from "~/components/Icons";
import Image from "~/components/Image";
import Search from "../Search";

const cx = classNames.bind(styles);

const MENU_ITEMS = [
	{
		icon: <FontAwesomeIcon icon={faEarthAsia}></FontAwesomeIcon>,
		title: "England",
		children: {
			type: "language",
			title: "Language",
			data: [
				{
					code: "en",
					title: "English",
				},
				{
					code: "vi",
					title: "Tiếng Việt",
				},
			],
		},
	},
	{
		icon: <FontAwesomeIcon icon={faCircleQuestion}></FontAwesomeIcon>,
		title: "Phản hồi và trợ giúp",
		to: "/feedback",
	},
	{
		icon: <FontAwesomeIcon icon={faKeyboard}></FontAwesomeIcon>,
		title: "Phím tắt bàn phím",
	},
];

const MENU_USER = [
	{
		icon: <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>,
		title: "View Profile",
		to: "/viewprofile"
	},
	{
		icon: <FontAwesomeIcon icon={faCoins}></FontAwesomeIcon>,
		title: "Get Coins",
		to: "/getcoins"
	},
	{
		icon: <FontAwesomeIcon icon={faGear}></FontAwesomeIcon>,
		title: "Setting",
		to: "/setting"
	},
	...MENU_ITEMS,
	{
		icon: <FontAwesomeIcon icon={faSignOut}></FontAwesomeIcon>,
		title: "Setting",
		to: "/logout",
		separate: true
	},
];

const currentUser = true;

function Header() {
	return (
		<div className={cx("wrapper")}>
			<div className={cx("inner")}>
				<div className={cx("logo")}>
					<img src={images.logo} alt="tiktok" />
				</div>
				<Search></Search>

				<div className={cx("actions")}>
					{currentUser ? (
						<div>
							<Tippy
								trigger="click"
								content="Upload"
								placement="bottom"
							>
								<button className={cx("action-btn")}>
									<UploadIcon className={cx("action-btn-upload")}></UploadIcon>
								</button>
							</Tippy>

							<Tippy
								trigger="click"
								content="Message"
								placement="bottom"
							>
								<button className={cx("action-btn")}>
									<MessageIcon></MessageIcon>
								</button>
							</Tippy>
						</div>
					) : (
						<>
							<Button text>Upload</Button>
							<Button primary>Login</Button>
						</>
					)}
					<Menu items={currentUser ? MENU_USER : MENU_ITEMS}>
						{currentUser ? (
							<Image
								src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Sam_Worthington_2013.jpg/330px-Sam_Worthington_2013.jpg"
								alt="Phạm Văn Hào"
								className={cx("user-avatar")}
								fall= "https://static.fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg"
							/>
						) : (
							<button className={cx("more-btn")}>
								<FontAwesomeIcon
									icon={faEllipsisVertical}
								></FontAwesomeIcon>
							</button>
						)}
					</Menu>
				</div>
			</div>
		</div>
	);
}

export default Header;
