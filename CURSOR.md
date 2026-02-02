# 🤖 Cursor AI Operational Guide

Welcome! This repository is engineered to work with **Cursor's Agentic Workflow**. It uses a disciplined, research-first framework that transforms the AI from a simple autocomplete tool into an **Autonomous Principal Engineer**.

---

## 🧠 Core Doctrine

The AI in this project is governed by the rules in `.cursor/rules/`. Its "Operating Doctrine" (`agent-core.mdc`) mandates:

- **Research First:** It will never change code without first mapping the system and dependencies.
- **Source of Truth:** It prioritizes actual code and live configurations over potentially outdated documentation.
- **Safety & Precision:** It uses non-destructive research and performs self-audits (linting/testing) before reporting completion.

---

## 🛠️ One-Time Setup

Since Cursor's custom **Slash Commands** are currently stored in your local application settings (not synced via Git), you need to add them manually once:

1. Open **Cursor Settings** (`Ctrl/Cmd + ,`).
2. Go to **General** > **Rules for AI**.
3. In the **Commands** section, click **+ New** for each of these:

| Command    | Label             | Content Source               | Purpose                                             |
| ---------- | ----------------- | ---------------------------- | --------------------------------------------------- |
| `/request` | **Mission Start** | `.cursor/commands/request.md` | Start a new feature or fix with full context.       |
| `/refresh` | **Root Cause**    | `.cursor/commands/refresh.md` | Use when the agent is stuck or a bug is persistent. |
| `/retro`   | **Self-Improve**  | `.cursor/commands/retro.md`   | Reflect on the session and update project rules.    |

---

## 🚀 Daily Workflow

### 1. Initiating a Task

Open the **Composer (`Ctrl/Cmd + I`)** or **Chat (`Ctrl/Cmd + L`)** and use the `/request` command:

> `/request {Describe your feature or bug fix here}`

### 2. Automatic Rule Enforcement

You don't need to remind the AI of our tech stack. The following rules are **automatically applied** based on the files you edit:

- **React/TS:** Enforces Arrow Functions, strict typing, and PascalCase naming.
- **Liquid:** Ensures proper syntax and Shopify-best practices.
- **Quality:** Automatically runs **Prettier** and **ESLint** before the agent finishes a task.
- **Testing:** Requires the agent to check for/write tests before marking a task as "Done."

### 3. The "Stuck" Protocol

If the agent is looping or failing to fix a bug, don't argue with it. Type `/refresh`. This forces the AI to abandon its current assumptions and perform a deep root-cause analysis of the environment.

### 4. Closing the Loop

When a feature is finished, run `/retro`. The agent will analyze its performance and, if it found a project-specific "gotcha," it will suggest an update to your `.cursor/rules/` files to prevent that mistake from happening again.

---

## 📂 Repository Structure

- `.cursor/rules/`: Automatic behavioral instructions (the "Brain").
- `.cursor/commands/`: Templates for manual slash commands (the "Briefings").

---

> **Note:** This setup is optimized for **Cursor v2.4+**. Ensure your "Agent" mode is toggled on in the Composer for maximum autonomy.
