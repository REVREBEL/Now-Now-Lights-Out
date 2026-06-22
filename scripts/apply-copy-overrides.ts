const COPY_REPLACEMENTS: Record<string, string> = {
  "Campaign": "How It Works",
  "Join Campaign": "Share Your Moment",
  "#NowNowLightsOut — Guest Campaign 2024": "NOW NOW, LIGHTS OUT",
  "Show us your Now Now lights-out moment. Post wearing your sleep mask, tag the hotel, and use the campaign hashtag for a chance to be featured or win a stay perk.": "Check in. Go out. Come back. Put the city on mute. Our signature Now Now sleep mask is your official permission slip to rest dramatically after a full day in New York.",
  "See the Gallery": "Book Your Cabin",
  "Shop the Mask": "Shop the Sleep Kit",
  "How It Works": "How to Go Lights Out",
  "Three steps. No sleep sacrificed.": "Four steps. Then lights out.",
  "Tag us, use a hashtag, and your moment could land in this gallery — or earn you a stay perk.": "Put on your mask, capture the moment, tag @staynownow with #NowNowLightsOut, and you could be featured or receive a monthly sleep perk.",
  "Wear it anywhere": "Put on your sleep mask",
  "In the cabin, the lounge, the cab home, or on a rooftop at 3am. Mask on. Moment ready.": "Your Now Now sleep mask is the official signal that sleep mode has been activated.",
  "Post & tag": "Snap your lights-out moment",
  "Share on Instagram. Tag @staynownow and use any campaign hashtag with your post.": "Capture the cabin crash, the post-NoHo wind-down, the red-eye arrival, or wherever the city finally catches up with you.",
  "Get featured": "Tag and share",
  "We curate the best into this gallery. Top submissions win a stay perk. Sleep tight.": "Tag @staynownow and use #NowNowLightsOut. Selected moments may be featured, and one featured guest receives a sleep perk each month.",
  "Five Lights-Out Moods": "Featured Guest Moments",
  "Which one are you?": "Guest Sleep Mode: Activated",
  "Browse all": "See Guest Moments",
  "In the room. Mask on. Door closed.": "Guests wearing the mask in their cabin.",
  "Coming back after a night out.": "Guests winding down after a night out.",
  "Coffee, messy hair, zero regrets.": "Sleep mask, coffee, messy hair, and recovery energy.",
  "Solo Sleep Club": "Solo Traveler Sleep Club",
  "The whole bed, all yours.": "Guests celebrating the freedom of traveling solo.",
  "Landed. Checked in. Out cold.": "Travelers checking in after flights, trains, and late-night arrivals.",
  "Guest Gallery — 16 Curated Submissions": "Guest Sleep Mode: Activated",
  "Lights Out,": "Guest Moments,",
  "Moments On.": "Sleep Mode On.",
  "Featured Submission": "Monthly Sleep Perk",
  "“Technically still asleep. Masks never came off.”": "Each month, one featured guest moment receives a sleep perk.",
  "Browse After NoHo": "See Guest Moments",
  "Submit Your Moment": "Show Us Your Now Now Lights-Out Moment",
  "Your moment belongs here.": "Your lights-out moment belongs here.",
  "Post on Instagram, tag @staynownow, then fill this form so we can track your submission. We curate weekly — a stay perk might find its way back to you.": "Post a photo or Reel wearing your Now Now sleep mask, tag @staynownow, and use #NowNowLightsOut. Selected guest moments may be featured, and each month one featured guest receives a sleep perk.",
  "Submit My Moment": "Share Your Lights-Out Moment",
  "Submission received.": "Lights-out moment received.",
  "We'll review your post and reach out if it makes the gallery. Sleep tight.": "We’ll review your post and reach out if it is selected for the guest gallery or monthly sleep perk.",
  "Submit another": "Share another moment",
  "A compact hotel in the heart of NoHo, New York City. Small rooms. Big city. Stylish sleep.": "New York gave you stories. We gave you the mask.",
  "The city doesn't sleep. You should.": "Tag @staynownow and use #NowNowLightsOut.",
};

const ATTRIBUTE_REPLACEMENTS: Record<string, string> = {
  "What was your lights-out moment?": "Tell us about your Now Now lights-out moment.",
};

function normalize(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function replaceTextNodes(root: ParentNode): void {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];

  while (walker.nextNode()) {
    nodes.push(walker.currentNode as Text);
  }

  for (const node of nodes) {
    const current = normalize(node.nodeValue ?? "");
    const replacement = COPY_REPLACEMENTS[current];
    if (replacement) node.nodeValue = replacement;
  }
}

function replaceCombinedElementText(root: ParentNode): void {
  root.querySelectorAll<HTMLElement>("p, h1, h2, h3, button, a, span").forEach((element) => {
    const current = normalize(element.textContent ?? "");
    const replacement = COPY_REPLACEMENTS[current];

    if (replacement && element.children.length === 0) {
      element.textContent = replacement;
    }
  });
}

function replaceAttributes(root: ParentNode): void {
  root.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input[placeholder], textarea[placeholder]").forEach((element) => {
    const replacement = ATTRIBUTE_REPLACEMENTS[element.placeholder];
    if (replacement) element.placeholder = replacement;
  });
}

function applyFinalCopy(): void {
  const root = document.getElementById("root");
  if (!root) return;

  replaceTextNodes(root);
  replaceCombinedElementText(root);
  replaceAttributes(root);
}

export function installCopyOverrides(): void {
  let scheduled = false;

  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      applyFinalCopy();
    });
  };

  schedule();

  const observer = new MutationObserver(schedule);
  const root = document.getElementById("root");
  if (root) observer.observe(root, { childList: true, subtree: true });

  window.setTimeout(() => {
    applyFinalCopy();
    observer.disconnect();
  }, 3000);
}
