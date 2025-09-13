import React from "react";
import { Button } from "@/components/ui/button";
import { Share2, Twitter } from "lucide-react";

export const SocialShare: React.FC<{ url: string; text: string }> = ({ url, text }) => {
  const shareNative = async () => {
    if (navigator.share) {
      await navigator.share({ url, text, title: text });
    } else {
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, "_blank");
    }
  };

  return (
    <div className="flex gap-2">
      <Button onClick={shareNative} variant="outline">
        <Share2 className="h-4 w-4 mr-2" /> Share
      </Button>
      <Button asChild className="bg-primary text-primary-foreground hover:brightness-110">
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`}
          target="_blank"
          rel="noreferrer"
        >
          <Twitter className="h-4 w-4 mr-2" /> Post on X
        </a>
      </Button>
    </div>
  );
};