"use client";

import Dock from "../ReactBits/Components/Dock/Dock";
import { HomeIcon,ArchiveIcon,UserCircle,SettingsIcon } from "lucide-react";
const CasualDock = () => {
   
    const items = [
        { icon: <HomeIcon />, label: 'Home', onClick: () =>null },
        { icon: <ArchiveIcon />, label: 'Archive', onClick: () => null},
        { icon: <UserCircle />, label: 'Profile', onClick: () => null },
        { icon: <SettingsIcon />, label: 'Settings', onClick: () => null },
    ];
    return <Dock items={items} />;
};

export default CasualDock;
