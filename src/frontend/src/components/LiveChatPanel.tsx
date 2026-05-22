import { buildWhatsAppUrl } from "@/lib/site-contact";

import { X } from "lucide-react";

import { AnimatePresence, motion } from "motion/react";

import { useEffect } from "react";

import { createPortal } from "react-dom";



const CHIPS = [

  {

    label: "Check availability",

    message: "Hi, I want to check availability for a trek",

  },

  {

    label: "Get custom quote",

    message: "Hi, I need a custom quote for a trek",

  },

  {

    label: "Plan my trek",

    message: "Hi, I want to plan a Himalayan trek",

  },

  {

    label: "Cancellation help",

    message: "Hi, I need help with a cancellation",

  },

] as const;



export interface LiveChatPanelProps {

  open: boolean;

  onClose: () => void;

  /** `modal` = centered overlay (mobile side rail); inline beside trigger on desktop */

  placement?: "floating-left" | "inline-right" | "modal";

  className?: string;

}



function LiveChatPanelContent({ onClose }: { onClose: () => void }) {

  return (

    <>

      <div

        className="flex items-center gap-3 px-4 py-3"

        style={{ backgroundColor: "var(--ew-red)" }}

      >

        <div className="relative flex-shrink-0">

          <div

            className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center font-bold text-white text-sm"

            style={{ backgroundColor: "rgba(255,255,255,0.25)" }}

            aria-hidden

          >

            P

          </div>

          <span

            className="absolute inset-0 rounded-full animate-ping"

            style={{

              backgroundColor: "rgba(255,255,255,0.4)",

              animationDuration: "1.8s",

            }}

            aria-hidden

          />

        </div>

        <div className="flex-1 min-w-0">

          <p className="font-bold text-white text-sm leading-none">

            Ask Priya 🏔

          </p>

          <p

            className="text-[11px] mt-0.5"

            style={{ color: "rgba(255,255,255,0.75)" }}

          >

            Trek Expert · Usually replies instantly

          </p>

        </div>

        <button

          type="button"

          onClick={onClose}

          className="w-7 h-7 rounded-full flex items-center justify-center transition-colors"

          style={{ backgroundColor: "rgba(255,255,255,0.2)" }}

          aria-label="Close chat"

          data-ocid="chat.close_button"

        >

          <X size={15} className="text-white" />

        </button>

      </div>



      <div className="p-4 space-y-3 overflow-y-auto" style={{ maxHeight: 300 }}>

        <div className="flex items-start gap-2">

          <div

            className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-xs text-white"

            style={{ backgroundColor: "var(--ew-red)" }}

            aria-hidden

          >

            P

          </div>

          <div

            className="rounded-2xl rounded-tl-sm px-3 py-2.5 text-sm leading-snug max-w-[85%]"

            style={{

              backgroundColor: "var(--ew-gray-lt)",

              color: "var(--ew-text)",

            }}

          >

            Hi! I&apos;m Priya, your trek expert. How can I help? 😊

          </div>

        </div>



        <div>

          <p

            className="text-[11px] mb-2 font-medium"

            style={{ color: "var(--ew-gray-dark)" }}

          >

            Quick replies:

          </p>

          <div className="flex flex-wrap gap-2">

            {CHIPS.map((chip) => (

              <a

                key={chip.label}

                href={buildWhatsAppUrl(chip.message)}

                target="_blank"

                rel="noopener noreferrer"

                className="text-xs font-semibold px-3 py-1.5 rounded-full transition-all hover:opacity-90 active:scale-95"

                style={{

                  backgroundColor: "var(--ew-red-lt)",

                  color: "var(--ew-red)",

                  border: "1px solid var(--ew-red)",

                }}

                data-ocid="chat.quick_reply"

              >

                {chip.label}

              </a>

            ))}

          </div>

        </div>



        <a

          href={buildWhatsAppUrl("Hi, I have a question about Trekora treks")}

          target="_blank"

          rel="noopener noreferrer"

          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"

          style={{ backgroundColor: "#25D366" }}

          data-ocid="chat.whatsapp_button"

        >

          <svg

            width={16}

            height={16}

            viewBox="0 0 24 24"

            fill="currentColor"

            aria-hidden

          >

            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />

          </svg>

          Chat on WhatsApp

        </a>

      </div>

    </>

  );

}



export default function LiveChatPanel({

  open,

  onClose,

  placement = "floating-left",

  className = "",

}: LiveChatPanelProps) {

  useEffect(() => {

    if (!open || placement !== "modal") return;

    const prev = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {

      document.body.style.overflow = prev;

    };

  }, [open, placement]);



  const panelClass = [

    "live-chat-panel",

    placement === "inline-right"

      ? "live-chat-panel--inline-right"

      : placement === "floating-left"

        ? "live-chat-panel--floating-left"

        : "",

    className,

  ]

    .filter(Boolean)

    .join(" ");



  const panelMotion = (

    <motion.div

      initial={{ scale: 0.88, opacity: 0, y: 12 }}

      animate={{ scale: 1, opacity: 1, y: 0 }}

      exit={{ scale: 0.88, opacity: 0, y: 12 }}

      transition={{ type: "spring", stiffness: 360, damping: 28 }}

      className={panelClass}

      role="dialog"

      aria-label="Chat with Trekora expert"

      data-ocid="chat.dialog"

      onClick={(e) => e.stopPropagation()}

    >

      <LiveChatPanelContent onClose={onClose} />

    </motion.div>

  );



  if (placement === "modal") {

    if (typeof document === "undefined") return null;



    return createPortal(

      <AnimatePresence>

        {open ? (

          <motion.div

            key="live-chat-modal"

            initial={{ opacity: 0 }}

            animate={{ opacity: 1 }}

            exit={{ opacity: 0 }}

            className="live-chat-modal"

            onClick={onClose}

            data-ocid="chat.modal_backdrop"

          >

            {panelMotion}

          </motion.div>

        ) : null}

      </AnimatePresence>,

      document.body,

    );

  }



  return <AnimatePresence>{open ? panelMotion : null}</AnimatePresence>;

}

