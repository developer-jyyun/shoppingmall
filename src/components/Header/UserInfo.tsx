interface UserInfoProps {
  user: {
    photoURL: string;
    displayName: string;
  };
}

export default function UserInfo({
  user: { photoURL, displayName },
}: UserInfoProps) {
  return (
    <div className="flex items-center gap-2 text-base mx-3 shrink-0">
      <img
        className="w-10 h-10 rounded-full"
        src={photoURL}
        alt={displayName}
      />
      <span className="hidden md:block">{displayName}</span>
    </div>
  );
}
