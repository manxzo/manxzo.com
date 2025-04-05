"use client";

import Dock from "../ReactBits/Components/Dock/Dock";
import {
    HomeIcon, FolderIcon, UserCircle, BriefcaseIcon,
    AwardIcon, MessageSquareIcon, StarIcon,CodeXml
} from "lucide-react";
import { useRouter } from "next/navigation";

const AdminDock = () => {
    const router = useRouter();

    const items = [
        {
            icon: <HomeIcon />,
            label: 'Dashboard',
            onClick: () => router.push('/my/admin/dashboard')
        },
        {
            icon: <UserCircle />,
            label: 'Profile',
            onClick: () => router.push('/my/admin/profile')
        },
        {
            icon: <FolderIcon />,
            label: 'Posts',
            onClick: () => router.push('/my/admin/posts')
        },
        {
            icon: <BriefcaseIcon />,
            label: 'Experience',
            onClick: () => router.push('/my/admin/experience')
        },
        {
            icon: <AwardIcon />,
            label: 'Skills',
            onClick: () => router.push('/my/admin/skills')
        },
        {
            icon: <MessageSquareIcon />,
            label: 'Messages',
            onClick: () => router.push('/my/admin/messages')
        },{
            icon: <CodeXml />,
            label: 'Projects',
            onClick: () => router.push('/my/admin/projects')
        },
        {
            icon: <StarIcon />,
            label: 'Featured',
            onClick: () => router.push('/my/admin/featured')
        },
        
    ];

    return <Dock items={items} />;
};

export default AdminDock;