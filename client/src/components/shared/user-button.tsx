import { useCurrentUser} from "@/hooks/use-current-user";
import {Button} from "../ui/button";
import { useRouter } from 'next/navigation';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarImage } from "../ui/avatar";
import { AvatarFallback } from "../ui/avatar";
import { getDisplayName } from "next/dist/shared/lib/utils";   
import { Separator } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { Icons } from "./icons";
import { logout } from "@/lib/api";

function googleSignIn() :Promise<void> {
    return new Promise((resolve) => {
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
       resolve();
    });
}



export function UserButton() {
    const router = useRouter();
    const { user } = useCurrentUser();

    const handleLogout = async()=>{
        await logout();
        window.location.reload();
        setInterval(() => {
            router.push("/");
        }, 1000);
    };

return(<div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
    {user ? (
        <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="size-8 rounded-full">
                    <Avatar className="size-8">
                        <AvatarImage src={user?.profilePicture || ""} />
                        <AvatarFallback>
                            {user?.displayName?.charAt(0) || ""}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56" align="end"  forceMount>
                <DropdownMenuItem className="flex flex-col item-start">
                    <div className="text-sm font-medium">
                        {user?.displayName}
                    </div>

                    <div className="text-sm font-medium">
                        {user?.email}
                    </div>

                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href={"/dashboard"}>
                    <Icons.dashboard className="mr-2 size-4"/>
                    <span>Dashboard</span>
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                    <Link href={"/dashboard/settings"}>
                    <Icons.settings className="mr-2 size-4"/>
                    <span>Settings</span>
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={handleLogout}>
                <Icons.logout className="mr-2 size-4"/>
                    <span>LogOut</span>
                    
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        </>
    ):(
        <>
       <Button onClick={googleSignIn}>Sign in</Button>
        </>
    )}
</div>
);

};


