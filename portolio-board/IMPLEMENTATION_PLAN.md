# Three.js Resume Board Implementation Plan

## 1. Project Setup

- [x] Choose the frontend framework and build tool.
- [x] Install Three.js and supporting packages.
- [x] Define the source folder structure.
- [x] Add linting and formatting rules.
- [x] Configure production build scripts.

## 2. Resume Data

- [x] Define the resume data schema.
- [x] Add profile and navigation content.
- [x] Add career milestone data.
- [x] Add skills and milestone links.
- [x] Add project and contact data.
- [x] Validate required resume fields.

## 3. Page Shell

- [x] Build the full-page dark layout.
- [x] Add the branded header.
- [x] Add desktop navigation.
- [x] Add mobile navigation.
- [x] Build the hero copy block.
- [x] Add the primary call to action.
- [x] Add interaction instructions.
- [x] Add the path legend.
- [x] Place the Three.js canvas.

## 4. Three.js Foundation

- [x] Create the scene and renderer.
- [x] Configure color management.
- [x] Add a perspective camera.
- [x] Add responsive canvas sizing.
- [x] Configure transparent rendering.
- [x] Add ambient scene lighting.
- [x] Add directional board lighting.
- [x] Enable controlled shadows.
- [x] Add renderer cleanup logic.

## 5. Circuit Board

- [x] Model the board base.
- [x] Add beveled board edges.
- [x] Add layered side geometry.
- [x] Apply dark metallic materials.
- [x] Add cyan edge accents.
- [x] Add recessed panel details.
- [x] Add decorative contact points.
- [x] Position the board in perspective.

## 6. Career Path

- [x] Map milestones to board coordinates.
- [x] Draw the primary circuit trace.
- [x] Add emissive cyan styling.
- [x] Add milestone ring geometry.
- [x] Add milestone pulse effects.
- [x] Place year labels.
- [x] Place role labels.
- [x] Highlight the current milestone.
- [x] Animate the path reveal.

## 7. Skill Network

- [x] Map skills to board coordinates.
- [x] Draw branching skill traces.
- [x] Add dotted trace styling.
- [x] Color traces by category.
- [x] Model raised skill chips.
- [x] Add chip bevels and shadows.
- [x] Add skill icons.
- [x] Add skill labels.
- [x] Connect skills to milestones.
- [x] Animate skill path activation.

## 8. HTML Overlays

- [x] Project 3D labels into screen space.
- [x] Keep labels aligned with nodes.
- [x] Hide occluded labels.
- [x] Prevent label overlap.
- [x] Add accessible label markup.
- [x] Match overlay and scene scaling.

## 9. Interaction

- [x] Add pointer-based board rotation.
- [x] Add touch rotation support.
- [x] Add constrained wheel zoom.
- [x] Add touch pinch zoom.
- [x] Clamp rotation limits.
- [x] Clamp camera distance.
- [x] Add rotation inertia.
- [x] Add hover raycasting.
- [x] Add node focus states.
- [x] Add chip focus states.
- [x] Open milestone detail panels.
- [x] Open skill detail panels.
- [x] Add keyboard navigation.
- [x] Add a reset-view control.

## 10. Visual Effects

- [x] Add selective bloom.
- [x] Tune emissive intensity.
- [x] Add subtle board reflections.
- [x] Add contact shadows.
- [x] Add a background vignette.
- [x] Add restrained idle motion.
- [x] Add hover transition effects.
- [x] Respect reduced-motion settings.

## 11. Responsive Design

- [ ] Define desktop camera framing.
- [ ] Define tablet camera framing.
- [ ] Define mobile camera framing.
- [ ] Reflow hero content on mobile.
- [ ] Simplify controls on touch devices.
- [ ] Scale labels by viewport size.
- [ ] Reduce effects on small screens.
- [ ] Test portrait and landscape modes.

## 12. Accessibility

- [ ] Add a semantic resume fallback.
- [ ] Label all interactive controls.
- [ ] Provide visible keyboard focus.
- [ ] Maintain readable contrast.
- [ ] Avoid color-only path meaning.
- [ ] Announce selected node details.
- [ ] Support reduced motion.
- [ ] Keep content usable without WebGL.

## 13. Performance

- [ ] Reuse shared geometries.
- [ ] Reuse shared materials.
- [ ] Limit shadow map resolution.
- [ ] Minimize post-processing passes.
- [ ] Cap device pixel ratio.
- [ ] Pause rendering when hidden.
- [ ] Lazy-load the 3D scene.
- [ ] Dispose unused GPU resources.
- [ ] Add mobile quality presets.
- [ ] Measure frame rate and memory.

## 14. Testing

- [ ] Test resume data rendering.
- [ ] Test responsive layout behavior.
- [ ] Test pointer interactions.
- [ ] Test touch interactions.
- [ ] Test keyboard interactions.
- [ ] Test WebGL fallback behavior.
- [ ] Test reduced-motion behavior.
- [ ] Test major desktop browsers.
- [ ] Test major mobile browsers.
- [ ] Run accessibility checks.
- [ ] Run production performance audits.

## 15. Content and Polish

- [ ] Replace placeholder resume content.
- [ ] Add final skill icons.
- [ ] Add project detail links.
- [ ] Add downloadable resume link.
- [ ] Add contact destinations.
- [ ] Refine typography and spacing.
- [ ] Refine board composition.
- [ ] Tune lighting and glow.
- [ ] Proofread all visible copy.

## 16. Deployment

- [ ] Configure environment variables.
- [ ] Add metadata and social previews.
- [ ] Add favicon and app icons.
- [ ] Configure analytics if required.
- [ ] Build the production bundle.
- [ ] Verify the deployed WebGL scene.
- [ ] Verify fallback resume content.
- [ ] Monitor runtime errors.
