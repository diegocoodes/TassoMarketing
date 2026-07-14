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
            width={44}
            height={44}
            priority
            className="h-8 w-8 object-contain"
          />
        </div>
      ) : (
        <Image
          src={siteConfig.assets.brandLogo}
          alt="Logo da Universo Marketing"
          width={340}
          height={132}
          priority
          className="h-13 w-auto object-contain"
        />
      )}
    </div>
  );

  return (
    <Link href={href} className="inline-flex items-center rounded-full">
      {mark}
    </Link>
  );
}
