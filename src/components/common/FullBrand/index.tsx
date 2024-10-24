import Image from "next/image";

export const FullBrand = () => {
  return (
    <>
      <Image
        src="/logo.svg"
        width={40}
        height={40}
        alt="Logo for Latiné Professional Development Directory"
      />
      <p className="text-xl tracking-tighter">LPDD</p>
    </>
  );
};
