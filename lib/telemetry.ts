export async function logWallet(event: "connect" | "disconnect", payload: {
  address?: string | null;
  connector?: string;
  chainId?: number;
}) {
  try {
    await fetch("/api/log-wallet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event, ...payload, ts: Date.now() }),
    });
  } catch {}
}

export async function logMint(payload: {
  address: string;
  quantity: number;
  txHash?: string;
  chainId?: number;
  priceWei?: string | number | bigint;
}) {
  try {
    await fetch("/api/log-mint", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, ts: Date.now() }),
    });
  } catch {}
}
