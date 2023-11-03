interface ButtonProps {
  text: string;
  onClick: () => void;
}

export default function Button({ text, onClick }: ButtonProps) {
  return (
    <button
      className="w-full text-base py-2 px-4 rounded-sm font-bold bg-orange-500 text-white hover:brightness-110 "
      onClick={onClick}
    >
      {text}
    </button>
  );
}
