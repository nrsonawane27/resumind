import re
from collections import Counter
from typing import List, Dict

STOP = set("""
a an the and or of to for with in on by as at from is are was were be been being that this those these it its into about
""".split())

# seed list: entry-level marketing skills & tools
SEED_SKILLS = {
  "marketing","content","copywriting","social media","instagram","facebook","tiktok","linkedin",
  "google analytics","ga4","seo","sem","keyword research","email marketing","mailchimp","hubspot",
  "canva","figma","photoshop","ad campaigns","meta ads","google ads","a/b testing","crm","analytics",
  "campaign","content calendar","engagement","ctr","impressions","reach","conversion","kpi","reporting"
}

def normalize(text: str) -> List[str]:
    toks = re.findall(r"[a-zA-Z][a-zA-Z+\-/]+", text.lower())
    return [t for t in toks if t not in STOP and len(t) > 2]

def ngrams(tokens: List[str], n=2):
    return [" ".join(tokens[i:i+n]) for i in range(len(tokens)-n+1)]

def extract_keywords(jd_text: str, resume_text: str) -> Dict[str, List[str]]:
    """Return matched & missing keywords from JD vs resume."""
    jd_tokens = normalize(jd_text)
    res_tokens = normalize(resume_text)
    jd_uni = Counter(jd_tokens)
    jd_bi = Counter(ngrams(jd_tokens, 2))

    # candidate keywords = frequent bigrams + seed skills + frequent unigrams
    frequent_uni = [w for w, c in jd_uni.items() if c >= 2]
    frequent_bi  = [w for w, c in jd_bi.items() if c >= 1]
    candidates = set(frequent_uni + frequent_bi) | set(SEED_SKILLS)

    res_text_low = " " + resume_text.lower() + " "
    matched, missing = [], []
    for kw in sorted(candidates):
        if f" {kw} " in res_text_low:
            matched.append(kw)
        else:
            missing.append(kw)

    # top 12 missing: prioritize ones that appear many times in JD
    priority = {k: jd_uni.get(k, 0) + jd_bi.get(k, 0) for k in candidates}
    missing.sort(key=lambda k: priority.get(k, 0), reverse=True)
    return {"matched": sorted(set(matched)), "missing": missing[:12]}

def build_suggestions(missing: List[str], matched: List[str]) -> Dict[str, List[str]]:
    """Produce friendly bullets Maya can add (STAR-ish prompts)."""
    bullets = []
    for kw in missing:
        bullets.append(f"Add a bullet using **{kw}** with a metric (e.g., +15% CTR, +3k impressions).")
    emphasis = [f"Keep highlighting **{kw}** with results." for kw in matched[:6]]
    return {"add": bullets, "emphasize": emphasis}
