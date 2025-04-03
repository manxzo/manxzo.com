"use client";

import Dock from "../ReactBits/Components/Dock/Dock";
import { HomeIcon,ArchiveIcon,UserCircle,SettingsIcon } from "lucide-react";
import { addToast } from "@heroui/react";
const MyDock = () => {
   
    const items = [
        { icon: <HomeIcon />, label: 'Home', onClick: () =>addToast({
            title: 'Hello',
            description: 'This is a toast',
            variant: 'solid',
        }) },
        { icon: <ArchiveIcon />, label: 'Archive', onClick: () => addToast({
            title: 'Hello',
            description: 'This is a toast',
            variant: 'solid',
        })},
        { icon: <UserCircle />, label: 'Profile', onClick: () => addToast({
            title: 'Hello',
            description: 'This is a toast',
            variant: 'solid',
        })},
        { icon: <SettingsIcon />, label: 'Settings', onClick: () => addToast({
            title: 'Hello',
            description: 'This is a toast',
            variant: 'solid',
        })},
    ];
    return <Dock items={items} />;
};

export default MyDock;
