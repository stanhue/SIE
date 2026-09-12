# SIE V0.1 — Requirements

## Objective

Validate the smallest useful SIE loop:

**GOAL → STRUCTURE → NEXT ACTION**

## Functional Requirements

### FR-01 — Goal Input
SIE shall allow a user to enter a natural-language goal.

### FR-02 — Goal Interpretation
SIE shall interpret the goal and identify the desired outcome.

### FR-03 — Missing Information
When information necessary to create a useful structure is missing, SIE shall request only the information necessary to continue.

### FR-04 — Appropriate Structure
SIE shall create an initial execution structure appropriate to the type of goal rather than forcing every goal into an identical generic task template.

### FR-05 — Action Representation
The generated structure shall contain concrete actions that can move the user toward the desired outcome.

### FR-06 — Next Action
SIE shall select and present one recommended next action from the generated structure.

### FR-07 — Simplicity
The default user experience shall not require the user to inspect or understand the complete internal structure before beginning execution.

## V0.1 Non-Goals

V0.1 does not need to:

- Connect to calendars, email, LMS platforms, Canva, or other external services.
- Automatically adapt after circumstances change.
- Execute actions on the user's behalf.
- Collect automatic evidence of completion.
- Implement advanced scheduling or optimization.
- Support social features or gamification.
- Solve multiple active projects simultaneously.

These capabilities remain candidates for later versions and should not block validation of V0.1.

## Acceptance Test

Given an unstructured goal, SIE should be able to:

1. Understand what the user is trying to achieve.
2. Ask for essential missing context when necessary.
3. Produce an appropriate initial structure.
4. Recommend one sensible next action.

Example input:

> I want to get all A's this semester.

A valid response should not immediately generate an arbitrary study schedule. SIE should first determine what information is necessary to understand the user's academic state, then recommend the first useful action needed to progress.
