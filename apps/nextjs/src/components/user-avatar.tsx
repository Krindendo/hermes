import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@hermes/ui/components/avatar";
import type { AvatarProps } from "@hermes/ui/components/avatar";
import { Icons } from "@hermes/ui/components/Icons";

import type { User } from "~/types/user";

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "image" | "name">;
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {user.image ? (
        <>
          <AvatarImage alt={user.name} src={user.image} />
          <AvatarFallback>{user.name?.slice(2).toUpperCase()}</AvatarFallback>
        </>
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user.name}</span>
          <Icons.user className="h-4 w-4" />
        </AvatarFallback>
      )}
    </Avatar>
  );
}
