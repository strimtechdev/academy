"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface WhatsAppModalProps {
  onClose: () => void;
  whatsappNumber?: string;
}

export default function WhatsAppModal({
  onClose,
  whatsappNumber = "+2348146020799",
}: WhatsAppModalProps) {
  const handleWhatsAppRedirect = () => {
    window.open(
      `https://wa.me/${whatsappNumber}?text=I%20just%20registered%20for%20a%20course`,
      "_blank"
    );
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Registration Successful!</DialogTitle>
          <DialogDescription>
            Thank you for registering. Would you like to join our WhatsApp group
            for updates and support?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose} className="sm:mr-2">
            Not Now
          </Button>
          <Button onClick={handleWhatsAppRedirect}>Join WhatsApp Group</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
