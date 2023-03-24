import Onlinemodal from "./Onlinemodal";
import { useState } from "react";
import { Avatar, Badge } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Search from "./Search";
import { CheckCircleIcon } from "@heroicons/react/outline";
import { Box } from "@mui/material";

function Header({ onSearch, setSection, online }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="relative mt-16">
      <div className="py-7 px-6 flex ">
        <Box
          style={{
            display: "flex",

            paddingleft: 8,
            borderRight: "1px solid rgb(44,44,44)",
          }}
        >
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
                <Avatar shape="circle" icon={<UserOutlined />} />
              </Badge>
            </span>
          </div>
        </Box>

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
