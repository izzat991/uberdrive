function simpleHash(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash.toString(16);
}

export function getOrCreateDeviceId() {
  if (typeof window === "undefined") return "";

  const key = "global_device_id_v1";
  let id = localStorage.getItem(key);

  if (!id) {
    const nav = window.navigator;
    const scr = window.screen;
    const raw =
      (nav.userAgent || "") +
      "|" +
      (nav.language || "") +
      "|" +
      (scr?.width || "") +
      "x" +
      (scr?.height || "") +
      "|" +
      (nav.platform || "");

    id = "dev-" + simpleHash(raw);
    localStorage.setItem(key, id);
  }

  return id;
}
