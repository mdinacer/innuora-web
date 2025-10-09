import Image from "next/image";
import Markdown from "markdown-to-jsx";
import { APP_CONFIG } from "@/config/app";
import { Conversation } from "@/types";

interface ConversationCardProps {
  conversation: Conversation;
  label: string;
}

export default function ConversationCard({
  conversation,
  label,
}: ConversationCardProps) {
  if (conversation.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="flex items-end gap-2 max-w-[95%] md:max-w-[80%]">
          <div className="rounded-2xl border border-inn-border-light bg-inn-bg-input px-4 py-3 text-base rtl:text-lg rtl:font-medium text-inn-text-primary">
            {conversation.text}
          </div>
          <div className="size-7 sm:size-9 font-sans rounded-full bg-inn-bg-secondary flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
            U
          </div>
        </div>
      </div>
    );
  }

  if (conversation.role === "app") {
    return (
      <div className="flex justify-start">
        <div className="flex items-start gap-3 sm:max-w-[85%] max-w-[95%]">
          <div className=" font-sans  rounded-full hidden sm:flex items-center justify-center text-white flex-shrink-0 text-sm font-semibold shadow-[0_2px_8px] shadow-black/5">
            <Image
              src="/assets/logo.png"
              alt="AI"
              width={24}
              height={24}
              className="object-cover object-center"
            />
          </div>
          <div className="flex flex-col sm:gap-1 gap-3">
            <div className="flex items-center gap-2 px-1">
              <div className="w-1.5 h-1.5 ltr:hidden rounded-full bg-inn-bg-accent" />
              <span className="text-sm font-medium rtl:font-arabic-body rtl:text-base text-inn-bg-accent rtl:font-semibold">
                {APP_CONFIG.name}
              </span>
              <div className="w-1.5 h-1.5 rounded-full rtl:hidden bg-inn-bg-accent" />
            </div>
            <div
              className="rounded-2xl bg-inn-bg-accent-dark text-white px-4 py-3 text-base rtl:text-lg rtl:font-medium shadow-[0_4px_20px] shadow-black/8 
              [&>ol]:list-inside [&>ol]:list-decimal [&>p:not(:last-child)]:my-2 
              [&>ul]:list-inside [&>ul]:list-disc [&_*>li]:my-2"
            >
              <Markdown
                options={{ forceBlock: true, disableParsingRawHTML: true }}
              >
                {conversation.text}
              </Markdown>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div className="flex items-start gap-3 sm:max-w-[85%] max-w-[95%]">
        <div className="size-7 sm:size-9 rounded-full bg-gray-400 hidden md:flex items-center justify-center text-white flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-robot-face"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M6 5h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2z" />
            <path d="M9 16c1 .667 2 1 3 1s2 -.333 3 -1" />
            <path d="M9 7l-1 -4" />
            <path d="M15 7l1 -4" />
            <path d="M9 12v-1" />
            <path d="M15 12v-1" />
          </svg>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-500 px-1 rtl:font-arabic-body rtl:text-base">
            {label}
          </span>
          <div className="rounded-2xl border border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-800 px-4 py-3 text-base rtl:text-lg rtl:font-medium text-gray-700 dark:text-gray-300">
            {conversation.text}
          </div>
        </div>
      </div>
    </div>
  );
}
