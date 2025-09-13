export function getEnv(key: string): string | undefined {
  const v = (import.meta as any).env?.[key];
  if (typeof v === "string" && v.length > 0) return v;
  return undefined;
}

export function getPublicImageBase(): string {
  return (
    getEnv("VITE_IMAGE_BASE") ??
    getEnv("NEXT_PUBLIC_IMAGE_BASE") ??
    "/images/collection"
  );
}

export function getContractAddress(): string | undefined {
  return (
    getEnv("VITE_CONTRACT_ADDRESS") ?? getEnv("NEXT_PUBLIC_CONTRACT_ADDRESS")
  );
}