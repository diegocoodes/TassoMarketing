"use client";

/* eslint-disable @next/next/no-img-element */
import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type Key,
  type ReactNode,
  type RefObject,
} from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import "./LogoLoop.css";

const ANIMATION_CONFIG = {
  SMOOTH_TAU: 0.25,
  MIN_COPIES: 2,
  COPY_HEADROOM: 2,
} as const;

type ImageLogoItem = {
  src: string;
  srcSet?: string;
  sizes?: string;
  width?: number;
  height?: number;
  alt?: string;
  title?: string;
  href?: string;
};

type NodeLogoItem = {
  node: ReactNode;
  title?: string;
  ariaLabel?: string;
  href?: string;
};

export type LogoItem = ImageLogoItem | NodeLogoItem;

type LogoLoopProps = {
  logos: LogoItem[];
  speed?: number;
  direction?: "left" | "right" | "up" | "down";
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  hoverSpeed?: number;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  renderItem?: (item: LogoItem, key: Key) => ReactNode;
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
};

type LogoLoopCssProperties = CSSProperties & {
  "--logoloop-gap": string;
  "--logoloop-logoHeight": string;
  "--logoloop-fadeColor"?: string;
};

const toCssLength = (value: number | string | undefined) =>
  typeof value === "number" ? `${value}px` : value;

function useResizeObserver(
  callback: () => void,
  elements: RefObject<HTMLElement | null>[],
  dependencies: readonly unknown[],
) {
  useEffect(() => {
    const scheduleUpdate = () => window.requestAnimationFrame(callback);

    if (!window.ResizeObserver) {
      window.addEventListener("resize", scheduleUpdate);
      const frame = scheduleUpdate();
      return () => {
        window.removeEventListener("resize", scheduleUpdate);
        window.cancelAnimationFrame(frame);
      };
    }

    const observers = elements.map((ref) => {
      if (!ref.current) return null;
      const observer = new ResizeObserver(scheduleUpdate);
      observer.observe(ref.current);
      return observer;
    });
    const frame = scheduleUpdate();

    return () => {
      observers.forEach((observer) => observer?.disconnect());
      window.cancelAnimationFrame(frame);
    };
    // The caller supplies the values that affect element dimensions.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, elements, ...dependencies]);
}

function useImageLoader(
  seqRef: RefObject<HTMLUListElement | null>,
  onLoad: () => void,
  dependencies: readonly unknown[],
) {
  useEffect(() => {
    const images = seqRef.current?.querySelectorAll("img") ?? [];
    if (images.length === 0) {
      const frame = window.requestAnimationFrame(onLoad);
      return () => window.cancelAnimationFrame(frame);
    }

    let remainingImages = images.length;
    const handleImageLoad = () => {
      remainingImages -= 1;
      if (remainingImages === 0) onLoad();
    };

    images.forEach((image) => {
      if (image.complete) {
        handleImageLoad();
      } else {
        image.addEventListener("load", handleImageLoad, { once: true });
        image.addEventListener("error", handleImageLoad, { once: true });
      }
    });

    return () => {
      images.forEach((image) => {
        image.removeEventListener("load", handleImageLoad);
        image.removeEventListener("error", handleImageLoad);
      });
    };
    // The caller supplies the values that can replace or resize images.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onLoad, seqRef, ...dependencies]);
}

function useAnimationLoop(
  trackRef: RefObject<HTMLDivElement | null>,
  targetVelocity: number,
  seqWidth: number,
  seqHeight: number,
  isHovered: boolean,
  hoverSpeed: number | undefined,
  isVertical: boolean,
  reducedMotion: boolean,
) {
  const rafRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);
  const isVisibleRef = useRef(true);
  const isDocumentVisibleRef = useRef(true);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const seqSize = isVertical ? seqHeight : seqWidth;
    if (seqSize > 0) {
      offsetRef.current = ((offsetRef.current % seqSize) + seqSize) % seqSize;
      track.style.transform = isVertical
        ? `translate3d(0, ${-offsetRef.current}px, 0)`
        : `translate3d(${-offsetRef.current}px, 0, 0)`;
    }

    if (reducedMotion) return;

    isDocumentVisibleRef.current = document.visibilityState === "visible";

    const handleVisibilityChange = () => {
      isDocumentVisibleRef.current = document.visibilityState === "visible";
      lastTimestampRef.current = null;
    };

    const observer =
      "IntersectionObserver" in window
        ? new IntersectionObserver(([entry]) => {
            isVisibleRef.current = entry.isIntersecting;
            lastTimestampRef.current = null;
          })
        : null;

    observer?.observe(track);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const animate = (timestamp: number) => {
      if (lastTimestampRef.current === null) lastTimestampRef.current = timestamp;

      const deltaTime =
        Math.max(0, timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;
      const target =
        isHovered && hoverSpeed !== undefined ? hoverSpeed : targetVelocity;
      const easingFactor =
        1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
      velocityRef.current += (target - velocityRef.current) * easingFactor;

      if (seqSize > 0 && isVisibleRef.current && isDocumentVisibleRef.current) {
        let nextOffset = offsetRef.current + velocityRef.current * deltaTime;
        nextOffset = ((nextOffset % seqSize) + seqSize) % seqSize;
        offsetRef.current = nextOffset;
        track.style.transform = isVertical
          ? `translate3d(0, ${-nextOffset}px, 0)`
          : `translate3d(${-nextOffset}px, 0, 0)`;
      }

      rafRef.current = window.requestAnimationFrame(animate);
    };

    rafRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
      observer?.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      rafRef.current = null;
      lastTimestampRef.current = null;
    };
  }, [
    targetVelocity,
    seqWidth,
    seqHeight,
    isHovered,
    hoverSpeed,
    isVertical,
    trackRef,
    reducedMotion,
  ]);
}

export const LogoLoop = memo(function LogoLoop({
  logos,
  speed = 120,
  direction = "left",
  width = "100%",
  logoHeight = 28,
  gap = 32,
  pauseOnHover,
  hoverSpeed,
  fadeOut = false,
  fadeOutColor,
  scaleOnHover = false,
  renderItem,
  ariaLabel = "Partner logos",
  className,
  style,
}: LogoLoopProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const seqRef = useRef<HTMLUListElement>(null);
  const observedRefs = useMemo(
    () => [containerRef, seqRef] as RefObject<HTMLElement | null>[],
    [],
  );
  const reducedMotion = useReducedMotion();
  const [seqWidth, setSeqWidth] = useState(0);
  const [seqHeight, setSeqHeight] = useState(0);
  const [copyCount, setCopyCount] = useState<number>(
    ANIMATION_CONFIG.MIN_COPIES,
  );
  const [isHovered, setIsHovered] = useState(false);

  const effectiveHoverSpeed = useMemo(() => {
    if (hoverSpeed !== undefined) return hoverSpeed;
    if (pauseOnHover === true) return 0;
    if (pauseOnHover === false) return undefined;
    return 0;
  }, [hoverSpeed, pauseOnHover]);

  const isVertical = direction === "up" || direction === "down";
  const targetVelocity = useMemo(() => {
    const magnitude = Math.abs(speed);
    const directionMultiplier = isVertical
      ? direction === "up"
        ? 1
        : -1
      : direction === "left"
        ? 1
        : -1;
    return magnitude * directionMultiplier * (speed < 0 ? -1 : 1);
  }, [speed, direction, isVertical]);

  const updateDimensions = useCallback(() => {
    const containerWidth = containerRef.current?.clientWidth ?? 0;
    const sequenceRect = seqRef.current?.getBoundingClientRect();
    const sequenceWidth = sequenceRect?.width ?? 0;
    const sequenceHeight = sequenceRect?.height ?? 0;

    if (isVertical) {
      const parentHeight = containerRef.current?.parentElement?.clientHeight ?? 0;
      if (containerRef.current && parentHeight > 0) {
        containerRef.current.style.height = `${Math.ceil(parentHeight)}px`;
      }
      if (sequenceHeight > 0) {
        setSeqHeight(Math.ceil(sequenceHeight));
        const viewport = containerRef.current?.clientHeight || parentHeight;
        setCopyCount(
          Math.max(
            ANIMATION_CONFIG.MIN_COPIES,
            Math.ceil(viewport / sequenceHeight) +
              ANIMATION_CONFIG.COPY_HEADROOM,
          ),
        );
      }
    } else if (sequenceWidth > 0) {
      setSeqWidth(Math.ceil(sequenceWidth));
      setCopyCount(
        Math.max(
          ANIMATION_CONFIG.MIN_COPIES,
          Math.ceil(containerWidth / sequenceWidth) +
            ANIMATION_CONFIG.COPY_HEADROOM,
        ),
      );
    }
  }, [isVertical]);

  useResizeObserver(updateDimensions, observedRefs, [
    logos,
    gap,
    logoHeight,
    isVertical,
  ]);
  useImageLoader(seqRef, updateDimensions, [logos, gap, logoHeight, isVertical]);
  useAnimationLoop(
    trackRef,
    targetVelocity,
    seqWidth,
    seqHeight,
    isHovered,
    effectiveHoverSpeed,
    isVertical,
    reducedMotion,
  );

  const cssVariables = useMemo<LogoLoopCssProperties>(
    () => ({
      "--logoloop-gap": `${gap}px`,
      "--logoloop-logoHeight": `${logoHeight}px`,
      ...(fadeOutColor && { "--logoloop-fadeColor": fadeOutColor }),
    }),
    [gap, logoHeight, fadeOutColor],
  );

  const rootClassName = [
    "logoloop",
    isVertical ? "logoloop--vertical" : "logoloop--horizontal",
    fadeOut && "logoloop--fade",
    scaleOnHover && "logoloop--scale-hover",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const renderLogoItem = useCallback(
    (item: LogoItem, key: Key) => {
      if (renderItem) {
        return (
          <li className="logoloop__item" key={key} role="listitem">
            {renderItem(item, key)}
          </li>
        );
      }

      const isNodeItem = "node" in item;
      const content = isNodeItem ? (
        <span
          className="logoloop__node"
          aria-hidden={Boolean(item.href && !item.ariaLabel)}
        >
          {item.node}
        </span>
      ) : (
        <img
          src={item.src}
          srcSet={item.srcSet}
          sizes={item.sizes}
          width={item.width}
          height={item.height}
          alt={item.alt ?? ""}
          title={item.title}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      );
      const itemAriaLabel = isNodeItem
        ? item.ariaLabel ?? item.title
        : item.alt ?? item.title;

      return (
        <li className="logoloop__item" key={key} role="listitem">
          {item.href ? (
            <a
              className="logoloop__link"
              href={item.href}
              aria-label={itemAriaLabel || "Logo link"}
              target="_blank"
              rel="noreferrer noopener"
            >
              {content}
            </a>
          ) : (
            content
          )}
        </li>
      );
    },
    [renderItem],
  );

  const logoLists = useMemo(
    () =>
      Array.from({ length: copyCount }, (_, copyIndex) => (
        <ul
          className="logoloop__list"
          key={`copy-${copyIndex}`}
          role="list"
          aria-hidden={copyIndex > 0}
          ref={copyIndex === 0 ? seqRef : undefined}
        >
          {logos.map((item, itemIndex) =>
            renderLogoItem(item, `${copyIndex}-${itemIndex}`),
          )}
        </ul>
      )),
    [copyCount, logos, renderLogoItem],
  );

  const containerStyle: CSSProperties = {
    width: isVertical
      ? toCssLength(width) === "100%"
        ? undefined
        : toCssLength(width)
      : toCssLength(width) ?? "100%",
    ...cssVariables,
    ...style,
  };

  return (
    <div
      ref={containerRef}
      className={rootClassName}
      style={containerStyle}
      role="region"
      aria-label={ariaLabel}
    >
      <div
        className="logoloop__track"
        ref={trackRef}
        onMouseEnter={() => {
          if (effectiveHoverSpeed !== undefined) setIsHovered(true);
        }}
        onMouseLeave={() => {
          if (effectiveHoverSpeed !== undefined) setIsHovered(false);
        }}
      >
        {logoLists}
      </div>
    </div>
  );
});

LogoLoop.displayName = "LogoLoop";

export default LogoLoop;
