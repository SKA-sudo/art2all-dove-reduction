# Session

## Sprint R1 – Reduction Lab Setup

**Status:** ⏸ Blocked (not completed)

### Goal

Create the initial Reduction Lab by transferring the current working Spatial Grid implementation from the Art2all product repository into a standalone research repository.

### What was done

- Reduction Lab repository prepared.
- Project structure created.
- Basic application starts successfully.
- Build completes successfully (`npm run build`).
- Initial UI created.

### Result

The working Spatial Grid from the Art2all product was **not** successfully reproduced.

The current implementation is **not** a 1:1 copy of the product implementation and therefore is **not accepted**.

No code will be committed.

### Lessons Learned

The Spatial Grid cannot simply be recreated from individual components.

A complete transfer requires the full rendering chain, including all dependencies and data generation.

Future attempts must begin by identifying the complete working implementation inside the product repository before copying any files.

No redesign or reinterpretation is allowed during this step.

### Next Sprint

Restart Sprint R1.

Objective:

Reproduce the **exact** working Spatial Grid from the Art2all product repository inside `art2all-dove-reduction`.

Requirements:

- Use the product implementation as the single source of truth.
- Copy the complete rendering chain.
- Copy all required dependencies.
- Only adjust import paths where necessary.
- The visual result must match the product repository before any reduction work begins.

Reduction experiments start **only after** the copied implementation is visually identical to the product.