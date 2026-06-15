"use client";

import React, { useMemo, useState } from "react";
import {
  FeatherAtSign,
  FeatherBold,
  FeatherCode2,
  FeatherItalic,
  FeatherLink,
  FeatherList,
  FeatherListChecks,
  FeatherListOrdered,
  FeatherMic,
  FeatherMoreHorizontal,
  FeatherStrikethrough,
  FeatherText,
  FeatherVideo,
} from "@subframe/core";
import * as SubframeCore from "@subframe/core";
import { Button } from "../Button";
import { DropdownMenu } from "../DropdownMenu";
import { IconButton } from "../IconButton";
import { TextArea } from "../TextArea";
import styles from "./Chatbot.module.css";

const STARTER_MESSAGES = [
  {
    role: "assistant",
    content:
      "Sveiki! Uzdodiet jautājumu par Kamaldiņu dzimtas arhīvu. Es meklēšu vietnes saturā un atbildēšu īsi.",
  },
];

function Divider() {
  return <div className={styles.subframeDivider} />;
}

function noop() {}

async function getPagefind() {
  if (typeof window === "undefined") return null;
  if (window.pagefind) return window.pagefind;

  try {
    window.pagefind = await import(
      /* webpackIgnore: true */ "/_pagefind/pagefind.js"
    );
    await window.pagefind.options({ baseUrl: window.location.origin });
    return window.pagefind;
  } catch (error) {
    console.warn("Pagefind is not available for chat context yet.", error);
    return null;
  }
}

async function searchContext(query) {
  const pagefind = await getPagefind();
  if (!pagefind) return "";

  const search = await pagefind.search(query);
  const results = await Promise.all(
    search.results.slice(0, 5).map(async (result) => {
      const data = await result.data();
      return [
        `Title: ${data.meta?.title || data.url}`,
        `URL: ${data.url}`,
        `Excerpt: ${data.excerpt?.replace(/<[^>]*>/g, "") || ""}`,
      ].join("\n");
    }),
  );

  return results.join("\n\n");
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(STARTER_MESSAGES);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const remaining = useMemo(() => 500 - input.length, [input]);

  async function sendMessage() {
    const message = input.trim();
    if (!message || isLoading) return;

    setError("");
    setInput("");
    setIsLoading(true);
    setMessages((current) => [...current, { role: "user", content: message }]);

    try {
      const context = await searchContext(message);
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, context }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Chat failed.");

      setMessages((current) => [
        ...current,
        { role: "assistant", content: data.answer },
      ]);
    } catch (chatError) {
      setError(chatError.message);
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            "Neizdevās saņemt atbildi. Pārbaudiet, vai Groq API atslēga ir iestatīta serverī.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className={styles.root}>
      {isOpen ? (
        <section className={styles.panel} aria-label="Kamaldiņu arhīva čats">
          <div className={styles.header}>
            <div>
              <strong>Arhīva čats</strong>
              <span>Atbild no vietnes satura</span>
            </div>
            <button
              type="button"
              className={styles.close}
              onClick={() => setIsOpen(false)}
              aria-label="Aizvērt čatu"
            >
              ×
            </button>
          </div>

          <div className={styles.messages}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={
                  message.role === "user"
                    ? styles.userMessage
                    : styles.assistantMessage
                }
              >
                {message.content}
              </div>
            ))}
            {isLoading ? (
              <div className={styles.assistantMessage}>Meklēju arhīvā…</div>
            ) : null}
          </div>

          <div className={styles.subframeComposer}>
            <div className={styles.subframeToolbar}>
              <IconButton
                size="small"
                icon={<FeatherBold />}
                onClick={noop}
                aria-label="Bold"
              />
              <IconButton
                size="small"
                icon={<FeatherItalic />}
                onClick={noop}
                aria-label="Italic"
              />
              <IconButton
                size="small"
                icon={<FeatherStrikethrough />}
                onClick={noop}
                aria-label="Strikethrough"
              />
              <Divider />
              <IconButton
                size="small"
                icon={<FeatherLink />}
                onClick={noop}
                aria-label="Link"
              />
              <Divider />
              <IconButton
                size="small"
                icon={<FeatherList />}
                onClick={noop}
                aria-label="List"
              />
              <IconButton
                size="small"
                icon={<FeatherListChecks />}
                onClick={noop}
                aria-label="Checklist"
              />
              <IconButton
                size="small"
                icon={<FeatherListOrdered />}
                onClick={noop}
                aria-label="Ordered list"
              />
              <Divider />
              <IconButton
                size="small"
                icon={<FeatherCode2 />}
                onClick={noop}
                aria-label="Code"
              />
              <SubframeCore.DropdownMenu.Root>
                <SubframeCore.DropdownMenu.Trigger asChild>
                  <IconButton
                    size="small"
                    icon={<FeatherMoreHorizontal />}
                    onClick={noop}
                    aria-label="More options"
                  />
                </SubframeCore.DropdownMenu.Trigger>
                <SubframeCore.DropdownMenu.Portal>
                  <SubframeCore.DropdownMenu.Content
                    side="bottom"
                    align="start"
                    sideOffset={4}
                    asChild
                  >
                    <DropdownMenu>
                      <DropdownMenu.DropdownItem icon={<FeatherText />}>
                        More options
                      </DropdownMenu.DropdownItem>
                    </DropdownMenu>
                  </SubframeCore.DropdownMenu.Content>
                </SubframeCore.DropdownMenu.Portal>
              </SubframeCore.DropdownMenu.Root>
            </div>

            <TextArea
              className="h-auto w-full flex-none"
              variant="filled"
              label=""
              helpText=""
            >
              <TextArea.Input
                placeholder="Send a message..."
                value={input}
                maxLength={500}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                rows={3}
              />
            </TextArea>

            <div className={styles.subframeBottomToolbar}>
              <IconButton size="small" onClick={noop} aria-label="Add" />
              <IconButton
                size="small"
                icon={<FeatherAtSign />}
                onClick={noop}
                aria-label="Mention"
              />
              <Divider />
              <IconButton
                size="small"
                icon={<FeatherVideo />}
                onClick={noop}
                aria-label="Video"
              />
              <IconButton
                size="small"
                icon={<FeatherMic />}
                onClick={noop}
                aria-label="Voice"
              />
              <div className={styles.subframeActions}>
                <span
                  className={
                    remaining < 60 ? styles.limitWarning : styles.limit
                  }
                >
                  {remaining}
                </span>
                <Button
                  variant="brand-tertiary"
                  size="small"
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                >
                  Send
                </Button>
              </div>
            </div>
          </div>

          {error ? <p className={styles.error}>{error}</p> : null}
        </section>
      ) : null}

      <button
        type="button"
        className={styles.launcher}
        onClick={() => setIsOpen((value) => !value)}
      >
        Ask archive
      </button>
    </div>
  );
}
