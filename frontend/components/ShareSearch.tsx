"use client";

interface Props {
  pincode: string;
  city: string;
}

export default function ShareSearch({
  pincode,
  city,
}: Props) {
  const url = `${window.location.origin}?pincode=${pincode}`;

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Areakart",
          text: `Check delivery apps available in ${city} (${pincode})`,
          url,
        });
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  }

  async function copyLink() {
    await navigator.clipboard.writeText(url);
    alert("Link copied!");
  }

  return (
    <div className="mt-6 flex flex-wrap justify-center gap-4">
      <button
        onClick={handleShare}
        className="rounded-xl bg-indigo-600 px-5 py-3 text-white transition hover:bg-indigo-700"
      >
        📤 Share
      </button>

      <button
        onClick={copyLink}
        className="rounded-xl bg-slate-700 px-5 py-3 text-white transition hover:bg-slate-800"
      >
        📋 Copy Link
      </button>
    </div>
  );
}