import invictusLogo from "@/assets/invictus-logo.png";

interface InvictusLogoProps {
  size?: number;
  className?: string;
}

const InvictusLogo = ({ size = 40, className = "" }: InvictusLogoProps) => {
  return (
    <div
      className={`rounded-full overflow-hidden flex items-center justify-center bg-primary ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src={invictusLogo}
        alt="INVICTUS"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default InvictusLogo;
