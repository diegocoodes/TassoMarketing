import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

type BrandMarkProps = {
  compact?: boolean;
  href?: string;
};

export function BrandMark({ compact = false, href = "/" }: BrandMarkProps) {
  const mark = (
    <div className="flex items-center gap-3">
      {compact ? (
        <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-[rgba(245,169,0,0.2)] bg-[linear-gradient(180deg,rgba(245,169,0,0.14),rgba(255,255,255,0.03))]">
          <Image
            src={siteConfig.assets.brandIcon}
            alt="Ícone da Universo Marketing"
            fill
            sizes="44px"
            className="scale-[2.4] object-contain object-center"
          />
        </div>
      ) : (
        <div className="relative h-14 w-44 overflow-hidden md:h-16 md:w-52">
          <Image
            src={siteConfig.assets.brandLogo}
            alt="Logo da Universo Marketing"
            fill
            sizes="(min-width: 768px) 208px, 176px"
            className="object-cover object-[center_46%]"
          />
        </div>
      )}
    </div>
  );

  return (
    <Link href={href} className="inline-flex items-center rounded-full">
      {mark}
    </Link>
  );
}
