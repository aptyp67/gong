import { useState } from 'react'
import type { User } from '../../../types/user'
import { createInitials, formatFullName } from '../../../utils/user'

type HierarchyAvatarProps = {
  user: User
}

export function HierarchyAvatar({ user }: HierarchyAvatarProps) {
  const [isBroken, setIsBroken] = useState(false)

  if (!user.photo || isBroken) {
    return (
      <span className="hierarchy-avatar hierarchy-avatar--initials">
        {createInitials(user)}
      </span>
    )
  }

  return (
    <span className="hierarchy-avatar">
      <img
        src={user.photo}
        alt={`${formatFullName(user)} avatar`}
        onError={() => setIsBroken(true)}
        loading="lazy"
      />
    </span>
  )
}
