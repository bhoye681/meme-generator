
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

export function ShareDialog({
  filePath,
}: {
  filePath: string;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_URL_ENDPOINT;
  const shareUrl = `${baseUrl}/${filePath}`;

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    shareUrl
  )}`;

  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    shareUrl
  )}`;

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(shareUrl);
    alert("Lien copié !");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Share2 size={16} />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Partager ce meme</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-4">
          <a href={whatsappUrl} target="_blank">
            <Button className="w-full bg-green-600 hover:bg-green-700">
              WhatsApp
            </Button>
          </a>

          <a href={facebookUrl} target="_blank">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Facebook
            </Button>
          </a>

          <Button
            variant="secondary"
            className="w-full"
            onClick={copyToClipboard}
          >
            Copier le lien
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}