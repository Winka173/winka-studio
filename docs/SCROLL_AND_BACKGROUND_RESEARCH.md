# Native project browsing and hero light study

Research and implementation: 8 November 2026. The owner found the pinned project sequence disorienting and asked for references from established sites, plus another background direction.

## References observed

Read the public sites and opened each in an isolated Chromium browser at 1440 × 1000. Captured the initial view and the position after an actual 1150px wheel input. This is an observation of the pages at the time of review, not a claim about every interaction on those sites.

| Official reference | Observation used here |
| --- | --- |
| [Instrument](https://www.instrument.com/) | Work media and copy travel through the document together. The inspected main content had no fixed or sticky descendants. |
| [Pentagram](https://www.pentagram.com/) | An image-led body of work remains easy to browse vertically; project identity comes from the work. Some navigation/UI is fixed, but the inspected work itself moves with the document. |
| [Linear](https://linear.app/) | Restrained atmospheric surfaces preserve type and product legibility. The inspected main content had one fixed/sticky descendant. |
| [Stripe](https://stripe.com/) | Color and light accompany a readable page hierarchy. The inspected main content had no fixed/sticky descendants. |

The application here is our own design inference. No code, brand assets or page compositions were copied. Reference screenshots and measurements are local review artifacts in `.review/scroll-research/`.

## Implemented decision

Removed the 380vh project theatre, sticky viewport, active-project scroll fraction and content swapping. Four complete project articles now use ordinary document flow. Desktop alternates media and text sides; mobile stacks the actual screenshots and description. Each article has its own palette and typography. Native anchor links jump directly to each project, and the product link is always present in the DOM.

The browser check compares the same article's bounding rectangle before and after a real wheel input: 350px scrolling must move the article by approximately 350px. It also verifies four articles and the absence of the old sticky theatre. Reduced motion and global pause disable smooth anchor scrolling.

## Background decision

The homepage hero uses original WebGL satin/glass light ribbons: curved silver, jade and muted rose bands with narrow glints, a soft luminous surface and a small pointer response. The light is confined to the hero rather than running behind the entire project collection. This gives the studio an identity while allowing each product's materials to lead farther down the page.

Product pages retain their individual fluid palettes. Both shader variants use the existing pause/reduced-motion handling, visible-area observer, low-power WebGL request and CSS fallback. No new rendering dependency or external runtime request was introduced.

The chosen result is implemented for review, rather than left as a list of possible styles. A later style adjustment can change this isolated hero surface without rebuilding the project browsing model.
