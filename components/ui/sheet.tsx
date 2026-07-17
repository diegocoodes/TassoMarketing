"use client"

import * as React from "react"
import { XIcon } from "lucide-react"
import { Dialog as SheetPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Sheet(props: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger(
  props: React.ComponentProps<typeof SheetPrimitive.Trigger>,
) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose(props: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal(props: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-[70] bg-black/72 backdrop-blur-[3px] data-[state=open]:animate-[sheet-overlay-in_220ms_ease-out] data-[state=closed]:animate-[sheet-overlay-out_180ms_ease-in] motion-reduce:animate-none",
        className,
      )}
      {...props}
    />
  )
}

const sideClasses = {
  top: "inset-x-0 top-0 max-h-[90dvh] border-b data-[state=open]:animate-[sheet-top-in_320ms_cubic-bezier(0.22,1,0.36,1)] data-[state=closed]:animate-[sheet-top-out_220ms_ease-in]",
  right:
    "inset-y-0 right-0 h-dvh w-[min(92vw,26rem)] border-l data-[state=open]:animate-[sheet-right-in_360ms_cubic-bezier(0.22,1,0.36,1)] data-[state=closed]:animate-[sheet-right-out_240ms_ease-in]",
  bottom:
    "inset-x-0 bottom-0 max-h-[90dvh] border-t data-[state=open]:animate-[sheet-bottom-in_320ms_cubic-bezier(0.22,1,0.36,1)] data-[state=closed]:animate-[sheet-bottom-out_220ms_ease-in]",
  left: "inset-y-0 left-0 h-dvh w-[min(92vw,26rem)] border-r data-[state=open]:animate-[sheet-left-in_360ms_cubic-bezier(0.22,1,0.36,1)] data-[state=closed]:animate-[sheet-left-out_240ms_ease-in]",
} as const

type SheetContentProps = React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: keyof typeof sideClasses
  showCloseButton?: boolean
}

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: SheetContentProps) {
  return (
    <SheetPortal>
      <style>{`
        @keyframes sheet-overlay-in { from { opacity: 0 } to { opacity: 1 } }
        @keyframes sheet-overlay-out { from { opacity: 1 } to { opacity: 0 } }
        @keyframes sheet-right-in { from { transform: translate3d(100%, 0, 0) } to { transform: translate3d(0, 0, 0) } }
        @keyframes sheet-right-out { from { transform: translate3d(0, 0, 0) } to { transform: translate3d(100%, 0, 0) } }
        @keyframes sheet-left-in { from { transform: translate3d(-100%, 0, 0) } to { transform: translate3d(0, 0, 0) } }
        @keyframes sheet-left-out { from { transform: translate3d(0, 0, 0) } to { transform: translate3d(-100%, 0, 0) } }
        @keyframes sheet-top-in { from { transform: translate3d(0, -100%, 0) } to { transform: translate3d(0, 0, 0) } }
        @keyframes sheet-top-out { from { transform: translate3d(0, 0, 0) } to { transform: translate3d(0, -100%, 0) } }
        @keyframes sheet-bottom-in { from { transform: translate3d(0, 100%, 0) } to { transform: translate3d(0, 0, 0) } }
        @keyframes sheet-bottom-out { from { transform: translate3d(0, 0, 0) } to { transform: translate3d(0, 100%, 0) } }
      `}</style>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          "fixed z-[80] flex flex-col border-white/10 bg-[#090a0b] text-white shadow-2xl shadow-black/60 outline-none motion-reduce:animate-none",
          sideClasses[side],
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton ? (
          <SheetPrimitive.Close
            aria-label="Fechar menu"
            className="absolute right-5 top-5 z-30 inline-flex size-11 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white/75 transition hover:border-[rgba(245,169,0,0.45)] hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold-light)] motion-reduce:transition-none"
          >
            <XIcon className="size-5" aria-hidden="true" />
          </SheetPrimitive.Close>
        ) : null}
      </SheetPrimitive.Content>
    </SheetPortal>
  )
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("text-lg font-semibold text-white", className)}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-sm text-zinc-400", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
}
