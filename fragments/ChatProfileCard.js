import React, { useState , useEffect} from "react";
import Image from "next/image";
import bg_img_icon from "../img/bg_img_icon.svg";
import alarm from "../img/alarm.svg";
import user2 from "../img/user2.png";
import edit_pen from "../img/edit_pen.svg";
import copy_icon from "../img/copy_icon.svg";
import cancel_icon from "../img/cancel_icon.svg";
import ethicon from "../img/eth-icon.svg";
import eth_main_img from "../img/eth_main_img.svg";
import lens_main_img from "../img/lens_main_img.svg";
import embed_icon from "../img/embed-icon.svg";
import report_icon from "../img/report_icon.svg";
import styles from "../styles/chat.module.css";
import { useRouter } from "next/router";
function ChatProfileCard({ setShowDropdown }) {
  const router = useRouter();
  const [notifStatus, setNotifStatus] = useState(true);

  return (
    <div className={styles.chatDropdownMain}>
      <div className={styles.dropdownHeader}>
        <p>User Info</p>
        <Image
          className={styles.cancel_icon}
          alt=""
          src={cancel_icon}
          onClick={() => setShowDropdown(false)}
        />
      </div>
      <div className={styles.ellipseParentDropdown}>
        <Image className={styles.frameChild} alt="" src={user2} />
        <div className={styles.sunnndayyyParent}>
          <div className={styles.sunnndayyy}>Sunnndayyy</div>
          <div className={styles.ellipseGroup}>
            <Image className={styles.ethIcon} alt="" src={ethicon} />
            <div className={styles.xf4844ab5b4fc}>0xf4844ab5b4fc</div>
            <Image className={styles.copy_icon} alt="" src={copy_icon} />
          </div>
          <p>Socks and Crocs</p>
        </div>
      </div>
      <div className={styles.dropdownPaymentDivContainer}>
        <div className={styles.dropdownPaymentDiv}>
          <p>sunnndayyy.eth</p>
          <Image className={styles.frameChild} alt="" src={eth_main_img} />
        </div>
        <div className={styles.dropdownPaymentDiv}>
          <p>sunnndayyy.lens</p>
          <Image className={styles.frameChild} alt="" src={lens_main_img} />
        </div>
      </div>

      <div className={styles.dropdownDivider} />
      <div className={styles.dropdownRename}>
        <Image className={styles.frameChildSmall} alt="" src={edit_pen} />

        <div className={styles.dropdownRenameRight}>
          <div className={styles.dropdownRenameRightChild}>
            <p>@sunnndayyy</p>
            <p>Username</p>
            <p onClick={() => router.push("/username")} className={styles.renameBtn}>Rename</p>
          </div>
        </div>
      </div>

      <div className={styles.dropdownRenameSecond}>
        <Image className={styles.frameChildSmall} alt="" src={alarm} />

        <div className={styles.dropdownRenameRight}>
          <div className={styles.dropdownRenameRightChild}>
            <p></p>
            <p>Notifications</p>
          </div>
          <div>
            <div
              className={styles.toggleButtonContainer}
              style={{
                transition: "0.45s ease",
                background:  notifStatus ? "#00E467" : "#000",
              }}
              onClick={() => setNotifStatus(!notifStatus)}
            >
              <div
                className={styles.toggleButtonChild}
                style={{
                  marginLeft: notifStatus ? 0 : "14px",
                  transition: "0.45s ease",
                  marginTop: "1px",

                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.dropdownRenameSecond}>
        <Image className={styles.frameChildSmall} alt="" src={bg_img_icon} />

        <div className={styles.dropdownRenameRight}>
          <div className={styles.dropdownRenameRightChild}>
            <p></p>
            <p> 0 Images</p>
          </div>
        </div>
      </div>

      <div className={styles.dropdownRenameSecond}>
        <Image className={styles.frameChildSmall} alt="" src={embed_icon} />

        <div className={styles.dropdownRenameRight}>
          <div className={styles.dropdownRenameRightChild}>
            <p></p>
            <p> 0 Shared Links</p>
          </div>
        </div>
      </div>

      <div className={styles.dropdownRenameSecond}>
        <Image className={styles.frameChildSmall} alt="" src={report_icon} />

        <div className={styles.dropdownRenameRight}>
          <div className={styles.dropdownRenameRightChild}>
            <p></p>
            <p>Report</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatProfileCard;
