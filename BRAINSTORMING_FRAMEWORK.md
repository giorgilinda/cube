# 🧠 Brainstorming & Design Framework

When using the `/spark` command, the AI is encouraged to apply one or more of the following mental models to the conversation.

## 1. First Principles Thinking

- **The Goal**: Break the problem down into its most basic, foundational truths.
- **Use when**: We are trying to do something "the way it's always been done" and want to find a more efficient or creative path.
- **Key Question**: "If we were building this from scratch today without any existing libraries, what is the simplest way to solve the core problem?"

## 2. Inversion Principle

- **The Goal**: Instead of thinking about how to make a feature succeed, think about how it could fail.
- **Use when**: We are designing complex systems or user flows.
- **Key Question**: "How could this feature frustrate a user or break the database? How do we design to prevent those specific failures?"

## 3. Occam's Razor

- **The Goal**: The simplest explanation or solution is usually the right one.
- **Use when**: The proposed architecture is starting to look like "Spaghetti Code" or has too many moving parts.
- **Key Question**: "What is the one thing we can remove from this design while still keeping it functional?"

## 4. The 80/20 Rule (Pareto Principle)

- **The Goal**: Identify the 20% of the work that will provide 80% of the value to the user.
- **Use when**: We are stuck in "Analysis Paralysis" or trying to over-engineer a MVP (Minimum Viable Product).
- **Key Question**: "What is the 'Happy Path' that most users will take, and how can we make that perfect before worrying about edge cases?"

## 5. Technical Debt vs. Speed Trade-off

- **The Goal**: Consciously decide when it’s okay to write "dirty" code for speed and when we must be "pure."
- **Use when**: We have a deadline or a very experimental feature.
- **Key Question**: "Is this a 'Permanent' architectural choice or an 'Experiment' we can throw away in two weeks?"

---

### How to use this with the AI:

When you run `/spark`, you can now say:

> `/spark I want to build a new notification system. Let's use **First Principles** and **The Inversion Principle** to discuss the architecture.`

The AI will look at this document in your `docs/` folder (thanks to your `000-precedence` rule) and apply those specific strategies to your chat.
