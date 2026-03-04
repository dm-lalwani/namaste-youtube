const NAMES = [
  "TechExplorer",
  "GamerZone",
  "JS_Wizard",
  "UI_Monk",
  "ReactRider",
  "CodeCrafter",
  "PixelPilot",
  "DevDinesh",
  "FrontendFox",
  "DebugNinja",
];

const MESSAGES = [
  "This part is so helpful!",
  "Anyone else taking notes right now?",
  "That example was 🔥",
  "Love how clearly this is explained.",
  "Can you share the repo link?",
  "Waiting for the next live already.",
  "This is better than most paid courses.",
  "Dark mode tutorial when?",
  "I finally understand this concept.",
  "Please do a video on performance next.",
];

export const generateRandomName = () =>
  NAMES[Math.floor(Math.random() * NAMES.length)];

export const makeRandomMessage = () =>
  MESSAGES[Math.floor(Math.random() * MESSAGES.length)];

export const findPrime = (num) => {
  let i,
    primes = [2, 3],
    n = 5;
  const isPrime = (n) => {
    let i = 1,
      p = primes[i],
      limit = Math.ceil(Math.sqrt(n));
    while (p <= limit) {
      if (n % p === 0) {
        return false;
      }
      i += 1;
      p = primes[i];
    }
    return true;
  };
  for (i = 2; i <= num; i += 1) {
    while (!isPrime(n)) {
      n += 2;
    }
    primes.push(n);
    n += 2;
  }
  return primes[num - 1];
};
