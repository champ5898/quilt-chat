
import Onlinemodal from "./Onlinemodal";
import { useState } from "react";
import { Avatar, Badge } from "antd";
import { UsergroupAddOutlined } from "@ant-design/icons";
import Search from "./Search";


function Header({ onSearch, setSection, online }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="relative">
      <div className="py-7 px-2 flex space-x-5">
        <div className="z-50">
          <Search
            className="z-50"
            onSearch={onSearch}
            setSection={setSection}
          />
        </div>

        <div onClick={() => setShowModal(true)} className="cursor-pointer">
          <span className="avatar-item px-2 py-2">
            <Badge count={online.length}>
              <Avatar shape="circle" icon={<UsergroupAddOutlined />} />
            </Badge>
          </span>
        </div>

        <div>
          {showModal && (
            <Onlinemodal online={online} setShowModal={setShowModal} />
          )}
        </div>

        {/* <Feed /> */}
      </div>
    </div>
  );
}

export default Header;
