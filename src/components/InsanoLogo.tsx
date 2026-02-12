import insanoLogo from "@/assets/insano-logo.png";

interface InsanoLogoProps {
  size?: number;
  className?: string;
}

const InsanoLogo = ({ size = 40, className = "" }: InsanoLogoProps) => {
  return (
    <div
      className={`rounded-full overflow-hidden flex items-center justify-center bg-primary ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src={insanoLogo}
        alt="INSANO"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default InsanoLogo;
