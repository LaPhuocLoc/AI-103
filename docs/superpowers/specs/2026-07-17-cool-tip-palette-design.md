# Cool Tip Palette Design

## Goal

Replace the warm amber tip styling with a cool Azure blue/cyan palette while preserving readability, layout, behavior, and all authored tip content.

## Design

- Dark theme: deep navy-blue surface, cyan-blue border, pale ice-blue primary text, and muted blue secondary text.
- Light theme: pale ice-blue surface, medium Azure-blue border, dark navy primary text, and slate-blue secondary text.
- Continue routing the tip button, tip panel, trap text, and ultra-short section through the existing four `--tip-*` tokens.
- Do not change component structure, spacing, interaction, or content.

## Acceptance Criteria

- None of the four tip tokens uses the previous amber values.
- The palette is visibly cool in both themes.
- Primary and muted tip text each meet WCAG AA contrast of at least 4.5:1 against the tip surface.
- Existing UI and tip tests continue to pass.
- Static asset cache version is increased so GitHub Pages serves the new palette immediately.

## Decision

Azure blue/cyan was selected over indigo and teal because it feels cooler without introducing a purple neon aesthetic and remains consistent with the product's existing Azure identity. The user has explicitly authorized automatic approval of implementation decisions, so this design proceeds without an additional review pause.
